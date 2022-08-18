<template>
  <div class="box-view">
    <van-nav-bar :title="$t('boxView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })"
                 @click-right="$router.push({ name: 'boxDescription', params: { description: boxDetails.box.owenDesc } })">
      <template #right>
        <svg class="icon icon-user" aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg>
      </template>
    </van-nav-bar>
    <!--盲盒大图-->
    <div class="box-wrapper">
      <van-image lazy-load v-if="imageUrl" :src="imageUrl" fit="contain">
        <template v-slot:error><img src="@img/box/box.png"/></template>
      </van-image>
      <span>{{ boxDetails.box.boxName }}</span>
      <span>{{ boxDetails.box.price }} {{ boxDetails.box.symbol }}</span>
    </div>
    <!--盲盒数量-->
    <div class="box-number">
      <div><span>{{ $t('boxView.totalNumber') }}:</span><span>{{ boxDetails.box.totalNum }}</span></div>
      <div><span>{{ $t('boxView.lastNumber') }}:</span><span>{{ boxDetails.box.totalNum - boxDetails.box.sellNum }}</span></div>
    </div>
    <!--盲盒内容-->
    <div class="box-details">
      <p>{{ $t('boxView.boxContent') }}</p>
      <div>
        <div>
          <span v-for="(item, index) in boxDetails.proportions" :key="index">
            <img src="@img/box/dot.png" />
            {{ $t('boxView.tips', { rate: (item.totalNum/boxDetails.box.totalNum)*100, number: item.quantity, symbol: item.symbol}) }}
          </span>
        </div>
        <img src="@img/box/safe.png">
      </div>
    </div>
    <!--开启盲盒-->
    <div class="box-open">
      <!--加载中 -->
      <template v-if="!boxDetails.box.id">
        <button>{{ $t('boxView.loading') }}</button>
      </template>
      <!--活动结束-->
      <template v-else-if="lastNum">
        <button>{{ $t('boxView.close') }}</button>
      </template>
      <!--余额不足-->
      <template v-else-if="balance === 1">
        <button>{{ $t('boxView.balance', { symbol: boxDetails.box.symbol }) }}</button>
      </template>
      <!--余额查询失败-->
      <template v-else-if="balance === 2">
        <button @click="balanceOf">{{ $t('boxView.qryBalance') }}</button>
      </template>
      <!--额度充足-->
      <template v-else-if="authorization === 0">
        <button @click="buy">{{ $t('boxView.open') }}</button>
      </template>
      <!--授权不足-->
      <template v-else-if="authorization === 1">
        <button @click="approve">{{ $t('boxView.approve') }}</button>
      </template>
      <!--额度查询失败-->
      <template v-else-if="authorization === 2">
        <button @click="allowance">{{ $t('boxView.allowance') }}</button>
      </template>
    </div>
  </div>
</template>

<script>
import { findBoxById } from '@/server/http/api'
import { mapGetters } from 'vuex'
import Web3 from 'web3'
import ERCContract from '@/server/contract/ERCContract'
import config from '@data/config.js'

export default {
  name: 'BoxView',
  props: {
    id: String
  },
  data () {
    return {
      interval: null,
      balance: 2, // 余额状态: 0余额足够, 1余额不足, 2查不到
      authorization: 2, // 授权状态
      boxDetails: {
        box: {},
        proportions: {}
      },
      ercContract: null
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl',
      boxContract: 'contract/getBoxContract',
      account: 'wallet/getAddress',
      parent: 'user/getParent'
    }),
    imageUrl () {
      if (!this.baseUrl || !this.boxDetails.box.imageUrl) {
        return false
      } else {
        return this.baseUrl + this.boxDetails.box.imageUrl
      }
    },
    // 盲盒剩余数量
    lastNum () {
      return (this.boxDetails.box.totalNum - this.boxDetails.box.sellNum) <= 0
    }
    // ercContract () {
    //   if (this.account && this.boxDetails.box.contractAddress) {
    //     return new ERCContract(this.account, this.boxDetails.box.contractAddress)
    //   } else {
    //     return null
    //   }
    // }
  },
  watch: {
    boxDetails: {
      immediate: true,
      deep: true,
      handler (val) {
        if (!this.ercContract && this.account && val.box.contractAddress) {
          this.ercContract = new ERCContract(this.account, val.box.contractAddress)
        }
      }
    },
    ercContract: {
      immediate: true,
      handler (val) {
        // 盲盒数量足够就查授权
        if (val && ((this.boxDetails.box.totalNum - this.boxDetails.box.sellNum) > 0)) {
          this.balanceOf().then(() => {
            this.allowance()
          })
        }
      }
    }
  },
  created () {
    this.findBoxById()
    this.interval = setInterval(() => {
      this.findBoxById()
    }, 3000)
  },
  beforeUnmount () {
    clearInterval(this.interval)
  },
  methods: {
    findBoxById () {
      findBoxById({ id: this.id }).then(data => {
        this.boxDetails = data
      })
    },
    balanceOf () {
      return new Promise(resolve => {
        // 查余额
        this.$toast.loading({ message: this.$t('common.balance') })
        this.ercContract.getBalanceInfo().then(balance => {
          this.$toast.clear()
          if (balance >= this.boxDetails.box.price) {
            // 余额足够
            this.balance = 0
          } else {
            // 余额不足
            this.balance = 1
          }
          resolve()
        }).catch(e => {
          this.$toast.fail({ message: this.$t('common.balanceError') })
          // 余额查询失败
          this.balance = 2
          resolve()
        })
      })
    },
    allowance () {
      const address = config.contract.CrazyBox.address
      let number = this.boxDetails.box.price
      // 查询授权
      this.$toast.loading({ message: this.$t('common.allowance') })
      this.ercContract.allowance(address).then(num => {
        this.$toast.clear()
        number = Web3.utils.toWei(number.toString())
        number = Web3.utils.toBN(number.toString())
        num = Web3.utils.toBN(num.toString())
        if (num.gte(number)) {
          // 额度足够
          this.authorization = 0
        } else {
          // 额度不足
          this.authorization = 1
        }
      }).catch(e => {
        // 额度查询失败
        this.authorization = 2
        // 查询授权
        this.$toast.fail({ message: this.$t('common.allowanceError') })
      })
    },
    buy () {
      const data = {
        boxId: this.boxDetails.box.id
      }
      if (this.parent) {
        data.inviter = this.parent
      }
      this.boxContract.buy(data).then(hash => {
        this.$dialog.alert({
          title: this.$t('boxView.openedTitle'),
          message: this.$t('boxView.openedContent')
        })
        this.boxContract.getTransactionReceipt(hash).then(result => {
          if (result) {
            this.$dialog.confirm({
              title: this.$t('boxView.award'),
              confirmButtonText: this.$t('boxView.confirm'),
              cancelButtonText: this.$t('boxView.cancel')
            }).then(() => {
              // on confirm
              this.$router.push({ name: 'record' })
            })
          } else {
            this.$dialog.alert({
              title: this.$t('error.transaction'),
              message: this.$t('boxView.reason')
            })
          }
        })
      }).catch(e => {
        this.$dialog.alert({
          title: this.$t('boxView.openedTitle'),
          message: this.$t('error.transaction')
        })
      })
    },
    approve () {
      const address = config.contract.CrazyBox.address
      const number = 999999999999999
      this.ercContract.approve(address, number).then(() => {
        this.authorization = 0
        this.$toast.success({ message: this.$t('success.approve') })
      }).catch(e => {
        this.$toast.fail({ message: this.$t('error.approve') })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-view {
  flex: 1;
  background-color: var(--base-background-color-dark);
  padding: var(--base-padding-large);
  padding-top: 0;
  .van-nav-bar {
    margin: 0 -15px 0 -15px;
    .icon.icon-user {
      color: var(--base-text-color-default);
      font-size: var(--base-font-size-medium);
    }
  }
  //盲盒大图
  .box-wrapper {
    position: relative;
    width: 345px;
    height: 300px;
    background: url("../../assets/images/box/box-bg.png") center no-repeat;
    background-size: 345px 345px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    .van-image, img {
      width: 145px;
      //max-height: 145px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    span:nth-child(2) {
      font: var(--base-text-font-bold);
      font-weight: var(--base-text-weight-medium);
      color: var(--base-text-color-pink);
      margin-bottom: 6px;
    }
    span:nth-child(3) {
      font: var(--base-text-font-bold);
      font-weight: var(--base-text-weight-medium);
      color: var(--base-text-color-default);
      font-size: var(--base-font-size-super-large);
      margin-bottom: 20px;
    }
  }
  //盲盒数量
  .box-number {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    div {
      span:first-child {
        font: var(--base-text-font-default);
        color: var(--base-text-color-dark);
        margin-right: 6px;
      }
      span:last-child {
        font: var(--base-text-font-bold);
        color: var(--base-text-color-default);
        font-weight: var(--base-text-weight-medium);
      }
    }
  }
  //盲盒内容
  .box-details {
    width: 345px;
    height: 189px;
    background: var(--base-background-color-gray2);
    border-radius: var(--base-border-radius-sm);
    margin-top: 15px;
    padding: var(--base-padding-large);
    color: var(--base-text-color-default);
    p {
      font: var(--base-text-font-default);
      font-size: var(--base-font-size-normal);
      padding-bottom: 5px;
      border-bottom: 1px solid var(--base-background-color-gray5);
    }
    >div {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      div {
        display: flex;
        flex-direction: column;
        span {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          img {
            width: 6px;
            height: 6px;
            margin-right: 5px;
          }
          font: var(--base-text-font-bold);
          font-size: var(--base-font-size-normal);
          font-weight: var(--base-text-weight-medium);
        }
      }
      img {
        width: 69px;
      }
    }
  }
  //开启盲盒
  .box-open {
    margin-top: 45px;
    text-align: center;
    button {
      width: 260px;
      height: 50px;
      background: linear-gradient(90deg, #6B3CEC 0%, #F03670 100%);
      border-radius: 25px;
      font: var(--base-text-font-bold);
      font-weight: var(--base-text-weight-medium);
      font-size: var(--base-font-size-medium);
      color: var(--base-text-color-default);
      border: none;
      margin: auto;
    }
  }
}
</style>
<style lang="less">
.box-view {
  .box-wrapper {
  }
}
</style>

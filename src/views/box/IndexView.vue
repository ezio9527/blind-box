<template>
  <div class="box-view">
    <van-nav-bar :title="$t('boxView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })">
      <template #right>
        <svg class="icon icon-user" aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg>
      </template>
    </van-nav-bar>
    <!--盲盒大图-->
    <div class="box-wrapper">
      <van-image lazy-load :src="baseUrl+boxDetails.box.imageUrl">
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
            {{ $t('boxView.tips', { rate: item.totalNum, number: item.quantity, symbol: item.symbol}) }}
          </span>
        </div>
        <img src="@img/box/safe.png">
      </div>
    </div>
    <!--开启盲盒-->
    <div class="box-open">
      <button @click="buy" :disabled="disabled">{{ disabled ? $t('boxView.close') : $t('boxView.open') }}</button>
    </div>
  </div>
</template>

<script>
import { findBoxById } from '@/server/http/api'
import { mapGetters } from 'vuex'
import Web3 from 'web3'
import ERCContract from '@/server/contract/ERCContract'
import contract from '@data/contract.json'

export default {
  name: 'BoxView',
  props: {
    id: String
  },
  data () {
    return {
      boxDetails: {
        box: {},
        proportions: {}
      }
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl',
      boxContract: 'contract/getBoxContract',
      account: 'wallet/getAddress',
      parent: 'user/getParent'
    }),
    disabled () {
      return (this.boxDetails.box.totalNum - this.boxDetails.box.sellNum) <= 0
    },
    ercContract () {
      if (this.account && this.boxDetails.box.contractAddress) {
        return new ERCContract(this.account, this.boxDetails.box.contractAddress)
      } else {
        return null
      }
    }
  },
  created () {
    this.findBoxById()
  },
  methods: {
    findBoxById () {
      findBoxById({ id: this.id }).then(data => {
        this.boxDetails = data
      })
    },
    buy () {
      this.approve(contract.CrazyBox.address, 999999999999999).then(() => {
        this.$toast.loading({ message: this.$t('common.transaction') })
        const data = {
          boxId: this.boxDetails.box.id
        }
        if (this.parent) {
          data.inviter = this.parent
        }
        this.boxContract.buy(data).then(hash => {
          console.log('完成交易', hash)
          this.$toast.success({ message: this.$t('success.transaction') })
          this.boxContract.getTransactionReceipt(hash).then()
        }).catch(e => {
          this.$toast.fail({ message: this.$t('error.transaction') })
        })
      })
    },
    approve (address, number) {
      return new Promise(resolve => {
        // 查询授权
        this.$toast.loading({ message: this.$t('common.allowance') })
        this.ercContract.allowance(address).then(num => {
          number = Web3.utils.toWei(number.toString())
          number = Web3.utils.toBN(number.toString())
          num = Web3.utils.toBN(num.toString())
          if (num.gt(number)) {
            resolve()
          } else {
            // 避免精度导致的授权数量不足，影响后续交易失败，这里直接用交易数量请求授权
            this.$toast.loading({ message: this.$t('common.approve') })
            this.ercContract.approve(address, number).then(() => {
              this.$toast.success({ duration: 0, message: this.$t('success.approve') })
            }).catch(e => {
              this.$toast.fail({ duration: 0, message: this.$t('error.approve') })
            }).finally(() => {
              resolve()
            })
          }
        }).catch(e => {
          resolve()
          this.$toast.fail({ duration: 0, message: this.$t('common.allowanceError') })
        })
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
      height: 145px;
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

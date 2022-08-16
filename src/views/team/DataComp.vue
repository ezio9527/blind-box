<template>
  <div class="data-comp">
    <div>{{ $t('teamView.superiors') }}</div>
    <div>
      <span class="line-word-hidden">{{ slice[0] }}</span>
      <span>{{ slice[1] }}</span>
    </div>
    <div>
      <div class="data-total">
        <div>{{ $t('teamView.manNumber') }}</div>
        <div>{{ total }}</div>
      </div>
      <div class="data-achievements">
        <div>{{ $t('teamView.achievements') }}</div>
        <div>
          <span v-for="(item, index) in income" :key="index">{{ item }}</span>
        </div>
      </div>
    </div>
    <img src="@img/team/vip.png" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findTeamIncome } from '@/server/http/api'

export default {
  name: 'DataComp',
  props: {
    total: Number
  },
  computed: {
    ...mapGetters({
      account: 'wallet/getAddress',
      parent: 'user/getParent'
    }),
    slice () {
      const str = this.parent || ''
      const length = str.length
      const half = parseInt((length * 0.8).toString())
      return [str.slice(0, half), str.slice(half, length)]
    }
  },
  data () {
    return {
      income: []
    }
  },
  watch: {
    account: {
      immediate: true,
      handler (val) {
        if (val) {
          this.findIncome(val)
        }
      }
    }
  },
  methods: {
    findIncome (account) {
      findTeamIncome({
        walletAddress: account
      }).then(data => {
        this.income = (data || [{ quantity: '', symbol: this.$t('teamView.noIncome') }]).map(item => {
          return item.quantity + item.symbol
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.data-comp {
  position: relative;
  z-index: 1;
  margin-top: 11px;
  width: 345px;
  min-height: 140px;
  background: linear-gradient(133deg, #D6A24A 0%, #C843BA 22%, #2435C0 100%);
  border-radius: var(--base-border-radius-sm);
  color: var(--base-text-color-default);
  font: var(--base-text-font-bold);
  font-weight: var(--base-text-weight-medium);
  padding: var(--base-padding-large);
  line-height: 17px;
  //我的上级
  >div:nth-child(1) {
    margin-bottom: 3px;
  }
  >div:nth-child(2) {
    margin-bottom: 24px;
    width: 200px;
    span:first-child {
      display: inline-block;
      width: 160px;
    }
    span:last-child {
      display: inline-block;
      width: 40px;
      margin-left: -6px;
    }
  }
  >div:nth-child(3) {
    display: flex;
    text-align: center;
    .data-total, .data-achievements {
      >div:first-child {
        margin-bottom: 5px;
      }
      >div:last-child {
        font-size: var(--base-font-size-large);
      }
    }
    //总人数
    .data-total {
      flex: 1;
      margin-right: 20px;
    }
    //总业绩
    .data-achievements {
      width: 180px;
      margin-right: 20px;
      text-align: center;
      >div:last-child {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        span {
          line-height: 1.4rem;
        }
        div {
          width: 100%;
          text-align: center;
        }
      }
    }
  }
  img {
    width: 36px;
    position: absolute;
    top: 30px;
    right: 20px;
  }
}
</style>

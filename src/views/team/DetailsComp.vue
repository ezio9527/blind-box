<template>
  <div class="details-comp">
    <p>{{ $t('teamView.invitationDetails') }}</p>
    <div class="list-wrapper">
      <div @click="$emit('exit')"><span>{{ $t('common.back') }}</span></div>
      <div><span>{{ $t('teamView.time') }}</span><span>{{ record.createTime }}</span></div>
      <div><span>{{ $t('teamView.address') }}</span><span>{{ record.walletAddress }}</span></div>
      <div><span>{{ $t('teamView.code') }}</span><span>{{ record.invCode }}</span></div>
      <div><span>{{ $t('teamView.userIncome') }}</span><span>{{ userIncome }}</span></div>
      <div><span>{{ $t('teamView.teamIncome') }}</span><span>{{ teamIncome }}</span></div>
    </div>
  </div>
</template>

<script>
import { findUserIncome, findTeamIncome } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'DetailsComp',
  props: {
    record: {
      type: Object,
      default: () => ({
        createTime: '',
        walletAddress: '',
        invCode: ''
      })
    }
  },
  data () {
    return {
      userIncome: '',
      teamIncome: ''
    }
  },
  computed: {
    ...mapGetters({
      account: 'wallet/getAddress'
    })
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
      findUserIncome({
        walletAddress: account
      }).then(data => {
        this.userIncome = (data || [{ quantity: '', symbol: this.$t('teamView.noIncome') }]).map(item => {
          return item.quantity + item.symbol
        }).join(' ; ')
      })
      findTeamIncome({
        walletAddress: account
      }).then(data => {
        this.teamIncome = (data || [{ quantity: '', symbol: this.$t('teamView.noIncome') }]).map(item => {
          return item.quantity + item.symbol
        }).join(' ; ')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.details-comp {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  p {
    font: var(--base-text-font-default);
    color: var(--base-text-color-black);
    font-size: var(--base-font-size-normal);
  }
  .list-wrapper {
    margin-top: 10px;
    background-color: var(--base-background-color-white);
    border-radius: var(--base-border-radius-sm);
    font-size: var(--base-font-size-mini);
    >div {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--base-background-color-gray6);
      span:nth-child(1) {
        width: 80px;
        padding-left: var(--base-padding-large);
        word-break: break-all;
        text-align: right;
      }
      span:nth-child(2) {
        flex: 1;
        padding-right: var(--base-padding-large);
        word-break: break-all;
        padding-left: var(--base-padding-large);
      }
    }
    >div:first-child {
      height: 35px;
      border-bottom: 1px solid var(--base-background-color-gray6);
    }
  }
}
</style>

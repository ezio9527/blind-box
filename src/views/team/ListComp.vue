<template>
  <div class="list-comp">
    <p>{{ $t('teamView.myInvitation') }}</p>
    <div>
      <div>
        <span>{{ $t('teamView.serial') }}</span>
        <span>{{ $t('teamView.address') }}</span>
      </div>
      <div v-for="(item, index) in list" :key="index" @click="$emit('query', item)">
        <span>{{ index + 1 }}</span>
        <span class="line-word-hidden">{{ item.walletAddress }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { findInvitationRecord } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ListComp',
  data () {
    return {
      pageNo: 1,
      list: []
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
          this.findRecord(val)
        }
      }
    }
  },
  methods: {
    findRecord (account) {
      findInvitationRecord({
        pageSize: 10,
        pageNo: this.pageNo,
        walletAddress: account
      }).then(res => {
        this.list = res.data
        this.$emit('total', res.totalCount)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-comp {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  p {
    font: var(--base-text-font-default);
    color: var(--base-text-color-black);
    font-size: var(--base-font-size-normal);
  }
  >div {
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
        width: 50px;
        text-align: center;
      }
      span:nth-child(2) {
        flex: 1;
        padding-right: var(--base-padding-large);
      }
    }
    >div:first-child {
      height: 35px;
      border-bottom: 1px solid var(--base-background-color-gray6);
    }
  }
}
</style>

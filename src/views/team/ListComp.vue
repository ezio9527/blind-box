<template>
  <van-pull-refresh v-model="refreshLoading" :head-height="80" @refresh="onRefresh">
    <div class="list-comp">
      <p>{{ $t('teamView.myInvitation') }}</p>
      <div class="list-wrapper">
        <div class="list-header">
          <span>{{ $t('teamView.serial') }}</span>
          <span>{{ $t('teamView.address') }}</span>
        </div>
        <van-list
          :immediate-check="false"
          v-model:loading="listLoading"
          :finished="finished"
          :finished-text="$t('common.noMore')"
          @load="onLoad">
          <div class="list-item" v-for="(item, index) in list" :key="index" @click="$emit('query', item)">
            <span>{{ index + 1 }}</span>
            <span class="line-word-hidden">{{ item.walletAddress }}</span>
          </div>
        </van-list>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { findInvitationRecord } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ListComp',
  data () {
    return {
      refreshLoading: false,
      listLoading: false,
      finished: false,
      pageSize: 10,
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
    onRefresh () {
      this.pageNo = 1
      this.findRecord()
    },
    onLoad () {
      this.pageNo += 1
      this.findRecord()
    },
    findRecord (account) {
      findInvitationRecord({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        walletAddress: account
      }).then(res => {
        const data = res.data || []
        if (this.pageNo === 1) {
          this.list = data
        } else {
          this.list = this.list.concat(data || [])
        }
        this.refreshLoading = false
        this.listLoading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        this.$emit('total', res.totalCount || 0)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-pull-refresh {
  min-height: 500px;
}
.list-comp {
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
    .list-header {
      height: 35px;
      border-bottom: 1px solid var(--base-background-color-gray6);
    }
    .list-item, .list-header {
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
  }
}
</style>

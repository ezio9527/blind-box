<template>
  <div class="record-view">
    <van-nav-bar class="van-nav-bar_light"
                 :title="$t('recordView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })"
                 @click-right="$router.push({ name: 'team' })">
    </van-nav-bar>
    <van-pull-refresh v-model="refreshLoading" :head-height="80" @refresh="onRefresh">
      <div class="record-list">
        <div class="record-list-header">
          <span>{{ $t('recordView.serial') }}</span>
          <span>{{ $t('recordView.type') }}</span>
          <span>{{ $t('recordView.sum') }}</span>
          <span>{{ $t('recordView.time') }}</span>
        </div>
        <van-list
          :immediate-check="false"
          v-model:loading="listLoading"
          :finished="finished"
          :finished-text="$t('common.noMore')"
          @load="onLoad">
          <div class="record-list-item" v-for="(record, index) in recordData" :key="index">
            <span>{{ index + 1 }}</span>
            <span>{{ formatter(record.evnType) }}</span>
            <span>{{ (record.evnType===1?'-':'+') + record.quantity + record.symbol}}</span>
            <span>
              {{ new Date(record.createDate).format('MM-dd') }}
              <br>
              {{ new Date(record.createDate).format('hh:mm:ss') }}
            </span>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { findWalletRecord } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'RecordView',
  data () {
    return {
      refreshLoading: false,
      listLoading: true,
      finished: false,
      pageNo: 1,
      pageSize: 10,
      recordData: []
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
          this.findWalletRecord()
        }
      }
    }
  },
  methods: {
    formatter (type) {
      switch (type) {
        case 1:
          return this.$t('recordView.openBox')
        case 2:
          return this.$t('recordView.awardBox')
        case 3:
          return this.$t('recordView.invitationAward')
      }
    },
    onRefresh () {
      this.pageNo = 1
      this.findWalletRecord()
    },
    onLoad () {
      this.pageNo += 1
      this.findWalletRecord()
    },
    findWalletRecord () {
      findWalletRecord({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        walletAddress: this.account
      }).then(data => {
        if (this.pageNo === 1) {
          this.recordData = data
        } else {
          this.recordData = this.recordData.concat(data || [])
        }
        this.refreshLoading = false
        this.listLoading = false
        if (!data || (data.length < this.pageSize)) {
          this.finished = true
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.record-view {
  position: relative;
  flex: 1;
  background: var(--base-background-color-white);
  .record-list {
    position: relative;
    z-index: 1;
    .record-list-header, .record-list-item {
      height: 40px;
      display: flex;
      align-items: center;
      font-size: var(--base-font-size-normal);
      padding-left: var(--base-padding-large);
      padding-right: var(--base-padding-large);
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        width: 345px;
        height: 1px;
        background: var(--base-background-color-gray6);
        bottom: 0;
      }
      span:nth-child(1) {
        width: 50px;
        text-align: center;
      }
      span:nth-child(2) {
        flex: 1;
        text-align: center;
      }
      span:nth-child(3) {
        flex: 1;
        text-align: center;
      }
      span:nth-child(4) {
        flex: 1;
        text-align: center;
      }
    }
    .record-list-header {
      font-size: var(--base-font-size-medium);
      height: 35px;
      border-bottom: 1px solid var(--base-background-color-gray6);
    }
  }
}
</style>

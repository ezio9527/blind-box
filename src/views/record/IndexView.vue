<template>
  <div class="record-view">
    <van-nav-bar class="van-nav-bar_light"
                 :title="$t('recordView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })"
                 @click-right="$router.push({ name: 'team' })">
    </van-nav-bar>
    <van-pull-refresh v-model="loading" :head-height="80" @refresh="findWalletRecord">
      <div class="team-list">
        <div>
          <div>
            <span>{{ $t('recordView.serial') }}</span>
            <span>{{ $t('recordView.type') }}</span>
            <span>{{ $t('recordView.sum') }}</span>
            <span>{{ $t('recordView.time') }}</span>
          </div>
          <div v-for="(record, index) in recordData" :key="index">
            <span>{{ index + 1 }}</span>
            <span>{{ formatter(record.evnType) }}</span>
            <span>{{ (record.evnType===1?'-':'+') + record.quantity + record.symbol}}</span>
            <span>
              {{ new Date(record.createDate).format('MM-dd') }}
              <br>
              {{ new Date(record.createDate).format('hh:mm:ss') }}
            </span>
          </div>
        </div>
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
      loading: false,
      pageNo: 1,
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
    findWalletRecord () {
      findWalletRecord({
        pageNo: this.pageNo,
        pageSize: 10,
        walletAddress: this.account
      }).then(data => {
        this.recordData = data
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
  .team-list {
    position: relative;
    z-index: 1;
    >div {
      background-color: var(--base-background-color-white);
      border-radius: var(--base-border-radius-sm);
      font-size: var(--base-font-size-mini);
      >div {
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
      >div:first-child {
        font-size: var(--base-font-size-medium);
        height: 35px;
        border-bottom: 1px solid var(--base-background-color-gray6);
      }
    }
  }
}
</style>

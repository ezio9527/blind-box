<template>
  <div class="notice-comp">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-notifying"></use>
    </svg>
    <van-swipe :show-indicators="false" :autoplay="2000" vertical>
      <template v-if="(noticeList || []).length > 0">
        <van-swipe-item class="line-word-hidden" v-for="(notice, index) in noticeList" :key="index" @click="notify(notice)">{{ notice.title }}</van-swipe-item>
      </template>
      <template v-else>
        <van-swipe-item class="line-word-hidden">{{ $t('homeView.noNotice') }}</van-swipe-item>
      </template>
    </van-swipe>
    <base-dialog v-model:visible="dialog" :data="selectNotice"></base-dialog>
  </div>
</template>

<script>
import { findNoticeAll } from '@/server/http/api'
import BaseDialog from '@/components/BaseDialog'

export default {
  name: 'NoticeComp',
  components: { BaseDialog },
  data () {
    return {
      dialog: false,
      selectNotice: { title: '', content: '' },
      noticeAllList: []
    }
  },
  computed: {
    noticeList () {
      return this.noticeAllList.filter(item => {
        return item.type.toString() === '1'
      })
    }
  },
  created () {
    findNoticeAll().then(data => {
      this.noticeAllList = data
    })
  },
  methods: {
    notify (notice) {
      this.dialog = true
      this.selectNotice = notice
    }
  }
}
</script>

<style lang="less" scoped>
.notice-comp {
  margin-top: 31px;
  display: flex;
  align-items: center;
  height: 34px;
  padding: var(--base-padding-medium);
  padding-top: 0;
  padding-bottom: 0;
  font: var(--base-text-font-default);
  color: var(--base-text-color-default);
  background-color: var(--base-background-color-gray);
  border-radius: var(--base-border-radius-normal);

  svg {
    font-size: var(--base-font-size-medium);
    color: #575d87;
  }

  .van-swipe {
    margin-left: 10px;
    height: 100%;
    flex-grow: 1;

    .van-swipe-item {
      height: 34px;
      line-height: 34px;
    }
  }
}
</style>

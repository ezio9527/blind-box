<template>
  <div class="list-view">
    <van-nav-bar :title="$t('guideView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })">
    </van-nav-bar>
    <div class="list-wrapper">
      <div v-for="(item, index) in list"
           :key="index"
           @click="$router.push({name: 'guideDetails', params: {id: item.id}})">
        <span class="line-word-hidden">{{ index + 1 }}.{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { findNoticeAll } from '@/server/http/api'

export default {
  name: 'ListView',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.findGuide()
  },
  methods: {
    findGuide () {
      findNoticeAll().then(data => {
        this.list = (data || []).filter(item => {
          return item.type.toString() === '2'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-view {
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

  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    >div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 345px;
      height: 45px;
      padding: var(--base-padding-large);
      color: var(--base-text-color-default);
      background-color: var(--base-background-color-gray2);
      border-radius: var(--base-border-radius-sm);
      span {
        font: var(--base-text-font-default);
        font-size: var(--base-font-size-normal);
      }
    }
  }
}
</style>

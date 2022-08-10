<template>
  <div class="details-view">
    <van-nav-bar class="van-nav-bar_light"
                 :title="$t('guideView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'guideList' })">
    </van-nav-bar>
    <div v-html="content"></div>
  </div>
</template>

<script>
import { findNoticeById } from '@/server/http/api'

export default {
  name: 'DetailsView',
  props: {
    id: String
  },
  data () {
    return {
      content: ''
    }
  },
  created () {
    findNoticeById({ id: this.id }).then(data => {
      this.content = data.content
    })
  }
}
</script>

<style lang="less" scoped>
.details-view {
  flex: 1;
  padding: var(--base-padding-large);
  padding-top: 0;
  .van-nav-bar {
    margin: 0 -15px 0 -15px;
  }
}
</style>

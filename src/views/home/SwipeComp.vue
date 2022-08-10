<template>
  <van-swipe class="swipe-comp" :autoplay="3000" lazy-render>
    <van-swipe-item v-for="(banner, index) in imageSrcList" :key="index">
      <a :href="banner.clickUrl" target="_blank"><img :src="banner.image"/></a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { findBannerAll } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'SwipeComp',
  data () {
    return {
      bannerList: []
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    }),
    imageSrcList () {
      return this.bannerList.map(item => {
        item.image = this.baseUrl + item.imageUrl
        return item
      })
    }
  },
  created () {
    findBannerAll().then(data => {
      this.bannerList = data
    })
  }
}
</script>

<style lang="less" scoped>
.swipe-comp {
  img {
    width: 345px;
    height: 135px;
  }
}
</style>

<template>
  <div class="home-view">
    <!--轮播图-->
    <van-swipe class="home-swipe" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image"/>
      </van-swipe-item>
    </van-swipe>
    <!--公告-->
    <div class="home-notice">
      <span class="home-notice_title">{{ $t('homeView.notice') }}</span>
      <i class="home-notice_divider"></i>
      <van-swipe :show-indicators="false" :autoplay="3000" vertical>
        <van-swipe-item class="line-word-hidden">系统正式开始运行</van-swipe-item>
        <van-swipe-item class="line-word-hidden">13asdfadfasdfasdfasdfajldfjllajsdlkfjadadflaldfad2123</van-swipe-item>
      </van-swipe>
      <span class="home-notice_more"><i/><i/><i/></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  data () {
    return {
      images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.home-view {
  padding: var(--base-padding-lg);
  //轮播图
  .home-swipe {
    box-shadow: var(--base-box-shadow);
    img {
      width: 345px;
      height: 140px;
    }
  }
  //公告
  .home-notice {
    margin: 17px auto;
    display: flex;
    align-items: center;
    height: 17px;
    font-size: var(--base-font-size-normal);
    .home-notice_title {
      white-space: nowrap;
    }
    .home-notice_divider {
      display: flex;
      justify-content: center;
      width: 30px;
      height: 17px;
      &:before {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background-color: #DDDEE3;
      }
    }
    .van-swipe {
      height: 100%;
      flex-grow: 1;
      .van-swipe-item {
        line-height: 17px;
      }
    }
    .home-notice_more {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 15px;
      height: 13px;
      i {
        width: 15px;
        height: 2px;
        background-color: #000000;
        border-radius: 10px;
      }
      i:nth-child(2) {
        width: 12px;
      }
      i:nth-child(3) {
        width: 14px;
      }
    }
  }
}
</style>

<template>
  <div class="project-view">
    <van-nav-bar :title="$t('projectView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })">
    </van-nav-bar>
    <div class="list-wrapper">
      <div v-for="(item, index) in projectList" :key="index">
        <a :href="item.clickUrl" target="_blank">
          <van-image lazy-load :src="item.image">
            <template v-slot:error><img src="@img/home/logo.png"/></template>
          </van-image>
          <span>{{ item.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { findCooperationAll } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectView',
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    }),
    projectList () {
      return this.list.filter(item => {
        return item.type.toString() === '2'
      }).map(item => {
        item.image = this.baseUrl + item.logUrl
        return item
      })
    }
  },
  created () {
    findCooperationAll().then(data => {
      this.list = data
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.project-view {
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
      width: 167px;
      height: 45px;
      color: var(--base-text-color-default);
      background-color: var(--base-background-color-gray2);
      border-radius: var(--base-border-radius-sm);
      a {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        img, .van-image {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        span {
          color: var(--base-text-color-default);
          font: var(--base-text-font-bold);
          font-weight: var(--base-text-weight-medium);
          font-size: var(--base-font-size-medium);
        }
      }
    }
  }
}
</style>

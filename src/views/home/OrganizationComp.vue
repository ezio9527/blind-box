<template>
  <div class="organization-comp">
    <p>{{ $t('homeView.organization') }}</p>
    <div>
      <div v-for="(item, index) in organizationList" :key="index">
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
  name: 'OrganizationComp',
  data () {
    return {
      organizationAllList: []
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    }),
    organizationList () {
      return this.organizationAllList.filter(item => {
        return item.type.toString() === '1'
      }).map(item => {
        item.image = this.baseUrl + item.logUrl
        return item
      })
    }
  },
  created () {
    findCooperationAll().then(data => {
      this.organizationAllList = data
    })
  }
}
</script>

<style lang="less" scoped>
.organization-comp {
  margin-top: 35px;
  p {
    margin-bottom: 10px;
    font: var(--base-text-font-bold);
    font-weight: var(--base-text-weight-medium);
    font-size: var(--base-font-size-medium);
    color: var(--base-text-color-default);
  }
  >div {
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

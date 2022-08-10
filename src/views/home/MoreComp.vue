<template>
  <div class="more-comp">
    <!--当前活跃-->
    <div class="home-more_item">
      <img src="@img/home/active.png">
      <div>
        <span>{{ $t('homeView.active') }}</span>
        <span>{{ activeCount }}</span>
      </div>
    </div>
    <!--入驻项目方-->
    <div class="home-more_item" @click="$router.push({ name: 'project' })">
      <img src="@img/home/project.png">
      <div>
        <span>{{ $t('homeView.project') }}</span>
        <span>{{ projectCount }}</span>
      </div>
    </div>
    <!--操作指南-->
    <div class="home-more_item" @click="$router.push({ name: 'guideList' })">
      <img src="@img/home/guide.png">
      <div>
        <span>{{ $t('homeView.guide') }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-right-arrow"></use>
        </svg>
      </div>
    </div>
    <!--我的资产记录-->
    <div class="home-more_item" @click="$router.push({ name: 'record' })">
      <img src="@img/home/record.png">
      <div>
        <span>{{ $t('homeView.record') }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-right-arrow"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { findCooperationAll, findUserAll } from '@/server/http/api'

export default {
  name: 'MoreComp',
  data () {
    return {
      projectCount: 0,
      activeCount: 0
    }
  },
  created () {
    findUserAll({ pageSize: 1, pageNo: 1 }).then(res => {
      this.activeCount = res.totalCount || 0
    })
    findCooperationAll().then(data => {
      this.projectCount = (data || []).filter(item => {
        return item.type.toString() === '2'
      }).length
    })
  }
}
</script>

<style lang="less" scoped>
.more-comp {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .home-more_item {
    width: 167px;
    height: 80px;
    margin-bottom: 10px;
    padding-left: 12px;
    border-radius: var(--base-border-radius-sm);
    background-color: var(--base-background-color-gray2);
    display: flex;
    align-items: center;
  }

  .home-more_item:nth-child(1) {
    img {
      width: 33px;
      margin-right: 17px;
    }
  }

  .home-more_item:nth-child(2) {
    img {
      width: 24px;
      margin-right: 26px;
    }
  }

  .home-more_item:nth-child(3) {
    img {
      width: 27px;
      margin-right: 23px;
    }
  }

  .home-more_item:nth-child(4) {
    img {
      width: 28px;
      margin-right: 22px;
    }
  }

  .home-more_item:nth-child(1), .home-more_item:nth-child(2) {
    div {
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        font: var(--base-text-font-default);
        color: var(--base-text-color-dark);
        margin-bottom: 8px;
      }
      span:nth-child(2) {
        font: var(--base-text-font-bold);
        font-weight: var(--base-text-weight-bold);
        font-size: var(--base-font-size-large);
        color: var(--base-text-color-default);
      }
    }
  }

  .home-more_item:nth-child(3), .home-more_item:nth-child(4) {
    div {
      margin-right: 15px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font: var(--base-text-font-default);
        color: var(--base-text-color-default);
      }
      svg {
        font-size: var(--base-font-size-mini);
        color: var(--base-text-color-default);
      }
    }
  }
}
</style>

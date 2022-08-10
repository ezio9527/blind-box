<template>
  <div class="team-view">
    <van-nav-bar :title="$t('teamView.title')"
                 :left-arrow="true"
                 @click-left="$router.push({ name: 'home' })">
    </van-nav-bar>
    <!--团队数据-->
    <data-comp :total="total"></data-comp>
    <!--邀请链接-->
    <invitation-comp></invitation-comp>
    <!--我的邀请-->
    <list-comp v-show="!detailsPanel" @query="findDetails" @total="getTotal"></list-comp>
    <details-comp v-show="detailsPanel" :record="selectRecord" @exit="showList"></details-comp>
    <!--邀请详情-->
    <!--<transition name="van-fade" mode="in-out">-->
    <!--</transition>-->
  </div>
</template>

<script>
import DataComp from '@/views/team/DataComp'
import InvitationComp from '@/views/team/InvitationComp'
import ListComp from '@/views/team/ListComp'
import DetailsComp from '@/views/team/DetailsComp'
export default {
  name: 'TeamView',
  components: {
    DataComp,
    InvitationComp,
    ListComp,
    DetailsComp
  },
  data () {
    return {
      total: 0,
      detailsPanel: false,
      selectRecord: {},
      activeComp: ListComp
    }
  },
  methods: {
    findDetails (record) {
      this.detailsPanel = true
      this.selectRecord = record
    },
    showList () {
      this.detailsPanel = false
      this.selectRecord = {}
    },
    getTotal (val) {
      this.total = val
    }
  }
}
</script>

<style lang="less" scoped>
.team-view {
  position: relative;
  flex: 1;
  background: linear-gradient(0deg, #692C49 0%, #16162B 100%);
  padding: var(--base-padding-large);
  padding-top: 0;
  &::before {
    content: '';
    background-color: var(--base-background-color-gray6);
    border-radius: 16px 16px 0px 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 150px;
  }
  .van-nav-bar {
    margin: 0 -15px 0 -15px;
  }
}
</style>

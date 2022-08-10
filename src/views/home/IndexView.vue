<template>
  <div class="home-view">
    <!--钱包-->
    <wallet-comp></wallet-comp>
    <!--轮播图-->
    <swipe-comp></swipe-comp>
    <!--公告-->
    <notice-comp></notice-comp>
    <!--合约地址-->
    <contract-comp></contract-comp>
    <!--其他的功能-->
    <more-comp></more-comp>
    <!--邀请-->
    <invitation-comp></invitation-comp>
    <!--搜索-->
    <search-comp @search="search"></search-comp>
    <!--盲盒列表-->
    <box-list-comp :boxName="boxName" :time="time"></box-list-comp>
    <!--合作机构-->
    <organization-comp></organization-comp>
    <!--语言切换-->
    <language-comp></language-comp>
  </div>
</template>

<script>
import WalletComp from '@/views/home/WalletComp'
import SwipeComp from '@/views/home/SwipeComp'
import NoticeComp from '@/views/home/NoticeComp'
import ContractComp from '@/views/home/ContractComp'
import MoreComp from '@/views/home/MoreComp'
import InvitationComp from '@/views/home/InvitationComp'
import SearchComp from '@/views/home/SearchComp'
import BoxListComp from '@/views/home/BoxListComp'
import OrganizationComp from '@/views/home/OrganizationComp'
import LanguageComp from '@/views/home/LanguageComp'
export default {
  name: 'HomeView',
  components: {
    WalletComp,
    SwipeComp,
    NoticeComp,
    ContractComp,
    MoreComp,
    InvitationComp,
    SearchComp,
    BoxListComp,
    OrganizationComp,
    LanguageComp
  },
  data () {
    return {
      time: 0,
      boxName: ''
    }
  },
  methods: {
    search (val) {
      this.boxName = val
      this.time = +new Date()
    }
  }
}
</script>

<style lang="less" scoped>
.home-view {
  flex: 1;
  background-color: var(--base-background-color-dark);
  padding: var(--base-padding-large);
}
</style>

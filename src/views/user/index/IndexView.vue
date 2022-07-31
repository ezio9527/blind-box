<template>
  <div class="user-view">
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <header-comp></header-comp>
      <menus-comp></menus-comp>
      <balance-comp></balance-comp>
      <list-comp></list-comp>
    </van-pull-refresh>
  </div>
</template>

<script>
import HeaderComp from '@/views/user/index/HeaderComp'
import BalanceComp from '@/views/user/index/BalanceComp'
import MenusComp from '@/views/user/index/MenusComp'
import ListComp from '@/views/user/index/ListComp'
export default {
  name: 'UserView',
  components: {
    HeaderComp,
    BalanceComp,
    MenusComp,
    ListComp
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.user-view {
  padding: var(--base-padding-lg);
  padding-bottom: 104px;
}
</style>

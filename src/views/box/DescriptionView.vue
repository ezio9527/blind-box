<template>
  <div class="description-view">
    <van-nav-bar :title="$t('boxView.description')"
                 :left-arrow="true"
                 @click-left="$router.push({name: 'box', params: { id }})">
    </van-nav-bar>
    <div v-html="description"></div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionView',
  props: {
    id: String,
    description: String
  }
}
</script>

<style lang="less" scoped>
.description-view {
  flex: 1;
  padding: var(--base-padding-large);
  background-color: var(--base-background-color-dark);
  color: var(--base-text-color-default);
  padding-top: 0;
  .van-nav-bar {
    margin: 0 -15px 0 -15px;
  }
}
</style>

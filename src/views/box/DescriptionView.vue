<template>
  <div class="description-view">
    <van-nav-bar :title="$t('boxView.description')"
                 :left-arrow="true"
                 :right-text="$t('common.copy')"
                 @click-left="$router.push({name: 'box', params: { id }})">
    </van-nav-bar>
    <div ref="description" class="description-content" v-html="description"></div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  name: 'DescriptionView',
  props: {
    id: String,
    description: String
  },
  mounted () {
    const clipboard = new ClipboardJS('.description-view .van-nav-bar__right', {
      text: () => {
        return this.$refs.description.innerText
      }
    })
    clipboard.on('success', e => {
      this.$toast(this.$t('success.copy'))
    })
    clipboard.on('error', e => {
      this.$toast(this.$t('error.copy'))
    })
  }
}
</script>

<style lang="less" scoped>
.description-view {
  -moz-user-select: auto !important;
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  user-select: auto !important;
  flex: 1;
  padding: var(--base-padding-large);
  background-color: var(--base-background-color-dark);
  color: var(--base-text-color-default);
  padding-top: 0;
  .van-nav-bar {
    margin: 0 -15px 0 -15px;
  }
  .description-content {
    word-break: break-word;
  }
}
</style>

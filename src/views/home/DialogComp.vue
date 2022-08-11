<template>
  <van-overlay class="dialog-comp" :show="show" :lock-scroll="false">
    <div class="dialog-comp_wrapper" @click.stop>
      <p>{{ notice.title }}</p>
      <div v-html="notice.content"></div>
      <div><button @click="close">{{ $t('common.confirm') }}</button></div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'DialogComp',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    notice: {
      type: Object,
      default: () => ({
        title: '',
        content: ''
      })
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    visible (val) {
      this.show = val
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-comp {
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog-comp_wrapper {
    width: 262px;
    overflow: hidden;
    border-radius: var(--base-border-radius-sm);
    background-color: var(--base-background-color-white);
    padding: 30px 30px 20px 30px;
    >p:nth-child(1) {
      margin-bottom: 30px;
      text-align: center;
      font: var(--base-text-font-default);
      font-size: var(--base-font-size-medium);
      color: var(--base-text-color-black);
    }
    >div:nth-child(2) {
      word-break: break-word;
      font: var(--base-text-font-default);
      font-size: var(--base-font-size-medium);
      color: var(--base-text-color-gray2);
    }
    >div:nth-child(3) {
      text-align: center;
      button {
        margin-top: 48px;
        width: 105px;
        height: 34px;
        background: #EC635E;
        border-radius: 17px;
        border: none;
        font: var(--base-text-font-bold);
        font-weight: var(--base-text-weight-medium);
        color: var(--base-text-color-default);
      }
    }
  }
}
</style>

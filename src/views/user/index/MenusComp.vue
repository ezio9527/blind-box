<template>
  <div class="menus-comp">
    <a href="/user/settings">
      <svg class="icon icon-order" aria-hidden="true">
        <use xlink:href="#icon-order"></use>
      </svg>
      <span>{{ $t('userView.order') }}</span>
    </a>
    <a href="/user/settings">
      <svg class="icon icon-record" aria-hidden="true">
        <use xlink:href="#icon-record"></use>
      </svg>
      <span>{{ $t('userView.record') }}</span>
    </a>
    <a href="/user/settings">
      <svg class="icon icon-settings" aria-hidden="true">
        <use xlink:href="#icon-settings"></use>
      </svg>
      <span>{{ $t('userView.settings') }}</span>
    </a>
    <a href="/user/settings">
      <svg class="icon icon-share" aria-hidden="true">
        <use xlink:href="#icon-share"></use>
      </svg>
      <span>{{ $t('userView.share') }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MenusComp'
}
</script>

<style lang="less" scoped>
.menus-comp {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  padding-left: var(--base-padding-lg);
  padding-right: var(--base-padding-lg);
  font-size: 24px;
  a {
    color: var(--base-text-color-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-top: 12px;
      font: var(--base-text-font-default);
    }
  }
}
</style>

<template>
  <div class="balance-comp">
    <span>{{ $t('userView.assets') }}</span>
    <div>
      <svg class="icon icon-right-arrow" aria-hidden="true">
        <use xlink:href="#icon-right-arrow"></use>
      </svg>
    </div>
    <div>
      <svg class="icon icon-dollar" aria-hidden="true">
        <use xlink:href="#icon-dollar"></use>
      </svg>
      <span>2643586.3698 USDT</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceComp'
}
</script>

<style lang="less" scoped>
.balance-comp {
  margin-top: 25px;
  width: 345px;
  background: var(--base-primary-color);
  box-shadow: var(--base-box-shadow);
  border-radius: var(--base-border-radius-lg);
  padding: var(--base-padding-lg);
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: var(--base-font-size-normal);
  color: var(--base-text-color-default);

  span:first-child {
    font-size: var(--base-font-size-medium);
  }
  div:nth-child(2) {
    align-self: flex-end;
    .icon-right-arrow {
      font-size: 20px;
      color: var(--base-text-color-default);
    }
  }
  .icon-dollar {
    font-size: 18px;
    margin-right: 6px;
    vertical-align: middle;
  }
}
</style>

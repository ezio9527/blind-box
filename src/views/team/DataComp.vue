<template>
  <div class="data-comp">
    <div>{{ $t('teamView.superiors') }}</div>
    <div>0xddskdkdmxcjdsdjkxjsakdeiej4jwj33</div>
    <div>
      <div>
        <div>{{ $t('teamView.manNumber') }}</div>
        <div>100</div>
      </div>
      <div>
        <div>{{ $t('teamView.achievements') }}</div>
        <div>$10000</div>
      </div>
    </div>
    <img src="@img/team/vip.png" />
  </div>
</template>

<script>
export default {
  name: 'DataComp'
}
</script>

<style lang="less" scoped>
.data-comp {
  position: relative;
  z-index: 1;
  margin-top: 11px;
  width: 345px;
  height: 140px;
  background: linear-gradient(133deg, #D6A24A 0%, #C843BA 22%, #2435C0 100%);
  border-radius: var(--base-border-radius-sm);
  color: var(--base-text-color-default);
  font: var(--base-text-font-bold);
  font-weight: var(--base-text-weight-medium);
  padding: var(--base-padding-large);
  line-height: 17px;
  div:nth-child(1) {
    margin-bottom: 3px;
  }
  div:nth-child(2) {
    margin-bottom: 24px;
  }
  div:nth-child(3) {
    display: flex;
    text-align: center;
    >div {
      margin-right: 70px;
      div:last-child {
        font-size: var(--base-font-size-large);
        line-height: 25px;
      }
    }
  }
  img {
    width: 36px;
    position: absolute;
    top: 30px;
    right: 20px;
  }
}
</style>

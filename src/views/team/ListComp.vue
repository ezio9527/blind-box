<template>
  <div class="list-comp">
    <p>{{ $t('teamView.myInvitation') }}</p>
    <div>
      <div>
        <span>{{ $t('teamView.serial') }}</span>
        <span>{{ $t('teamView.address') }}</span>
        <span>{{ $t('teamView.achievement') }}</span>
      </div>
      <div v-for="index in 10" :key="index">
        <span>{{ index }}</span>
        <span class="line-word-hidden">0xddskdkdmxcjdsdjkxjsakdeiej4jwj33</span>
        <span>$10</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListComp'
}
</script>

<style lang="less" scoped>
.list-comp {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  p {
    font: var(--base-text-font-default);
    color: var(--base-text-color-black);
    font-size: var(--base-font-size-normal);
  }
  >div {
    margin-top: 10px;
    background-color: var(--base-background-color-white);
    border-radius: var(--base-border-radius-sm);
    font-size: var(--base-font-size-mini);
    >div {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--base-background-color-gray6);
      span:nth-child(1) {
        width: 50px;
        text-align: center;
      }
      span:nth-child(2) {
        flex: 1;
      }
      span:nth-child(3) {
        width: 50px;
        text-align: center;
      }
    }
    >div:first-child {
      height: 35px;
      border-bottom: 1px solid var(--base-background-color-gray6);
    }
  }
}
</style>

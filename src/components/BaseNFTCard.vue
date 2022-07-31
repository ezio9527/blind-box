<template>
  <div class="base-nft-card">
    <div class="list-card"></div>
    <span class="list-title line-word-hidden">Super blind box 001</span>
    <div class="list-price">
      <svg class="icon icon-dollar" aria-hidden="true">
        <use xlink:href="#icon-dollar"></use>
      </svg>
      <span>192 USDT</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseNFTCard'
}
</script>

<style lang="less" scoped>
.base-nft-card {
  margin-top: 15px;
  width: 163px;
  height: 248px;
  border-radius: var(--base-border-radius-lg);
  border: 1px solid var(--base-primary-color);
  padding: 5px 6px 13px 5px;
  .list-card {
    border-radius: var(--base-border-radius-sm);
    background-color: var(--base-primary-color);
    width: 150px;
    height: 165px;
  }
  .list-title {
    margin-top: 15px;
    font: var(--base-text-font-bold);
    font-size: var(--base-font-size-normal);
    color: var(--base-text-color-dark);
  }
  .list-price {
    margin-top: 10px;
    .icon-dollar {
      vertical-align: middle;
      font-size: var(--base-font-size-medium);
    }
    span {
      font-size: var(--base-font-size-medium);
    }
  }
}
</style>

<template>
  <div class="list-comp">
    <div class="list-head">
      <span>{{ $t('userView.list') }}</span>
      <span>
        <svg class="icon icon-time" aria-hidden="true">
          <use xlink:href="#icon-time"></use>
        </svg>
      </span>
    </div>
    <div class="list-wrapper">
      <base-n-f-t-card v-for="i in 7" :key="i"></base-n-f-t-card>
    </div>
  </div>
</template>

<script>
import BaseNFTCard from '@/components/BaseNFTCard'

export default {
  name: 'ListComp',
  components: {
    BaseNFTCard
  }
}
</script>

<style lang="less" scoped>
.list-comp {
  margin-top: 40px;

  .list-head {
    display: flex;
    justify-content: space-between;
    padding-left: var(--base-padding-lg);
    font-size: var(--base-font-size-medium);

    span:first-child {
      color: var(--base-text-color-dark);
    }
  }

  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>

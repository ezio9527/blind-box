<template>
  <div class="search-comp">
    <span>{{ $t('homeView.searchTitle') }}</span>
    <div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <input v-model="value" :placeholder="$t('homeView.searchPlaceholder')" />
    </div>
    <span @click="search">{{ $t('homeView.search') }}</span>
  </div>
</template>

<script>
export default {
  name: 'SearchComp',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    search () {
      this.$emit('search', this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.search-comp {
  margin-top: 20px;
  display: flex;
  align-items: center;
  span:nth-child(1) {
    font: var(--base-text-font-bold);
    font-weight: var(--base-text-weight-medium);
    font-size: var(--base-font-size-medium);
    color: var(--base-text-color-default);
  }
  div:nth-child(2) {
    flex: 1;
    height: 28px;
    border-radius: 100px;
    background-color: var(--base-background-color-gray4);
    color: var(--base-text-color-gray);
    display: flex;
    align-items: center;
    padding: var(--base-padding-large);
    padding-top: 0;
    padding-bottom: 0;
    margin: auto 4px auto 15px;
    svg {
      font-size: var(--base-font-size-mini);
      margin-right: 4px;
    }
    input {
      background-color: transparent;
      border: none;
      font: var(--base-text-font-default);
    }
  }
  span:nth-child(3) {
    font: var(--base-text-font-default);
    color: var(--base-text-color-red);
  }
}
</style>

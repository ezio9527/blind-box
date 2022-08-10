<template>
  <div class="contract-comp" id="contract-copy">
    <span>{{ $t('homeView.address') }}:</span>
    <span class="line-word-hidden">{{ address }}</span>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-copy"></use>
    </svg>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import contract from '@data/contract.json'

export default {
  name: 'ContractComp',
  data () {
    return {
      address: contract.CrazyBox.address
    }
  },
  mounted () {
    const clipboard = new ClipboardJS('#contract-copy', {
      text: () => this.address
    })
    clipboard.on('success', e => {
      this.$toast(this.$t('success.copyAddress'))
    })
    clipboard.on('error', e => {
      this.$toast(this.$t('error.copyAddress'))
    })
  }
}
</script>

<style lang="less" scoped>
.contract-comp {
  margin-top: 20px;
  display: flex;
  align-items: center;
  font: var(--base-text-font-default);

  span:first-child {
    margin-right: 6px;
    color: var(--base-text-color-dark);
  }

  span:nth-child(2) {
    flex: 1;
    color: var(--base-text-color-default);
  }

  svg {
    margin-left: 14px;
    font-size: var(--base-font-size-normal);
    color: var(--base-text-color-default);
  }
}
</style>

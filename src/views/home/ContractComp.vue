<template>
  <div class="contract-comp" id="contract-copy">
    <span>{{ $t('homeView.address') }}:</span>
    <div>
      <span class="line-word-hidden">{{ slice[0] }}</span>
      <span>{{ slice[1] }}</span>
    </div>
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
  computed: {
    slice () {
      const str = this.address
      const length = str.length
      const half = parseInt((length * 0.8).toString())
      return [str.slice(0, half), str.slice(half, length)]
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

  >span:first-child {
    margin-right: 6px;
    color: var(--base-text-color-dark);
  }

  div:nth-child(2) {
    width: 250px;
    color: var(--base-text-color-default);
    span:first-child {
      display: inline-block;
      width: 70%;
    }
    span:last-child {
      display: inline-block;
      width: 30%;
      margin-left: -1px;
    }
  }

  svg {
    margin-left: 14px;
    font-size: var(--base-font-size-normal);
    color: var(--base-text-color-default);
  }
}
</style>

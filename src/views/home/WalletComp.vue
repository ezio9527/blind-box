<template>
  <div class="wallet-comp">
    <img class="wallet-logo" src="@img/home/logo.png">
    <div class="wallet-wrapper">
      <div class="wallet-address" v-if="account">
        <span class="line-word-hidden">{{ slice[0] }}</span>
        <span>{{ slice[1] }}</span>
      </div>
      <div class="wallet-connect" v-else>
        <div><img src="@img/box/box-bg.png" /></div>
        <span @click="wallet.enable">{{ this.$t('boxView.connect') }}</span>
      </div>
    </div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-more"></use>
    </svg>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WalletComp',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      account: 'wallet/getAddress',
      wallet: 'wallet/getWallet'
    }),
    slice () {
      const str = this.account
      const length = str.length
      const half = parseInt((length * 0.9).toString())
      return [str.slice(0, half), str.slice(half, length)]
    }
  }
}
</script>

<style lang="less" scoped>
.wallet-comp {
  height: 24px;
  margin-bottom: 17px;
  display: flex;
  align-items: center;

  .wallet-logo {
    width: 24px;
  }

  .wallet-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .wallet-connect, .wallet-address {
      width: 140px;
      padding: 3px 16px;
      border-radius: 1000px;
      background-color: var(--base-background-color-gray2);
      font: var(--base-text-font-default);
      color: var(--base-text-color-default);
    }
    .wallet-connect {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 26px;
      overflow: hidden;
      div {
        width: 32px;
        text-align: center;
        img {
          width: 24px;
          animation: dot 1500ms linear infinite;
        }
      }
    }
    .wallet-address {
      span:first-child {
        display: inline-block;
        width: 70%;
      }
      span:last-child {
        display: inline-block;
        width: 30%;
        margin-left: -2px;
      }
    }
  }

  svg {
    margin-left: 14px;
    color: var(--base-text-color-default);
  }

  @keyframes dot {
    0% {
      width: 24px;
    }
    50% {
      width: 32px;
    }
    100% {
      width: 24px;
    }
  }
}
</style>

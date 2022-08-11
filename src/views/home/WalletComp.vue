<template>
  <div class="wallet-comp">
    <img src="@img/home/logo.png">
    <div>
      <span v-if="account" class="line-word-hidden">{{ account }}</span>
      <span @click="enable" v-else>{{ this.$t('boxView.connect') }}</span>
    </div>
    <svg class="icon" aria-hidden="true" @click="enable">
      <use xlink:href="#icon-more"></use>
    </svg>
  </div>
</template>

<script>
import Wallet from '@/pluins/Wallet'
import walletConf from '@/assets/data/wallet.test.conf.json'
import { mapGetters } from 'vuex'

export default {
  name: 'WalletComp',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      account: 'wallet/getAddress'
    })
  },
  methods: {
    // 获取授权
    enable () {
      Wallet.enable(walletConf).then(account => {
        this.$store.commit('wallet/setAddress', account)
        this.$store.dispatch('contract/initialize', account)
        localStorage.setItem('enable', 'true')
      })
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

  img {
    width: 24px;
  }

  div {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    span {
      width: 140px;
      display: inline-block;
      background-color: var(--base-background-color-gray2);
      font: var(--base-text-font-default);
      color: var(--base-text-color-default);
      padding: 3px 16px;
      border-radius: 1000px;
    }
  }

  svg {
    margin-left: 14px;
    color: var(--base-text-color-default);
  }
}
</style>

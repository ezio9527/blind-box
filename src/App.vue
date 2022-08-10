<template>
  <router-view v-slot="{ Component }">
    <transition name="van-fade" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script>
import { Locale } from 'vant'
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'
import Wallet from '@/pluins/Wallet'
import walletConf from '@/assets/data/wallet.test.conf.json'

export default {
  name: 'App',
  mounted () {
    switch (localStorage.getItem('language')) {
      case 'en':
        Locale.use('en-US', enUS)
        break
      default:
        Locale.use('zh-CN', zhCN)
        break
    }
    window.ethereum.on('chainChanged', chainId => {
      if (chainId === walletConf.chainId && localStorage.getItem('enable')) {
        this.enable()
      }
    })
    // window.ethereum.on('connect', data => {
    //   console.log('connect')
    //   console.log(data)
    // })
    // window.ethereum.on('disconnect', data => {
    //   console.log('connect')
    //   console.log(data)
    // })
    this.$store.dispatch('imageBaseUrl/getBaseUrl')
    const enable = localStorage.getItem('enable')
    if (enable) {
      // 授权过了
      this.enable()
    }
  },
  methods: {

    // 获取授权
    enable () {
      Wallet.enable(walletConf).then(account => {
        this.$store.commit('wallet/setAddress', account)
        this.$store.dispatch('contract/initialize', account)
        this.$store.dispatch('user/findUser', account)
        localStorage.setItem('enable', 'true')
      })
    }
  }
}
</script>

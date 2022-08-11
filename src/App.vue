<template>
  <router-view></router-view>
</template>

<script>
import { Locale } from 'vant'
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'
import Wallet from '@/pluins/Wallet'
import walletConf from '@/assets/data/wallet.conf.js'

export default {
  name: 'App',
  mounted () {
    this.setLanguage()
    this.enable()
    this.listen()
    this.$store.dispatch('imageBaseUrl/getBaseUrl')
  },
  methods: {
    // 获取授权
    enable () {
      Wallet.enable(walletConf).then(account => {
        this.$store.commit('wallet/setAddress', account)
        this.$store.dispatch('contract/initialize', account)
        this.$store.dispatch('user/findUser', account)
      })
    },
    // 监听钱包
    listen () {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', chainId => {
          console.log('chainChanged')
          if (chainId === walletConf.chainId) {
            this.enable()
          }
        })
        window.ethereum.on('connect', data => {
          console.log('connect')
          console.log(data)
        })
        window.ethereum.on('disconnect', data => {
          console.log('connect')
          console.log(data)
        })
      }
    },
    // 设置语言环境
    setLanguage () {
      switch (localStorage.getItem('language')) {
        case 'en':
          Locale.use('en-US', enUS)
          break
        default:
          Locale.use('zh-CN', zhCN)
          break
      }
    }
  }
}
</script>

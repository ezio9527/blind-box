<template>
 <div class="language-comp">
   <svg id="telegram" class="icon" aria-hidden="true">
     <use xlink:href="#icon-telegram"></use>
   </svg>
   <svg id="twitter" class="icon" aria-hidden="true">
     <use xlink:href="#icon-twitter"></use>
   </svg>
   <svg id="email" class="icon" aria-hidden="true">
     <use xlink:href="#icon-email"></use>
   </svg>
   <svg class="icon" aria-hidden="true" @click="languageSelect">
     <use xlink:href="#icon-language"></use>
   </svg>
 </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import { findContact } from '@/server/http/api'
import { useI18n } from 'vue-i18n'
import { Locale } from 'vant'
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'

export default {
  name: 'LanguageComp',
  data () {
    return {
      telegram: '',
      twitter: '',
      email: ''
    }
  },
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale
    }
  },
  created () {
    findContact().then(data => {
      this.telegram = data.telegram
      this.twitter = data.twitter
      this.email = data.email
    })
    const telegram = new ClipboardJS('#telegram', { text: () => this.telegram })
    telegram.on('success', e => {
      this.$toast(this.$t('success.copyTelegram'))
    })
    telegram.on('error', e => {
      this.$toast(this.$t('error.copyTelegram'))
    })
    const twitter = new ClipboardJS('#twitter', { text: () => this.twitter })
    twitter.on('success', e => {
      this.$toast(this.$t('success.copyTwitter'))
    })
    twitter.on('error', e => {
      this.$toast(this.$t('error.copyTwitter'))
    })
    const email = new ClipboardJS('#email', { text: () => this.email })
    email.on('success', e => {
      this.$toast(this.$t('success.copyEmail'))
    })
    email.on('error', e => {
      this.$toast(this.$t('error.copyEmail'))
    })
  },
  methods: {
    // 语言切换
    languageSelect () {
      switch (this.locale) {
        case 'en':
          localStorage.setItem('language', 'zh')
          this.locale = 'zh'
          Locale.use('zh-CN', zhCN)
          break
        default:
          localStorage.setItem('language', 'en')
          this.locale = 'en'
          Locale.use('en-US', enUS)
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.language-comp {
  margin: 40px auto 50px auto;
  font-size: 24px;
  color: var(--base-text-color-default);
  svg {
    margin-right: 44px;
  }
}
</style>

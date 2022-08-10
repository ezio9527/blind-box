import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/assets/lang'
import '@/server/http'
import '@/pluins/Date'
import '@/assets/iconfont/iconfont'
import '@/assets/theme/default/index.less'
import { Toast, Lazyload } from 'vant'
import 'vant/es/toast/style'

createApp(App).use(store).use(router)
  .use(i18n)
  .use(Toast).use(Lazyload)
  .mount('#app')

// 登录验证拦截器
import store from '@/store'

const before = (to, form, next) => {
  if (to.meta.requireAuth) {
    if (store.getters['user/loginStatus']) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
}
export default before

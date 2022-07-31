export default {
  // 登录
  path: '/login',
  name: 'login',
  component: () => import('@views/login/IndexView'),
  meta: {
    requireAuth: false
  }
}

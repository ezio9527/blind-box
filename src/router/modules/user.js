export default {
  // 个人中心
  path: '/user',
  name: 'user',
  component: () => import('@/views/user/index/IndexView'),
  meta: {
    requireAuth: false
  },
  children: [
    {
      path: '/user/settings',
      name: 'settings',
      component: () => import('@/views/user/settings/IndexView'),
      meta: {
        requireAuth: false
      }
    }
  ]
}

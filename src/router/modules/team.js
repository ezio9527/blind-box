export default {
  // 我的团队
  path: '/team',
  name: 'team',
  component: () => import('@views/team/IndexView'),
  meta: {
    requireAuth: false
  }
}

export default {
  // 资产记录
  path: '/record',
  name: 'record',
  component: () => import('@views/record/IndexView'),
  meta: {
    requireAuth: false
  }
}

export default {
  // 盲盒详情
  path: '/box/:id',
  name: 'box',
  component: () => import('@views/box/IndexView'),
  props: true,
  meta: {
    requireAuth: false
  }
}

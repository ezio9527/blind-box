export default {
  // 盲盒
  path: '/box',
  component: { template: '<router-view/>' },
  children: [
    {
      // 盲盒详情
      path: '/box/:id',
      name: 'box',
      component: () => import('@views/box/IndexView'),
      props: true,
      meta: {
        requireAuth: false
      }
    },
    {
      // 盲盒描述
      path: '/box/:id/description',
      name: 'boxDescription',
      component: () => import('@views/box/DescriptionView'),
      props: true,
      meta: {
        requireAuth: false
      }
    }
  ]
}

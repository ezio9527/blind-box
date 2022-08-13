export default {
  // 操作指南
  path: '/guide',
  component: { template: '<router-view/>' },
  children: [
    {
      path: 'list',
      name: 'guideList',
      component: () => import('@views/guide/ListView'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: 'details/:id',
      name: 'guideDetails',
      component: () => import('@views/guide/DetailsView'),
      props: true,
      meta: {
        requireAuth: false
      }
    }
  ]
}

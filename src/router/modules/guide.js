export default {
  // 操作指南
  path: '/guide',
  component: () => import('@views/guide/IndexView'),
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

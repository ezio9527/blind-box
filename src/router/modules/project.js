export default {
  // 项目方信息
  path: '/project',
  name: 'project',
  component: () => import('@views/project/IndexView'),
  meta: {
    requireAuth: false
  }
}

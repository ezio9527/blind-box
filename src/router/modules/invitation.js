import HomeView from '@/views/home/IndexView'

export default {
  // 首页，邀请链接用
  path: '/invitation/:id',
  component: HomeView,
  props: true,
  meta: {
    requireAuth: false
  }
}

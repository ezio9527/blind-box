import HomeView from '@/views/home/IndexView'

export default {
  // 首页
  path: '/:id',
  name: 'home',
  component: HomeView,
  props: true,
  meta: {
    requireAuth: false
  }
}

import { createRouter, createWebHistory } from 'vue-router'
import routes from './modules'
import auth from './interceptors/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(auth)

export default router

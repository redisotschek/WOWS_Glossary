import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Categories from '@/views/Categories.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'categories',
    component: Categories
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

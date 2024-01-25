import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Vehicle from '@/views/Vehicle.vue'
import Categories from '@/views/Categories.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'categories',
    component: Categories
  },
  {
    path: '/types/:type',
    name: 'type',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Types.vue')
  },
  {
    path: '/nations/:nation',
    name: 'nation',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Nations.vue')
  },
  {
    path: '/vehicle/:id',
    name: 'vehicle',
    props: true,
    component: Vehicle
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

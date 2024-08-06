import { createRouter, createWebHistory } from 'vue-router'
import UserComponent from '@/views/UserComponent.vue'
import Products from "@/views/Products.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserComponent
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    }
  ]
})

export default router

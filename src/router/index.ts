import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '@/views/not-found/index.vue'
import Welcome from '@/views/welcome/index.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/not-found', // -> "/"
      name: 'not-found',
      component: NotFound
    }
  ]
})

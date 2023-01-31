import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { authed: false } },
  { path: '/about', name: 'About', component: Home, meta: { authed: false } },
  { path: '/contact', name: 'Contact', component: Contact, meta: { authed: false } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'
import Signin from './pages/Signin.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { auth: 'either' } },
  { path: '/contact', name: 'Contact', component: Contact, meta: { auth: 'either' } },
  { path: '/sign-in', name: 'Sign In', component: Signin, meta: { auth: 'unauthed', rightMenu: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

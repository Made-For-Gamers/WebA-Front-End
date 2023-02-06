import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from './stores/user'
import { useAppManagerStore } from './stores/app-manager'

import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'
import Signin from './pages/Signin.vue'
import Dashboard from './pages/Dashboard.vue'
import PageNotFound from './pages/PageNotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { auth: 'either', menus: ['left'] } },
  { path: '/contact', name: 'Contact', component: Contact, meta: { auth: 'either', menus: ['left'] } },
  { path: '/sign-in', name: 'Sign In', component: Signin, meta: { auth: 'unauthed', menus: ['right'] } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { auth: 'authed', menus: ['right'] } },
  { path: '/logout', name: 'Logout', meta: { auth: 'authed', menus: ['right'] } },

  { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound, meta: { auth: 'either' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  const appManagerStore = useAppManagerStore()

  if (to.name === 'Logout') {
    userStore.token = null
    appManagerStore.showAlert({ color: 'success', text: "You've successfully logged out" })
    return { name: 'Home' }
  }

  if (to.meta.auth === 'authed' && !userStore.token) {
    appManagerStore.showAlert({ color: 'warning', text: 'Please sign in before proceeding' })
    return { name: 'Sign In' }
  }

  if (to.meta.auth === 'unauthed' && userStore.token) {
    return { name: 'Dashboard' }
  }
})

export default router

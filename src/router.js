import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { useAppManagerStore } from '@/stores/app-manager'

import Home from '@/pages/Home.vue'
import Contact from '@/pages/Contact.vue'
import Register from '@/pages/Register.vue'
import Signin from '@/pages/Signin.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Projects from '@/pages/Projects/Index.vue'
import Profile from '@/pages/Profile.vue'
import PageNotFound from '@/pages/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { fixedNav: true, auth: 'either', menus: ['left'] },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { fixedNav: false, auth: 'either', menus: ['left'] },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { fixedNav: false, auth: 'unauthed', menus: ['right'] },
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: Signin,
    meta: { fixedNav: false, auth: 'unauthed', menus: ['right'] },
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: { fixedNav: false, auth: 'unauthed' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { fixedNav: false, auth: 'authed', menus: ['right'] },
  },
  {
    path: '/project/',
    name: 'Projects',
    component: Projects,
    meta: { fixedNav: false, auth: 'authed', menus: ['right'] },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { fixedNav: false, auth: 'authed', menus: ['right'] },
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: { fixedNav: false, auth: 'authed', menus: ['right'] },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: { fixedNav: false, auth: 'either' },
  },
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
    appManagerStore.showAlert({
      color: 'success',
      text: "You've successfully logged out",
    })
    return { name: 'Home' }
  }

  if (to.meta.auth === 'authed' && !userStore.token) {
    appManagerStore.showAlert({
      color: 'warning',
      text: 'Please sign in before proceeding',
    })
    return { name: 'Sign In' }
  }

  if (to.meta.auth === 'unauthed' && userStore.token) {
    return { name: 'Dashboard' }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { useAppManagerStore } from '@/stores/app-manager'

import Home from '@/pages/Home.vue'
import Contact from '@/pages/Contact.vue'
import Register from '@/pages/Register.vue'
import Signin from '@/pages/Signin.vue'
import NearAuth from '@/pages/NearAuth.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'
import ResetPassword from '@/pages/ResetPassword.vue'
import Projects from '@/pages/Projects/Index.vue'
import CreateProject from '@/pages/Projects/Create.vue'
import EditProject from '@/pages/Projects/Edit.vue'
import Project from '@/pages/Projects/Project.vue'
import Profile from '@/pages/Profile.vue'
import MintNft from '@/pages/Nft/Mint.vue'
import PageNotFound from '@/pages/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'Landing', auth: 'either', menus: ['left'] },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { layout: 'Prelogin', auth: 'either', menus: ['left'] },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'Prelogin', auth: 'unauthed', menus: ['right'] },
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: Signin,
    meta: { layout: 'Prelogin', auth: 'unauthed', menus: ['right'] },
  },
  {
    path: '/near-auth',
    name: 'NEAR Auth',
    component: NearAuth,
    meta: { layout: 'Prelogin', auth: 'unauthed' },
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: { layout: 'Prelogin', auth: 'unauthed' },
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
    meta: { layout: 'Prelogin', auth: 'unauthed' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { layout: 'Postlogin', auth: 'authed', menus: ['right'] },
  },
  {
    path: '/projects/create',
    name: 'Create Project',
    component: CreateProject,
    meta: { layout: 'Postlogin', auth: 'authed' },
  },
  {
    path: '/projects/edit/:id',
    name: 'Edit Project',
    component: EditProject,
    meta: { layout: 'Postlogin', auth: 'authed' },
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: Project,
    meta: { layout: 'Postlogin', auth: 'authed' },
  },
  {
    path: '/nft/mint',
    name: 'Mint NFT',
    component: MintNft,
    meta: { layout: 'Postlogin', auth: 'authed' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { layout: 'Postlogin', auth: 'authed', menus: ['right'] },
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: { auth: 'authed', menus: ['right'] },
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: { layout: 'Postlogin', auth: 'either' },
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
    userStore.user = { token: null }
    appManagerStore.showAlert({
      color: 'success',
      text: "You've successfully logged out",
    })
    return { name: 'Home' }
  }

  if (to.name === 'Reset Password' && !to.query.token) {
    return { name: 'Forgot Password' }
  }

  if (to.meta.auth === 'authed' && !userStore.user.token) {
    appManagerStore.showAlert({
      color: 'warning',
      text: 'Please sign in before proceeding',
    })
    return { name: 'Sign In' }
  }

  if (to.meta.auth === 'unauthed' && userStore.user.token) {
    return { name: 'Project' }
  }
})

export default router

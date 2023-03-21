<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { HomeIcon } from '@heroicons/vue/24/outline'
  import { PhoneIcon } from '@heroicons/vue/24/outline'
  import { BriefcaseIcon } from '@heroicons/vue/24/outline'
  import { PlusIcon } from '@heroicons/vue/24/outline'
  import { UserCircleIcon } from '@heroicons/vue/24/outline'
  import { ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import Divider from '@/components/Layout/Divider.vue'

  const appManagerStore = useAppManagerStore()
  const { currentRoute } = useRouter()

  const links = ref([
    { path: '/', text: 'Home', icon: HomeIcon },
    { path: '/contact', text: 'Contact', icon: PhoneIcon },
  ])

  const projects = ref([
    { path: '/projects', text: 'All', icon: BriefcaseIcon },
    { path: '/projects/create', text: 'Create', icon: PlusIcon },
  ])

  const account = ref([
    { path: '/profile', text: 'Profile', icon: UserCircleIcon },
    { path: '/logout', text: 'Logout', icon: ArrowLeftOnRectangleIcon },
  ])
</script>

<template>
  <ul class="w-1/6 min-h-screen overflow-y-auto shadow-xl flex flex-col gap-4 py-4 px-6 bg-white">
    <li>
      <router-link to="/">
        <img src="@/assets/images/logo-black-landscape.png" alt="metamask icon" />
      </router-link>
    </li>

    <li><Divider /></li>

    <li>
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        :class="`${link.path === currentRoute.path ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'}
          block rounded-md px-3 py-2 font-medium hover:bg-indigo-50 hover:text-indigo-600`"
      >
        <component :is="link.icon" class="inline-block w-6 mr-2" />
        {{ link.text }}
      </router-link>
    </li>

    <li>
      <h6 class="text-slate-500 text-lg uppercase block no-underline">Projects</h6>

      <router-link
        v-for="link in projects"
        :key="link.path"
        :to="link.path"
        :class="`${link.path === currentRoute.path ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'}
          block rounded-md px-3 py-2 font-medium hover:bg-indigo-50 hover:text-indigo-600`"
      >
        <component :is="link.icon" class="inline-block w-6 mr-2" />
        {{ link.text }}
      </router-link>
    </li>

    <li>
      <h6 class="text-slate-500 text-lg uppercase block no-underline">Account</h6>

      <router-link
        v-for="link in account"
        :key="link.path"
        :to="link.path"
        :class="`${link.path === currentRoute.path ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'}
          block rounded-md px-3 py-2 font-medium hover:bg-indigo-50 hover:text-indigo-600`"
      >
        <component :is="link.icon" class="inline-block w-6 mr-2" />
        {{ link.text }}
      </router-link>
    </li>
  </ul>
</template>

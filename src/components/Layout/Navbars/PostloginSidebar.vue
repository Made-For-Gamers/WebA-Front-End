<script setup>
  import { ref, shallowRef } from 'vue'
  import { useRouter } from 'vue-router'

  import { HomeIcon, PhoneIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'
  import { PlusIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'
  import { GithubIcon, DiscordIcon } from 'vue3-simple-icons'

  import Divider from '@/components/Layout/Divider.vue'
  import Modal from '@/components/Layout/Modal.vue'

  const { currentRoute } = useRouter()

  const links = ref([
    { path: '/', text: 'Home', icon: HomeIcon, open: false },
    { path: '/contact', text: 'Contact', icon: PhoneIcon, open: false },
  ])

  const projects = shallowRef([
    { path: '/projects', text: 'All', icon: BriefcaseIcon },
    { path: '/projects/create', text: 'Create', icon: PlusIcon },
  ])

  const account = shallowRef([
    { path: '/profile', text: 'Profile', icon: UserCircleIcon },
    { path: '/logout', text: 'Logout', icon: ArrowLeftOnRectangleIcon },
  ])

  const support = shallowRef([
    { path: 'https://made-for-gamers.github.io/WebA-Front-End/', text: 'Git Docs', icon: GithubIcon },
    { path: 'https://discord.gg/uu4wZEhBnh', text: 'Discord', icon: DiscordIcon },
  ])
</script>

<template>
  <ul class="w-1/6 min-h-screen overflow-y-auto shadow-xl flex flex-col gap-4 py-4 px-6 bg-white">
    <li>
      <router-link to="/">
        <img src="@/assets/images/mfgnexus-logo.png" alt="mfgnexus logo" />
      </router-link>
    </li>

    <li><Divider /></li>

    <li>
      <span
        v-for="link in links"
        :key="link.path"
        :class="`${link.path === currentRoute.path ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'}
          block rounded-md px-3 py-2 font-medium hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer`"
        @click="() => (link.open = true)"
      >
        <Modal heading="Confirm Navigation" :open="link.open" @close="() => (link.open = false)">
          <template #content> You are about to navigate away from the console. Are you sure? </template>
          <template #actions>
            <div class="flex justify-end gap-4">
              <button
                type="button"
                :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4
                py-2 font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-gray-200
                text-2xl border-indigo-600 text-indigo-600 shadow-sm`"
                @click="() => (link.open = false)"
              >
                No, cancel
              </button>

              <router-link
                type="button"
                :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4
                py-2 font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700
                text-2xl bg-indigo-600 text-white shadow-sm`"
                :to="link.path"
              >
                Yes, proceed
              </router-link>
            </div>
          </template>
        </Modal>

        <component :is="link.icon" class="inline-block w-6 mr-2" />
        {{ link.text }}
      </span>
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
      <h6 class="text-slate-500 text-lg uppercase block no-underline">Support</h6>

      <a
        v-for="link in support"
        :key="link.path"
        :href="link.path"
        target="_blank"
        :class="`${link.path === currentRoute.path ? 'text-indigo-600 bg-indigo-50' : 'text-gray-900'}
          block rounded-md px-3 py-2 font-medium hover:bg-indigo-50 hover:text-indigo-600`"
      >
        <component :is="link.icon" class="inline-block w-6 mr-2" />
        {{ link.text }}
      </a>
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

    <li class="flex-grow"></li>
    <li>
      <img src="@/assets/images/partner-logos/near-black.svg" alt="near logo" />
    </li>
  </ul>
</template>

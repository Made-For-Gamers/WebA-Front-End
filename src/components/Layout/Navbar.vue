<script setup>
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverOverlay,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'

  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
  import { useRouter } from 'vue-router'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'

  defineProps({ scrollTop: Number })

  const { getRoutes, currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  const navigation = getRoutes().reduce(
    (s, v) => {
      const destination = v.meta.auth
      const link = {
        name: v.name,
        href: v.path,
        current: currentRoute.value.path,
      }

      if (v.meta.menus?.length > 0) {
        if (destination === 'either') {
          v.meta.menus.forEach(v => s[v].authed.push(link))
          v.meta.menus.forEach(v => s[v].unauthed.push(link))
        } else v.meta.menus.forEach(v => s[v][destination].push(link))
      }

      return s
    },
    {
      left: { authed: [], unauthed: [] },
      right: { authed: [], unauthed: [] },
    }
  )
</script>

<template>
  <Popover
    as="header"
    class="w-full transition-colors duration-500 z-50"
    :class="{
      'fixed': currentRoute.meta.fixedNav,
      'mb-20': !currentRoute.meta.fixedNav,
      'bg-black': scrollTop > 25 || !currentRoute.meta.fixedNav,
    }"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="relative h-20 lg:pt-0 grid grid-cols-3 items-center lg:items-start">
        <!-- Left section on desktop -->
        <div class="hidden lg:h-20 lg:flex lg:items-center">
          <nav class="flex space-x-4">
            <router-link
              v-for="item in navigation.left[userStore.token ? 'authed' : 'unauthed']"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current ? 'text-white' : 'text-cyan-100',
                'text-xl font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Logo -->
        <div class="absolute left-0 flex-shrink-0 py-5 lg:static lg:flex lg:justify-center lg:-mt-8">
          <router-link
            to="/"
            class="lg:block lg:rounded-full lg:p-8 transition-colors duration-500"
            :class="{ 'lg:bg-black': scrollTop > 25 || !currentRoute.meta.fixedNav }"
          >
            <img
              class="h-8 w-auto transition-all duration-500"
              :class="{
                'lg:h-24': scrollTop <= 25 || !currentRoute.meta.fixedNav,
                'lg:h-12': scrollTop > 25 || !currentRoute.meta.fixedNav,
              }"
              src="../../assets/images/mark-logo-white-150x106.png"
              :alt="appManagerStore.appName"
            />
          </router-link>
        </div>

        <!-- Right section on desktop -->
        <div class="hidden lg:ml-4 lg:h-20 lg:flex lg:items-center lg:py-5 lg:pr-0.5 justify-end">
          <nav class="flex space-x-4">
            <router-link
              v-for="item in navigation.right[userStore.token ? 'authed' : 'unauthed']"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current ? 'text-white' : 'text-cyan-100',
                'text-xl font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <!-- <button
            type="button"
            class="flex-shrink-0 rounded-full p-1 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button> -->
        </div>

        <!-- Menu button -->
        <div class="absolute right-0 flex-shrink-0 lg:hidden">
          <!-- Mobile menu button -->
          <PopoverButton
            class="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="open">
      <div class="lg:hidden">
        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <PopoverOverlay class="fixed inset-0 z-20 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
          >
            <div class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="py-2 relative">
                <PopoverButton
                  class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 absolute right-3"
                >
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
                <div class="space-y-1 px-2">
                  <router-link
                    v-for="item in navigation.left[userStore.token ? 'authed' : 'unauthed']"
                    :key="item.name"
                    :to="item.href"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                    >{{ item.name }}</router-link
                  >
                </div>
              </div>
              <div class="pt-2 pb-2">
                <div class="space-y-1 px-2">
                  <router-link
                    v-for="item in navigation.right[userStore.token ? 'authed' : 'unauthed']"
                    :key="item.name"
                    :to="item.href"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                    >{{ item.name }}</router-link
                  >
                </div>
              </div>
            </div>
          </PopoverPanel>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </Popover>
</template>

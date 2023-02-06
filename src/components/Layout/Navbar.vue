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

  import { useAppManagerStore } from '../../stores/app-manager'
  import { useUserStore } from '../../stores/user'

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
  <Popover as="header" class="bg-gradient-to-r from-sky-800 to-cyan-600 pb-24" v-slot="{ open }">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- <div class="relative pt-10 lg:pt-0 flex flex-wrap items-center justify-center lg:justify-between"> -->
      <div class="relative h-20 lg:pt-0 grid grid-cols-3 items-center">
        <!-- Left section on desktop -->
        <div class="hidden lg:block">
          <nav class="flex space-x-4">
            <router-link
              v-for="item in navigation.left[userStore.token ? 'authed' : 'unauthed']"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current ? 'text-white' : 'text-cyan-100',
                'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Logo -->
        <div class="absolute left-0 flex-shrink-0 py-5 lg:static flex justify-center">
          <router-link to="/">
            <img
              class="h-8 w-auto"
              src="../../assets/images/mark-logo-white-150x106.png"
              :alt="appManagerStore.appName"
            />
          </router-link>
        </div>

        <!-- Right section on desktop -->
        <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5 justify-end">
          <nav class="flex space-x-4">
            <router-link
              v-for="item in navigation.right[userStore.token ? 'authed' : 'unauthed']"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current ? 'text-white' : 'text-cyan-100',
                'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10',
              ]"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <button
            type="button"
            class="flex-shrink-0 rounded-full p-1 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <!-- <Menu as="div" class="relative ml-4 flex-shrink-0">
            <div>
              <MenuButton
                class="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100 w-7 h-7 items-center justify-center"
              >
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />

                <span>C</span>
              </MenuButton>
            </div>
            <transition
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-for="item in navigation.left[userStore.token ? 'authed' : 'unauthed']" :key="item.name" v-slot="{ active }">
                  <router-link
                    :href="item.href"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >
                  {{ item.name }}
                  </router-link>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu> -->
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
              <div class="pt-3 pb-2">
                <div class="flex items-center justify-between px-4">
                  <div>
                    <img
                      class="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
                      :alt="appManagerStore.appName"
                    />
                  </div>
                  <div class="-mr-2">
                    <PopoverButton
                      class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                    >
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="mt-3 space-y-1 px-2">
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
                <!-- <div class="flex items-center px-5 mb-3">
                  <div class="flex-shrink-0">
                    <div class="flex rounded-full bg-gray-300 text-sm w-10 h-10 items-center justify-center">
                      <img
                        class="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />

                      <span>C</span>
                    </div>
                  </div>
                  <div class="ml-2 min-w-0 flex-1">
                    <div class="truncate text-base font-medium text-gray-800">Chelsea Hagon</div>
                    <div class="truncate text-sm font-medium text-gray-500">chelsea.hagon@example.com</div>
                  </div>
                  <button
                    type="button"
                    class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div> -->
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

<script setup>
  import { useRouter } from 'vue-router'

  import { useAppManagerStore } from '../../stores/app-manager'

  const { getRoutes } = useRouter()
  const appManagerStore = useAppManagerStore()

  const pages = getRoutes().reduce((s, v) => {
    if (!['PageNotFound', 'Logout'].includes(v.name)) {
      s.push({ name: v.name, path: v.path })
    }
    return s
  }, [])
</script>

<template>
  <footer class="bg-white">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left grid grid-cols-4">
        <div class="col-span-1">
          &copy; {{ new Date().getFullYear() }} {{ appManagerStore.appName }}
          <br />
          All Rights Reserved
        </div>

        <div class="col-span-3 grid grid-cols-3">
          <router-link v-for="item in pages" :key="item.path" :to="item.path" class="col-span-1">
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

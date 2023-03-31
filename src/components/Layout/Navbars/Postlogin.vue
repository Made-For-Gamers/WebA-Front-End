<script setup>
  import { useRouter } from 'vue-router'
  import _ from 'lodash'

  import TextField from '@/components/Layout/TextField.vue'
  import LinearProgress from '@/components/Layout/LinearProgress.vue'

  const { currentRoute } = useRouter()
</script>

<template>
  <nav
    class="w-full mb-24 before:content-[''] before:fixed before:-z-10 before:w-full before:h-[40%] before:bg-indigo-400"
  >
    <LinearProgress />
    <div class="flex items-center justify-between px-16 py-4">
      <h5 class="text-2xl text-white uppercase">{{ _.startCase(currentRoute.name) }}</h5>
      <div>
        <TextField type="text" label="Search" :placeholder="true" />
      </div>
    </div>
  </nav>
</template>

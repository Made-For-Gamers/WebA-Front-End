<script setup>
  import { useRouter } from 'vue-router'

  import Landing from '@/layouts/Landing.vue'
  import Prelogin from '@/layouts/Prelogin.vue'
  import Postlogin from '@/layouts/Postlogin.vue'

  const { currentRoute } = useRouter()
  const layouts = { Landing, Prelogin, Postlogin }
</script>

<template>
  <component :is="layouts[currentRoute?.meta?.layout || 'Landing']">
    <router-view />
  </component>
</template>

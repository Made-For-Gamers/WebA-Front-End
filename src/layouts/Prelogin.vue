<script setup>
  import { useHead } from '@vueuse/head'

  import Alert from '@/components/Layout/Alert.vue'
  import Navbar from '@/components/Layout/Navbars/Prelogin.vue'
  import Footer from '@/components/Layout/Footer.vue'

  useHead({
    title: 'MFG - Made For Gamers',
    link: { rel: 'icon', type: 'image/png', href: '/logo-white.png' },
  })
</script>

<template>
  <Alert />

  <div class="layout-root min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-grow flex items-center justify-center">
      <slot />
    </main>

    <Footer class="text-white" />
  </div>
</template>

<style scoped>
  .layout-root {
    background-image: url('@/assets/images/prelogin-bg.png');
    background-color: #1e293b;
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>

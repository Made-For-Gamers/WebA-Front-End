<script setup>
  import { useHead } from '@vueuse/head'

  import Alert from '@/components/Layout/Alert.vue'
  import Nav from '@/components/Layout/Navbars/Postlogin.vue'
  import Sidebar from '@/components/Layout/Navbars/PostloginSidebar.vue'
  import Footer from '@/components/Layout/Footer.vue'

  useHead({
    title: 'MFGNexus',
    link: { rel: 'icon', type: 'image/png', href: '/mfgnexus.png' },
  })
</script>

<template>
  <Alert />

  <div class="min-h-screen flex">
    <Sidebar />

    <main class="flex flex-col w-full">
      <div class="flex-grow relative">
        <Nav />
        <slot />
      </div>

      <Footer class="px-8" />
    </main>
  </div>
</template>

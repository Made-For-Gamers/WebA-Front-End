<script setup>
  import { ref } from 'vue'

  import Alert from '@/components/Layout/Alert.vue'
  import Navbar from '@/components/Layout/Navbars/Prelogin.vue'
  import Footer from '@/components/Layout/Footer.vue'

  let scrollTop = ref(
    window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  )

  const calculateDistanceFromTop = e => {
    scrollTop.value =
      window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  }

  window.addEventListener('scroll', calculateDistanceFromTop)
</script>

<template>
  <Alert />

  <div class="layout-root min-h-screen flex flex-col">
    <Navbar :scrollTop="scrollTop" />

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

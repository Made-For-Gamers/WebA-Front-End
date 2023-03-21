<script setup>
  import { ref } from 'vue'

  import Alert from '@/components/Layout/Alert.vue'
  import Navbar from '@/components/Layout/Navbars/Landing.vue'
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

  <div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
    <Navbar :scrollTop="scrollTop" />

    <main class="overflow-x-hidden">
      <slot />
    </main>

    <Footer class="bg-white text-gray-500" />
  </div>
</template>

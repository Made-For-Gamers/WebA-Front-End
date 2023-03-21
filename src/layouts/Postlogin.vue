<script setup>
  import { ref } from 'vue'

  import Alert from '@/components/Layout/Alert.vue'
  import Nav from '@/components/Layout/Navbars/Postlogin.vue'
  import Sidebar from '@/components/Layout/Navbars/PostloginSidebar.vue'
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

  <div class="min-h-screen flex">
    <Sidebar :scrollTop="scrollTop" />

    <main class="flex flex-col w-full">
      <div class="flex-grow relative">
        <Nav />
        <slot />
      </div>

      <Footer class="px-8" />
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import Alert from '@/components/Layout/Alert.vue'
  import Navbar from '@/components/Layout/Navbar.vue'
  import Footer from '@/components/Layout/Footer.vue'

  const { currentRoute } = useRouter()

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

  <div class="min-h-full">
    <Navbar :scrollTop="scrollTop" />

    <main :class="`overflow-x-hidden ${currentRoute.meta.fixedNav ? '' : 'pb-4'}`">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

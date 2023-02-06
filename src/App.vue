<script setup>
  import Alert from './components/Layout/Alert.vue'
  import Navbar from './components/Layout/Navbar.vue'
  import Footer from './components/Layout/Footer.vue'
</script>

<template>
  <Alert />

  <div class="min-h-full">
    <Navbar />

    <main class="-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 min-h-[13rem]">
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>

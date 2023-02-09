<script setup>
  import Alert from './components/Layout/Alert.vue'
  import Navbar from './components/Layout/Navbar.vue'
  import Footer from './components/Layout/Footer.vue'
</script>

<template>
  <Alert />

  <div class="min-h-full">
    <Navbar />

    <main class="pb-20">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

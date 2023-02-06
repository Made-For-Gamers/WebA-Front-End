<script setup>
  import { ref } from '@vue/reactivity'
  import Metamask from './Metamask.vue'

  const loading = ref(false)
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52">
    <Metamask :loading="loading" @toggleLoading="loading = !loading" />
  </section>
</template>

<style></style>

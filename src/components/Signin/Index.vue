<script setup>
  import { ref } from '@vue/reactivity'
  import Metamask from './Metamask.vue'
  import Google from './Google.vue'

  const loading = ref(false)
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 flex flex-col gap-4">
    <Metamask :loading="loading" @toggleLoading="loading = !loading" />
    <Google :loading="loading" @toggleLoading="loading = !loading" />
  </section>
</template>

<style></style>

<script setup>
  import { ref } from '@vue/reactivity'

  import Divider from '@/components/Layout/Divider.vue'
  import Metamask from '../Auth/Metamask.vue'
  import NearWallet from '../Auth/NearWallet.vue'
  import Google from '../Auth/Google.vue'
  import EmailPassword from './EmailPassword.vue'

  const loading = ref(false)
</script>

<template>
  <section class="w-1/2 flex flex-col gap-4 rounded-lg shadow-lg bg-blue-50 p-6">
    <h5 class="text-slate-400 px-2 text-center uppercase">Sign in with</h5>

    <div class="flex gap-4 justify-center">
      <Metamask :loading="loading" @toggleLoading="() => (loading = !loading)" />
      <NearWallet :loading="loading" @toggleLoading="() => (loading = !loading)" />
      <Google :loading="loading" @toggleLoading="() => (loading = !loading)" />
    </div>

    <Divider text="OR" text-bg="bg-blue-50" class="my-4" />

    <EmailPassword :loading="loading" @toggleLoading="() => (loading = !loading)" />

    <div class="text-center">
      <router-link to="forgot-password" class="text-[#3366CC] hover:text-[#5b80ca] hover:underline">
        Forgot Password
      </router-link>
    </div>
  </section>
</template>

<style></style>

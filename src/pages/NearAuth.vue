<script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'

  import router from '@/router'
  import { useAppManagerStore } from '@/stores/app-manager'
  import { useUserStore } from '@/stores/user'

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const userStore = useUserStore()

  onMounted(async () => {
    if (!currentRoute.value.query.account_id || !currentRoute.value.query.all_keys) {
      appManagerStore.showAlert({
        color: 'warning',
        text: `Wallet credentials not found.`,
      })
      router.push('/sign-in')
    } else {
      try {
        await userStore.exchangeNearTokenForJwt({
          wallet: currentRoute.value.query.account_id,
          signature: currentRoute.value.query.all_keys,
          message: '',
        })
        appManagerStore.showAlert({ color: 'success', text: "You've successfully been logged in" })
        router.push('/projects')
      } catch (err) {
        console.log('err:', err)
        appManagerStore.showAlert({
          color: 'error',
          text:
            err.message ||
            'An unknown error occurred. Please try again later and if the problem persists, contact support.',
        })
        router.push('/sign-in')
      }
    }
  })
</script>

<template>
  <section class="w-1/2 flex flex-col gap-4 rounded-lg shadow-lg bg-blue-50 p-6">
    <h5 class="text-slate-400 px-2 text-center uppercase">Please wait while we sign you in</h5>
    <ArrowPathIcon class="text-slate-400 mx-auto h-5 w-5 animate-spin" />
  </section>
</template>

<style></style>

<script setup>
  import { ref } from 'vue'
  import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useAppManagerStore } from '@/stores/app-manager'
  import Button from '@/components/Layout/Button.vue'

  // ethereum.networkVersion // current network
  // ethereum.selectedAddress // current account

  // ethereum.on('accountsChanged', function (accounts) {
  //   Time to reload your interface with accounts[0]! - `metamaskLogin()`, I guess
  // });

  const props = defineProps({ loading: Boolean })
  const emit = defineEmits(['toggleLoading'])

  const userStore = useUserStore()
  const appManagerStore = useAppManagerStore()

  const enabled = ref(true)
  if (typeof window.ethereum === 'undefined' || !ethereum.isMetaMask) {
    enabled.value = false
  }

  const metamaskLogin = async () => {
    try {
      emit('toggleLoading')
      const token = await ethereum.request({ method: 'eth_requestAccounts' })
      await userStore.exchangeMetamaskTokenForJwt({ token: token[0] })
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
    }
    emit('toggleLoading')
  }
</script>

<template>
  <!-- 
    metamask colors:
    ----------------
    lighter: #f68615
    light: #e57714
    dark: #cf610e
    darker: #773b0e
  -->

  <Button v-if="enabled" @click="metamaskLogin" :colors="['hover:bg-[#cf610e]', 'bg-[#e57714]']" :loading="loading">
    <div class="rounded-full bg-white p-0.5 w-8 inline-block">
      <img src="../../assets/images/metamask-icon.svg" alt="metamask icon" />
    </div>
    <span>Metamask</span>
  </Button>

  <div v-else class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm text-yellow-700">To continue with Metamask, add the Metamask extension to your browser.</p>
      </div>
    </div>
  </div>
</template>

<style></style>

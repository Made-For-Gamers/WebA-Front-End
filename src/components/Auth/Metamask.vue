<script setup>
  import { ref } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

  import router from '@/router'
  import { useUserStore } from '@/stores/user'
  import { useAppManagerStore } from '@/stores/app-manager'

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
      router.push('/dashboard')
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
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

  <button
    v-if="enabled"
    type="button"
    :disabled="loading"
    :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-[#cf610e]' : ''} text-2xl text-white
        ${!loading ? 'bg-[#e57714]' : 'bg-gray-400'} w-full`"
    @click="metamaskLogin"
  >
    <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
    <div v-else class="flex items-center gap-4">
      <div class="rounded-full bg-white p-0.5 w-8 inline-block">
        <img src="../../assets/images/metamask-logo.svg" alt="metamask logo" />
      </div>
      <span>Metamask</span>
    </div>
  </button>

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

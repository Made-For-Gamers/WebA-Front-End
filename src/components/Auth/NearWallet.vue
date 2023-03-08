<script setup>
  import { ref, onMounted } from 'vue'
  import { ArrowPathIcon } from '@heroicons/vue/24/outline'
  import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

  import { setupWalletSelector } from '@near-wallet-selector/core'
  import { setupNearWallet } from '@near-wallet-selector/near-wallet'
  import { setupModal } from '@near-wallet-selector/modal-ui'

  import router from '../../router'
  import { useUserStore } from '../../stores/user'
  import { useAppManagerStore } from '../../stores/app-manager'

  const props = defineProps({ loading: Boolean })
  const emit = defineEmits(['toggleLoading'])

  const userStore = useUserStore()
  const appManagerStore = useAppManagerStore()

  // onMounted(async () => {
  //   const selector = await setupWalletSelector({
  //     network: 'testnet',
  //     modules: [setupNearWallet()],
  //   })
  // })

  const submit = async () => {
    try {
      emit('toggleLoading')

      console.log('submitting')

      const selector = await setupWalletSelector({
        network: 'testnet',
        modules: [setupNearWallet()],
      })

      const modal = setupModal(selector, {
        contractId: 'guest-book.testnet',
      })

      console.log('selector:', selector)
      console.log('modal:', modal)

      // const token = await ethereum.request({ method: 'eth_requestAccounts' })
      // await userStore.exchangeMetamaskTokenForJwt({ token: token[0] })
      // appManagerStore.showAlert({ color: 'success', text: "You've successfully been logged in" })
      // router.push('/dashboard')
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({ color: 'error', text: err.message })
    }
    emit('toggleLoading')
  }
</script>

<template>
  <button
    type="button"
    :disabled="loading"
    :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 font-normal shadow-sm
      focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-[#000000]' : ''} text-2xl text-white
      ${!loading ? 'bg-[#1E1E1E]' : 'bg-gray-400'} w-full`"
    @click="submit"
  >
    <ArrowPathIcon v-if="loading" class="h-5 w-5 animate-spin" />
    <div v-else class="flex items-center gap-4">
      <img src="../../assets/images/near-icon.jpg" alt="near wallet icon" class="w-8" />
      <span>NEAR Wallet</span>
    </div>
  </button>
</template>

<style></style>

<script setup>
  import { ref, onMounted } from 'vue'
  import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

  import { setupWalletSelector } from '@near-wallet-selector/core'
  import { setupNearWallet } from '@near-wallet-selector/near-wallet'
  import { setupNarwallets } from '@near-wallet-selector/narwallets'
  import { setupModal } from '@near-wallet-selector/modal-ui'
  import '@near-wallet-selector/modal-ui/styles.css'
  import * as nearApi from 'near-api-js'

  import router from '../../router'
  import { useUserStore } from '../../stores/user'
  import { useAppManagerStore } from '../../stores/app-manager'
  import Button from '@/components/Layout/Button.vue'

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

      const narWallets = setupNarwallets({})

      const nearWallet = setupNearWallet({
        successUrl: 'http://localhost:3000/near-auth',
        failureUrl: 'http://localhost:3000/near-auth',

        // successUrl: 'https://webhook.site/5ccbd8bc-e5d1-4ca1-8390-1ab6a89172e2',
        // failureUrl: 'https://webhook.site/5ccbd8bc-e5d1-4ca1-8390-1ab6a89172e2'
      })

      const selector = await setupWalletSelector({
        network: 'mainnet',
        modules: [nearWallet, narWallets],
      })

      //BELOW CODE TO GET SIGNED IN WALLET INFO AND ALSO SIGN OUT:
      const isSignedIn = selector.isSignedIn()
      if (isSignedIn) {
        const wallet = await selector.wallet()
        const activeAcc = await wallet.getAccounts()

        // const accessKey = wallet.activeAcc().addKey(nearApi.utils.KeyPair.fromRandom('ed25519').publicKey.toString(), 'fullAccess')

        console.log('WalletObj:', wallet)
        console.log('WalletID:', wallet.id)
        console.log('Account Obj:', activeAcc[0])
        console.log('AccountId:', activeAcc[0].accountId)
        console.log('PublicKey:', activeAcc[0].publicKey)

        const verParams = {
          message: 'check me out',
          //callbackUrl: "https://webhook.site/#!/5ccbd8bc-e5d1-4ca1-8390-1ab6a89172e2/6d6670ff-bafd-4a0c-acc6-cb3445c7e717/1",
          // meta: "meta dataaaa"
        }
        // const res = await wallet.verifyOwner(verParams)
        // console.log('RES PublicKey:', res.publicKey)

        //This should happen only once
        //const accessKey = await activeAcc[0].addKey(nearApi.utils.KeyPair.fromRandom('ed25519').publicKey.toString(), 'fullAccess')
        //console.log('Access Key:', accessKey)

        //Comment/Uncomment until signout state has been implemented
        wallet.signOut()
      }

      const modal = setupModal(selector, {}).show()

      console.log('selector:', selector)
      console.log('modal:', modal)

      // const token = await ethereum.request({ method: 'eth_requestAccounts' })
      // await userStore.exchangeMetamaskTokenForJwt({ token: token[0] })
      // appManagerStore.showAlert({ color: 'success', text: "You've successfully been logged in" })
      // router.push('/projects')
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
  <Button @click="submit" :colors="['hover:bg-[#000000]', 'bg-[#1E1E1E]']" :loading="loading">
    <img src="../../assets/images/near-icon.jpg" alt="near wallet icon" class="w-8" />
    <span>NEAR Wallet</span>
  </Button>
</template>

<style></style>

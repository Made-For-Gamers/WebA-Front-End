<script setup>
  import { ref } from 'vue'

  // ethereum.networkVersion // current network
  // ethereum.selectedAddress // current account

  // ethereum.on('accountsChanged', function (accounts) {
  //   Time to reload your interface with accounts[0]! - `metamaskLogin()`, I guess
  // });

  const showMetamask = ref(true)
  const account = ref(null)

  if (typeof window.ethereum === 'undefined' || !ethereum.isMetaMask) {
    showMetamask.value = false
  }

  const metamaskLogin = async () => {
    try {
      account.value = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('account:', account.value)
    } catch (err) {
      console.log('err:', err)
    }
  }
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52">
    <!--  -->
    <button v-if="showMetamask" class="bg-[#e57714] px-4 py-2" @click="metamaskLogin">Metamask</button>
    <p v-else>To sign in with Metamask, add the Metamask extension to your browser.</p>
    <br />
    <br />
    account: {{ account }}
    <!--  -->
  </section>
</template>

<style></style>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ArrowUpOnSquareIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import TextField from '@/components/Layout/TextField.vue'
import Button from '@/components/Layout/Button.vue'
import { useAppManagerStore } from '@/stores/app-manager'
import { useGamejamStore } from '@/stores/gamejam'
import { NFTStorage, File, Blob } from 'nft.storage'
import Divider from '@/components/Layout/Divider.vue'
import * as nearAPI from "near-api-js";
 

const gamejamStore = useGamejamStore()
const appManagerStore = useAppManagerStore()
const NFT_STORAGE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZBODcxOUNkNkNBNTIyZjY3QzgzODBjYkRBRWQ1Zjk3MTFCODc3MEQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDI1MDI2NzM2OSwibmFtZSI6Im1mZy5pcGZzLnRlc3QifQ.goMZ7HmcSxl-vte1weVvmZO9CmHdfF0XSJFqRnykZq4'

//NEAR
const { keyStores, KeyPair } = nearAPI;
const myKeyStore = new keyStores.InMemoryKeyStore();
const PRIVATE_KEY = 'ed25519:2SmrVjNnEQpRJPRWaaoy2DGNBk3tN5ZAe72C27yYJfDSc8aCaXwWNfmUgiUnevVdSpmmoZu3YwdciJudnpUfxujt'
// creates a public / private key pair using the provided private key


const loading = ref(false)
const fileInput = ref(null)
const meta = ref([])
const file = reactive({
  data: null,
  meta: null,
})

const nearConfig = {
  networkId: 'testnet', // change this to 'mainnet' for production
  nodeUrl: 'https://rpc.testnet.near.org', // change this to 'https://rpc.mainnet.near.org' for production
  contractName: 'mfg.testnet', // replace with your contract name
  walletUrl: 'https://wallet.testnet.near.org', // change this to 'https://wallet.mainnet.near.org' for production
}

async function initNear() {
  const nearConfig = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
  }

  const near = await connect(nearConfig)
  const walletConnection = new walletConnection(near, 'MFG Game Jam')
  const accountId = walletConnection.getAccountId()

  return { walletConnection, accountId }
}

async function callNearSmartContract(cid, walletConnection, accountId) {
  const tokenId = Math.floor(Math.random() * 100000000)
  const data = {
    token_id: tokenId.toString(),
    owner_id: accountId,
    metadata: {
      title: form.title.value,
      description: form.description.value,
      media: `https://${cid}.ipfs.nftstorage.link/`,
      custom_fields: 'Custom Fields',
    },
  }

  const contractAddress = 'mfg.testnet' // Replace with your smart contract address
  const contractMethods = {
    viewMethods: ['get_nft'], // Add view methods if needed
    changeMethods: ['mint_nft', 'get_nfts_by_owner'], // Replace with your smart contract function name
  }

  const contract = new contract(walletConnection.account(), contractAddress, contractMethods)

  // Call your NEAR smart contract function here with the data object
  const result = await contract.mint_nft(data)

  console.log('Smart contract function call result:', result)

  //call view smart contract to see if its there
  const nft = await contract.get_nft({ token_id: tokenId })
  console.log('NFT RETREIVED:', nft)
}

async function initNearWallet(){
  accID = ''

  const nearWallet = setupNearWallet({   })
  const narWallets = setupNarwallets({})

  const selector = await setupWalletSelector({
        // network: import.meta.env.DEV ? 'testnet' : 'mainnet',
        network: 'testnet',
        modules: [nearWallet, narWallets], 
      })

      const isSignedIn = selector.isSignedIn()
      if (isSignedIn) {
        const wallet = await selector.wallet()
        const activeAcc = await wallet.getAccounts() 
      }

    const modal = setupModal(selector, {
      contractId: "mfg.testnet"
    });

}

async function initNearNew() {
 
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  // adds the keyPair you created to keyStore
  await myKeyStore.setKey("testnet", "mfg.testnet", keyPair);
 
  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
 
  // connect to NEAR
  const nearConnection = await nearAPI.connect(connectionConfig);
 
  // create wallet connection
  const walletConnection = new nearAPI.WalletConnection(nearConnection);

  const account = await nearConnection.account("mfg.testnet");
  await account.getAccountDetails();

  const accountId = walletConnection.getAccountId()

  const response = await nearConnection.connection.provider.query({
        request_type: "call_function",
        finality: "final",
        account_id: "mfg.testnet",
        method_name: "get_nft",
        args_base64: "IntcInRva2VuX2lkXCI6IFwiMVwifSI=",
      });

  console.log('response', response)
 
  return { walletConnection, accountId }

}



  
const form = reactive({
  cid: {
    value: '',
    error: true,
    rules: [v => !!v || 'Please enter a CID'],
  },
  title: {
    value: '',
    error: true,
    rules: [v => !!v || 'Please enter a Title'],
  },
  description: {
    value: '',
    error: false,
  },
  amount: {
    value: '',
    error: true,
    rules: [v => !!v || 'Please enter an Amount'],
  },
  to: {
    value: '',
    error: true,
    rules: [v => !!v || 'Please enter a To'],
  },
  from: {
    value: '',
    error: true,
    rules: [v => !!v || 'Please enter a From'],
  },
})

const invalid = computed(
  () => Object.keys(form).some(v => form[v].error) || !file.data || meta.value.some(v => v.key.error || v.value.error)
)

const submit = async () => {
  loading.value = true

  try {
 
    initNearNew();

    const { walletConnection, accountId } = await initNear()

    if (form.cid.value) {
      // If there is already a CID value, call the smart contract function 
      await callNearSmartContract(form.cid.value, walletConnection, accountId)
    }
    else if (file.data) {
      // If there is an image in file.data, upload it to NFTStorage and then call the smart contract function
      const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
      const imageBlob = new Blob([file.data], { type: file.data.type })
      const cid = await client.storeBlob(imageBlob)
      if (!cid) throw new Error('Error storing the image to IPFS')
      form.cid.value = cid
    }
    else {
      throw new Error('Please upload an image or enter a CID before proceeding')
    }

    await callNearSmartContract(form.cid.value, walletConnection, accountId)

    appManagerStore.showAlert({ color: 'success', text: res.message })

    form.title = { ...form.title, value: '', error: true }
    form.description = { ...form.description, value: '', error: false }
    form.amount = { ...form.amount, value: '', error: true }
    form.to = { ...form.to, value: '', error: true }
    form.from = { ...form.from, value: '', error: true }

    file.data = null
    file.meta = null

    meta.value = []
    loading.value = false

    // TODO: redirect here, or do whatever needs to happen post-minting xD
  } catch (err) {
    loading.value = false
    console.log('err B:', err)
    appManagerStore.showAlert({
      color: 'error',
      text:
        err.message ||
        'An unknown error occurred. Please try again later and if the problem persists, contact support.',
    })
  }
}

const dropFile = fileData => {
  if (!fileData.data) {
    const ext = fileData.name.substring(fileData.name.lastIndexOf('.'), fileData.name.length)
    if (['.png', '.jpeg', '.jpg', '.webp'].includes(ext.toLowerCase())) {
      const MAX_FILE_SIZE_MB = 5
      if (fileData.size / 1024 / 1024 <= MAX_FILE_SIZE_MB) {
        file.data = URL.createObjectURL(fileData)
        file.meta = fileData
      } else {
        appManagerStore.showAlert({
          color: 'warning',
          timeout: 5000,
          text: `Maximum file size exceeded. Max size: ${MAX_FILE_SIZE_MB} MB.`,
        })
      }
    } else {
      appManagerStore.showAlert({
        color: 'warning',
        timeout: 5000,
        text: 'File format has to be one of the following: .png, .jpg, .webp',
      })
    }
  } else {
    emit('updateProfilePic', fileData.data)
  }
}

const picked = e => {
  dropFile(e.target.files[0])
}

const explorer = () => {
  if (!file.data) {
    fileInput.value.click()
  }
}

const clear = e => {
  file.data = null
  file.meta = null
}

const addMeta = () => {
  meta.value.push({
    key: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Key'],
    },
    value: {
      value: '',
      error: true,
      rules: [v => !!v || 'Please enter a Value'],
    },
  })
}
</script>


<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-16">

    <!-- Title -->
    <div class="flex justify-between items-center">
      <h5 class="text-slate-500 uppercase text-xl">Mint NFT</h5>
    </div>

    <!-- a div grid with two columns -->
    <div class="grid grid-cols-2 mt-8">

      <!-- Left Column -->
      <div class="left-column">
        <p class="block text-sm font-medium text-gray-700">Upload your image or use an existing IPFS CID</p>

        <div class="relative w-64 h-64">
          <input ref="fileInput" type="file" class="hidden" @change="picked" />

          <div class="w-full h-full overflow-hidden flex items-center justify-center" :style="{
            'background-image': `url(${file.data})`,
            'background-color': '#374151',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
          }" @dragover.prevent @drop="() => dropFile($event.dataTransfer.files[0])">

          </div>

          <button :class="`rounded-full absolute bottom-0 -left-2 w-10 h-10 shadow-sm flex items-center justify-center text-white
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-indigo-700' : ''}
                                    ${!loading ? 'bg-indigo-600' : 'bg-gray-400'}`"
            @click="() => (file.data ? clear() : explorer())">
            <ArrowPathIcon v-if="file.data" :style="{ width: '24px', height: '24px' }" />
            <ArrowUpOnSquareIcon v-else :style="{ width: '24px', height: '24px' }" />
          </button>

          <Divider text="OR" text-bg="bg-blue-50" class="my-4" />

          <TextField class="mt-8" type="text" label="CID" :value="form.cid.value" :error="form.cid.error"
            :rules="form.cid.rules" @value="val => (form.cid.value = val)" @error="err => (form.cid.error = err)" />
        </div>

      </div>

      <!-- Right Column -->
      <div class="right-column">
        <form class="space-y-4">
          <!-- Right column components -->
          <p class="block text-sm font-medium text-gray-700">Upload an image or enter CID</p>

          <form class="space-y-4">
            <TextField type="text" label="Title" :value="form.title.value" :error="form.title.error"
              :rules="form.title.rules" @value="val => (form.title.value = val)"
              @error="err => (form.title.error = err)" />

            <TextField type="text" label="Description" :value="form.description.value"
              @value="val => (form.description.value = val)" />

            <TextField type="text" label="Amount" :value="form.amount.value" :error="form.amount.error"
              :rules="form.amount.rules" @value="val => (form.amount.value = val)"
              @error="err => (form.amount.error = err)" />

            <TextField type="text" label="To" :value="form.to.value" :error="form.to.error" :rules="form.to.rules"
              @value="val => (form.to.value = val)" @error="err => (form.to.error = err)" />

            <TextField type="text" label="From" :value="form.from.value" :error="form.from.error" :rules="form.from.rules"
              @value="val => (form.from.value = val)" @error="err => (form.from.error = err)" />

            <div v-for="(meta, i) in meta" :key="i" class="flex gap-2">
              <TextField type="text" label="Key" :value="meta.key.value" :error="meta.key.error" :rules="meta.key.rules"
                @value="val => (meta.key.value = val)" @error="err => (meta.key.error = err)" class="w-full" />

              <TextField type="text" label="Value" :value="meta.value.value" :error="meta.value.error"
                :rules="meta.value.rules" @value="val => (meta.value.value = val)"
                @error="err => (meta.value.error = err)" class="w-full" />

              <button type="button" :disabled="loading" :class="`inline-flex items-center justify-center rounded-md border border-transparent p-2 font-normal mt-6
                              focus:outline-none focus:ring-2 focus:ring-offset-2 ${!loading ? 'hover:bg-[#c71610a0]' : ''} h-full
                              ${!loading ? 'bg-[#C71610]' : 'bg-gray-400'} text-2xl text-white shadow-sm`"
                @click="() => meta?.splice(i, 1)">
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>

            <Button @click="addMeta" :disabled="loading" :loading="loading" :block="true">Add Field</Button>
            <Button @click="submit" :disabled="invalid" :loading="loading" :block="true">Submit</Button>
          </form>
        </form>
      </div>
    </div>

  </section>
</template>

<style></style>

<script setup>
  import { ref, onMounted, toRaw } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    PencilSquareIcon,
    ArrowUpRightIcon,
    BanknotesIcon,
    BeakerIcon,
    BoltIcon,
    BugAntIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
    MapPinIcon,
    ChartPieIcon,
    ChartBarIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    HashtagIcon,
    BackwardIcon,
    HandRaisedIcon,
    CalculatorIcon,
    CircleStackIcon,
    CloudIcon,
    CubeIcon,
    CurrencyDollarIcon,
    EyeDropperIcon,
    FireIcon,
    FlagIcon,
  } from '@heroicons/vue/24/outline'

  import { useAppManagerStore } from '@/stores/app-manager'
  import { useProviderFeatureStore } from '@/stores/providerFeature'
  import { useGameFeatureStore } from '@/stores/gameFeature'

  import TextField from '@/components/Layout/TextField.vue'

  const { currentRoute } = useRouter()
  const appManagerStore = useAppManagerStore()
  const providerFeatureStore = useProviderFeatureStore()
  const gameFeatureStore = useGameFeatureStore()

  const props = defineProps({
    project: Object,
  })

  const features = ref([])
  const availableFeatures = ref([])
  const selectedCategory = ref({ value: 0, text: 'All' })

  // const icons = ref([
  //   { API: ArrowUpRightIcon },
  //   { SDK: BanknotesIcon },
  //   { 'Infrastructure & Hosting': BeakerIcon },
  //   { 'Web 3 Wallet': BoltIcon },
  //   { DeFi: BugAntIcon },
  //   { GameFi: ArrowsPointingInIcon },
  //   { Metaverse: ArrowsPointingOutIcon },
  //   { 'Game Engine Plugin': MapPinIcon },
  //   { Accelerator: ChartPieIcon },
  //   { Tokenomics: ChartBarIcon },
  //   { 'Smart Contract': PaperAirplaneIcon },
  //   { Publisher: PaperClipIcon },
  //   { 'Smart Contract': HashtagIcon },
  //   { Bridge: BackwardIcon },
  //   { 'Fiat Ramp': HandRaisedIcon },
  //   { 'NFT Minting': CalculatorIcon },
  //   { 'NFT Marketplace': CircleStackIcon },
  //   { 'Game Asset': CloudIcon },
  //   { Oracle: CubeIcon },
  //   { 'Artificial Intelligence': CurrencyDollarIcon },
  //   { WebGL: EyeDropperIcon },
  //   { Web3: FireIcon },
  //   { Network: FlagIcon },
  // ])

  const linkFeature = async feature => {
    if (appManagerStore.loading) return

    try {
      appManagerStore.loading = true

      const res = await gameFeatureStore.linkFeature({
        project_id: parseInt(currentRoute.value.params.id),
        feature_id: feature.id,
        is_active: true,
      })

      appManagerStore.showAlert({ color: 'success', text: res.message })

      availableFeatures.value = availableFeatures.value.filter(v => v.id !== feature.id)
      features.value.push(feature)
    } catch (err) {
      console.log('err:', err)
      appManagerStore.showAlert({
        color: 'error',
        text:
          err.message ||
          'An unknown error occurred. Please try again later and if the problem persists, contact support.',
      })
    }

    appManagerStore.loading = false
  }

  const setCategory = category => {
    selectedCategory.value = category

    console.log('gameFeatureStore:', gameFeatureStore.features)
    console.log('providerFeatureStore:', providerFeatureStore.features)

    if (selectedCategory.value === 0) {
      features.value = gameFeatureStore.features
      availableFeatures.value = providerFeatureStore.features
    } else {
      features.value = gameFeatureStore.features.filter(v => v.feature_type[0] === selectedCategory.text)
      availableFeatures.value = providerFeatureStore.features.filter(v => v.feature_type[0] === selectedCategory.text)
    }
  }

  onMounted(async () => {
    providerFeatureStore.fetchCategories()

    appManagerStore.loading = true
    let res = await gameFeatureStore.fetchFeatures(currentRoute.value.params.id)
    features.value = res.body.sort((a, b) => (a.name > b.name ? 1 : -1))

    res = await providerFeatureStore.fetchAllFeatures()
    availableFeatures.value = res.body
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .filter(v1 => !features.value.find(v2 => v2.feature_id === v1.id))
    appManagerStore.loading = false
  })
</script>

<template>
  <div class="grid grid-cols-4 gap-4 lg:mx-16">
    <section
      v-if="providerFeatureStore.categories.length"
      class="col-span-1 rounded-lg shadow p-4 bg-[#576d8d] text-white mt-4"
    >
      <h4 class="text-2xl lg:text-3xl font-audiowide">Categories</h4>
      <ul class="text-xl mt-4">
        <li
          v-for="category in [{ value: 0, text: 'All' }, ...providerFeatureStore.categories]"
          :key="category.value"
          :class="`cursor-pointer ${selectedCategory.value === category.value ? 'underline' : 'hover:underline'}`"
          @click="() => setCategory(category)"
        >
          {{ category.text }}
        </li>
      </ul>
    </section>

    <div class="col-span-3">
      <section v-if="features.length" class="rounded-lg shadow p-4 mt-4 bg-white">
        <h4 class="text-2xl lg:text-3xl font-audiowide mb-4">Features</h4>

        <div class="grid grid-cols-3 gap-4">
          <!-- features: {{ features }} -->

          <div
            v-for="feature in features"
            :key="feature.id"
            class="col-span-1 rounded-lg bg-white cursor-pointer shadow hover:shadow-lg p-2 flex gap-2"
          >
            <!-- <component :is="icons[feature.feature_type[0]]" class="h-8 w-8 m-auto" /> -->
            <div class="flex-1">
              <h3 class="text-xl">{{ feature.name }}</h3>
              <p>{{ feature.feature_type[0] }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="availableFeatures.length" class="rounded-lg shadow p-4 bg-white mt-4">
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-2xl lg:text-3xl font-audiowide">Add Feature</h4>

          <!-- <TextField type="text" label="Search" placeholder :value="''" @value="val => {}" class="w-1/4" /> -->
        </div>

        <div class="grid grid-cols-3 gap-4">
          <!-- availableFeatures: {{ availableFeatures }} -->

          <div
            v-for="feature in availableFeatures"
            :key="feature.id"
            class="col-span-1 rounded-lg bg-white cursor-pointer shadow hover:shadow-lg p-2 flex gap-2"
            @click="() => linkFeature(feature)"
          >
            <!-- <component :is="icons[feature.feature_type[0]]" class="h-8 w-8 m-auto" /> -->
            <div class="flex-1">
              <h3 class="text-xl">{{ feature.name }}</h3>
              <p>{{ feature.feature_type[0] }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>

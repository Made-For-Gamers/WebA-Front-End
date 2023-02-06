<script setup>
  import { XMarkIcon } from '@heroicons/vue/20/solid'
  import { watch } from 'vue'

  import { useAppManagerStore } from '../../stores/app-manager'
  import { colors, icons } from './AlertColors.js'

  const appManagerStore = useAppManagerStore()
</script>

<template>
  <div
    v-if="appManagerStore.alert.visible"
    :class="`fixed z-50 w-[96%] lg:w-1/2 top-2 left-1/2 -translate-x-1/2 border-l-4 p-4 shadow-2xl
      ${colors[appManagerStore.alert.color][1]} ${colors[appManagerStore.alert.color][0]}`"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="icons[appManagerStore.alert.color]"
          :class="`h-5 w-5 ${colors[appManagerStore.alert.color][2]}`"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <p :class="`text-sm font-medium ${colors[appManagerStore.alert.color][3]}`">{{ appManagerStore.alert.text }}</p>
      </div>
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            @click="appManagerStore.hideAlert()"
            :class="`inline-flex rounded-md ${colors[appManagerStore.alert.color][0]} p-1.5 focus:outline-none
              ${colors[appManagerStore.alert.color][4]} ${colors[appManagerStore.alert.color][5]} focus:ring-offset-2
              ${colors[appManagerStore.alert.color][7]} focus:ring-2`"
          >
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

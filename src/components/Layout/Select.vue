<script setup>
  import { computed, ref } from 'vue'
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

  const emit = defineEmits(['value', 'error'])
  const props = defineProps({
    label: String,
    value: Object,
    error: Boolean | String,
    rules: Array,
    dark: Boolean,
    items: Array,
  })

  const id = computed(() => `${props.label.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 9999) + 1}`)

  const selected = computed({
    get() {
      return props.value
    },
    set(newVal) {
      emit('value', newVal)
      emit(
        'error',
        props?.rules?.reduce((s, v) => {
          if (s) return s

          const failsRule = v(newVal)
          if (failsRule === true) return false
          else return failsRule
        }, false)
      )
    },
  })

  let labelColor = 'text-red-600'
  if (!props.error || props.error === true) labelColor = props.dark ? 'text-white' : 'text-gray-700'
</script>

<template>
  <Listbox as="div" v-model="selected">
    <ListboxLabel :class="`block text-sm font-medium ${labelColor}`">{{ label }}</ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        :class="`relative w-full cursor-default rounded-md border py-2
          ${!error || error === true ? 'border-gray-300' : 'border-red-600'}
          bg-white pl-3 pr-10 shadow-sm sm:text-sm focus:outline-none
          ${error ? 'focus:border-red-600' : 'focus:border-indigo-500'}
          text-left`"
      >
        <span class="block truncate">{{ selected?.text || `Please select a ${label}` }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <span v-if="error" class="text-red-600 text-xs">
        {{ error === true ? '' : error }}
      </span>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="item in items"
            :key="item.value"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-8 pr-4',
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ item.text }}</span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style scoped></style>

<script>
  export default {
    props: {
      type: String,
      label: String,
      value: String,
      error: Boolean | String,
      rules: Array,
    },

    emits: ['value', 'error'],

    computed: {
      id() {
        return `${this.label.replace(/\s+/g, '-').toLowerCase()}-${Math.floor(Math.random() * 9999) + 1}`
      },
    },

    methods: {
      handleInput(e) {
        this.$emit('value', e.target.value)
        this.$emit(
          'error',
          this.rules.reduce((s, v) => {
            if (s) return s

            const failsRule = v(e.target.value)
            if (failsRule === true) return false
            else return failsRule
          }, false)
        )
      },
    },
  }
</script>

<template>
  <label
    :for="id"
    :class="`block text-sm font-medium
      ${!error || error === true ? 'text-gray-700' : 'text-red-600'}`"
  >
    {{ label }}
  </label>

  <div class="mt-1">
    <input
      :id="id"
      :name="id"
      :type="type"
      autocomplete="nope"
      :value="value"
      @input="handleInput"
      :class="`block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm
        focus:outline-none ${!error || error === true ? 'border-gray-300' : 'border-red-600'}
        ${error ? 'focus:border-red-600' : 'focus:border-indigo-500'}`"
    />

    <span v-if="error" class="text-red-600 text-xs">
      {{ error === true ? '' : error }}
    </span>
  </div>
</template>

<style></style>

<script setup>
  import List from '@/components/Projects/List.vue'
</script>

<template>
  <section class="rounded-lg bg-white shadow p-6 lg:mx-52 my-8">
    <router-link
      type="button"
      :class="`inline-flex items-center justify-center rounded-md border border-transparent px-4
        py-2 font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700
        text-2xl bg-indigo-600 text-white shadow-sm`"
      to="/projects/create"
    >
      Create New Project
    </router-link>

    <List />
  </section>
</template>

<style></style>

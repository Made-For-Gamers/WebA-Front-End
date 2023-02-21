<script setup></script>

<template>
  <div class="landing-bg bg-fixed h-screen w-full flex items-center px-2 lg:justify-end lg:px-24">
    <div class="text-white bg-[#00000093] p-2 lg:w-[80%] lg:p-4 lg:rounded-xl">
      <h1 class="text-6xl lg:text-8xl font-medium font-space-ranger">Made For Gamers</h1>
      <h3 class="text-2xl my-6 lg:text-4xl lg:my-8 font-audiowide">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam sint dignissimos officiis possimus inventore
        consectetur voluptatum.
      </h3>
      <button
        :class="`inline-flex items-center justify-center rounded-md border border-transparent px-8 py-4 font-normal focus:ring-2
          focus:outline-none focus:ring-offset-2 hover:bg-indigo-700 text-2xl bg-indigo-600 text-white shadow-sm`"
        type="button"
      >
        Big CTA
      </button>
    </div>
  </div>
</template>

<style scoped>
  .landing-bg {
    background-image: url('../../assets/images/landing-bg.jpg');
  }
</style>

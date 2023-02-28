<script setup></script>

<template>
  <div class="h-screen w-full flex items-center px-2 lg:justify-center lg:px-24">
    <video autoplay muted class="fixed right-0 bottom-0 min-w-full min-h-full max-w-none -z-10">
      <source src="@/assets/videos/landing-bg.mp4" type="video/mp4" />
    </video>

    <div class="text-white bg-[#00000033] p-2 lg:w-[80%] lg:p-4 lg:rounded-xl">
      <h1 class="text-6xl lg:text-8xl font-medium font-space-ranger text-center">Made For Gamers</h1>
      <h3 class="text-2xl my-6 lg:text-3xl lg:my-8 font-audiowide text-center">
        Made for Gamers has built a game development and web3 infrastructure aggregation and integration platform where
        creators can find and integrate APIs, SDKs, infrastructure or anything else they may require as part of
        building, launching and distributing their game.
      </h3>
      <div class="text-center">
        <router-link
          :class="`inline-flex items-center justify-center rounded-md border border-transparent px-8 py-4 font-normal focus:ring-2
          focus:outline-none focus:ring-offset-2 hover:bg-indigo-700 text-2xl bg-indigo-600 text-white shadow-sm`"
          to="/register"
        >
          Start Here
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

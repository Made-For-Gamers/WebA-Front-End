<script setup>
  import { DiscordIcon, TelegramIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from 'vue3-simple-icons'

  import ContactForm from './ContactForm.vue'
</script>

<template>
  <section class="grid grid-cols-1 gap-4 lg:col-span-2 rounded-lg bg-white shadow p-6">
    <ContactForm />

    <div class="grid grid-cols-5 text-center border-t border-t-gray-100 pt-6 mt-4">
      <a target="_blank" class="social-icon" href="https://discord.gg/dN6MNGmCsH">
        <DiscordIcon style="fill: #5865f2" />
      </a>
      <a target="_blank" class="social-icon" href="https://t.me/+pgRNeWJcq3wxMDQ9">
        <TelegramIcon style="fill: #26a5e4" />
      </a>
      <a target="_blank" class="social-icon" href="https://www.facebook.com/gaming/WeGetGamers">
        <FacebookIcon style="fill: #1877f2" />
      </a>
      <a target="_blank" class="social-icon" href="https://www.linkedin.com/company/madeforgamers/">
        <LinkedinIcon style="fill: #0a66c2" />
      </a>
      <a target="_blank" class="social-icon" href="https://twitter.com/MadeforGamers1">
        <TwitterIcon style="fill: #1da1f2" />
      </a>
    </div>
  </section>
</template>

<style scoped>
  svg {
    margin: auto;
  }
</style>

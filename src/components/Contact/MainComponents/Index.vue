<script setup>
  import { DiscordIcon, TelegramIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from 'vue3-simple-icons'

  import ContactForm from '@/components/Contact/MainComponents/ContactForm.vue'
  import SocialButton from '@/components/Contact/MainComponents/SocialButton.vue'

  const socialButtons = [
    { href: 'https://discord.gg/dN6MNGmCsH', icon: DiscordIcon, fill: '#5865f2' },
    { href: 'https://t.me/+pgRNeWJcq3wxMDQ9', icon: TelegramIcon, fill: '#26a5e4' },
    { href: 'https://www.facebook.com/gaming/WeGetGamers', icon: FacebookIcon, fill: '#1877f2' },
    { href: 'https://www.linkedin.com/company/madeforgamers/', icon: LinkedinIcon, fill: '#0a66c2' },
    { href: 'https://twitter.com/MadeforGamers1', icon: TwitterIcon, fill: '#1da1f2' },
  ]
</script>

<template>
  <section class="grid grid-cols-1 gap-4 lg:col-span-2 rounded-lg bg-white shadow p-6">
    <ContactForm />

    <div class="grid grid-cols-5 text-center border-t border-t-gray-100 pt-6 mt-4">
      <SocialButton v-for="(icon, i) in socialButtons" :key="i" :href="icon.href" :icon="icon.icon" :fill="icon.fill" />
    </div>
  </section>
</template>

<style scoped>
  svg {
    margin: auto;
  }
</style>

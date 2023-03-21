<script setup>
  import { DiscordIcon, TelegramIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from 'vue3-simple-icons'

  import Divider from '@/components/Layout/Divider.vue'
  import ContactForm from '@/components/Contact/MainComponents/ContactForm.vue'
  import SocialButton from '@/components/Contact/MainComponents/SocialButton.vue'

  const socialButtons = [
    { href: 'https://discord.gg/uu4wZEhBnh', icon: DiscordIcon, fill: '#5865f2' },
    { href: 'https://t.me/+pgRNeWJcq3wxMDQ9', icon: TelegramIcon, fill: '#26a5e4' },
    { href: 'https://www.facebook.com/MadeForGamersHQ', icon: FacebookIcon, fill: '#1877f2' },
    { href: 'https://www.linkedin.com/company/madeforgamershq/', icon: LinkedinIcon, fill: '#0a66c2' },
    { href: 'https://twitter.com/MadeForGamersHQ', icon: TwitterIcon, fill: '#1da1f2' },
  ]
</script>

<template>
  <section class="w-1/2 flex gap-8 rounded-lg shadow-lg bg-blue-50 p-6">
    <div class="flex-grow flex flex-col gap-4">
      <h5 class="text-slate-400 px-2 text-center uppercase">Get in touch</h5>

      <div>
        <ContactForm />

        <div class="grid grid-cols-5 text-center border-t border-t-gray-100 pt-6 mt-4">
          <SocialButton
            v-for="(icon, i) in socialButtons"
            :key="i"
            :href="icon.href"
            :icon="icon.icon"
            :fill="icon.fill"
          />
        </div>
      </div>
    </div>

    <div class="flex-grow flex flex-col gap-4">
      <h5 class="text-slate-400 px-2 text-center uppercase">Or pop in</h5>

      <iframe
        class="w-full min-h-[30rem]"
        src="https://maps.google.com/maps?q=London&z=14&t=m&output=embed&iwloc=near"
      ></iframe>
    </div>
  </section>
</template>

<style></style>

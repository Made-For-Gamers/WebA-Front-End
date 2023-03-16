<script setup>
  import { DiscordIcon, TelegramIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from 'vue3-simple-icons'

  import SocialButton from '@/components/Contact/MainComponents/SocialButton.vue'

  const openSocial = href => window.open(href, '_blank')
  const socialButtons = [
    { title: 'Discord', href: 'https://discord.gg/uu4wZEhBnh', icon: DiscordIcon, fill: '#5865f2' },
    { title: 'Telegram', href: 'https://t.me/+pgRNeWJcq3wxMDQ9', icon: TelegramIcon, fill: '#26a5e4' },
    { title: 'Facebook', href: 'https://www.facebook.com/MadeForGamersHQ', icon: FacebookIcon, fill: '#1877f2' },
    {
      title: 'Linkedin',
      href: 'https://www.linkedin.com/company/madeforgamershq/ ',
      icon: LinkedinIcon,
      fill: '#0a66c2',
    },
    { title: 'Twitter', href: 'https://twitter.com/MadeForGamersHQ', icon: TwitterIcon, fill: '#1da1f2' },
  ]
</script>

<template>
  <div class="parallax-bg grid grid-cols-6 gap-4 w-full px-2 py-8 lg:px-24 lg:py-24">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 mb-16 lg:mb-32 text-white bg-[#0000007d]" data-aos="fade-up">
      <h2 class="text-5xl lg:text-6xl font-medium text-center font-space-ranger">Join Our Communities</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-8 text-center font-audiowide">
        Connect, collaborate, and create with our community.
      </h4>
    </div>

    <div class="col-span-6 flex justify-between gap-4 w-full overflow-x-scroll lg:overflow-x-auto overflow-y-hidden">
      <div
        v-for="(icon, i) in socialButtons"
        :key="i"
        class="bg-white hover:shadow rounded-2xl w-full flex flex-col gap-4 lg:gap-8 items-center justify-center cursor-pointer p-4"
        @click="() => openSocial(icon.href)"
        data-aos="fade-up"
        :data-aos-delay="100 * i"
      >
        <SocialButton :href="icon.href" :icon="icon.icon" :fill="icon.fill" size="7rem" />
        <h3 class="text-4xl">{{ icon.title }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .parallax-bg {
    background-image: url('@/assets/images/bg-gamy.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>

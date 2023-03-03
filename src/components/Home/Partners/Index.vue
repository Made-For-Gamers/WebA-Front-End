<script setup>
  import Logo from '@/components/Home/Partners/Logo.vue'

  import bga from '@/assets/images/partner-logos/bga.svg'
  import block8 from '@/assets/images/partner-logos/block8.png'
  import caduceus from '@/assets/images/partner-logos/caduceus.svg'
  import fewfar from '@/assets/images/partner-logos/fewfar.jpg'
  import idexo from '@/assets/images/partner-logos/idexo.png'
  import lemonade from '@/assets/images/partner-logos/lemonade.svg'
  import momint from '@/assets/images/partner-logos/momint.svg'
  import near from '@/assets/images/partner-logos/near.svg'
  import opGames from '@/assets/images/partner-logos/op-games.png'
  import outlierVentures from '@/assets/images/partner-logos/outlier-ventures.png'
  import protocolLabs from '@/assets/images/partner-logos/protocol-labs.png'
  import vexed from '@/assets/images/partner-logos/vexed.png'
  import zokyo from '@/assets/images/partner-logos/zokyo.svg'
  import oma3 from '@/assets/images/partner-logos/oma3.svg'
  import cord from '@/assets/images/partner-logos/cord.png'

  const companies = [
    { name: 'Protocol Labs', image: protocolLabs },
    { name: 'NEAR', image: near },
    { name: 'BGA', image: bga },
    { name: 'Caduceus', image: caduceus },

    { name: 'Outlier Ventures', image: outlierVentures },
    { name: 'Fewfar', image: fewfar },
    { name: 'OP Games', image: opGames },
    { name: 'OMA3', image: oma3 },

    { name: 'Vexed', image: vexed },
    { name: 'Momint', image: momint },
    { name: 'Lemonade', image: lemonade },
    { name: 'Idexo', image: idexo },

    { name: 'Block 8', image: block8 },
    { name: 'Zokyo', image: zokyo },
    { name: '0xCord', image: cord },
  ]
</script>

<template>
  <div class="grid grid-cols-6 gap-4 w-full px-2 py-8 lg:px-24 lg:py-24 bg-black text-white">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 mb-16 lg:mb-32">
      <h2 class="text-5xl lg:text-6xl font-medium text-center font-space-ranger" data-aos="fade-down">
        Friends And investors
      </h2>
    </div>

    <div class="col-span-6 grid grid-cols-4 gap-12">
      <Logo
        v-for="(company, i) in companies"
        :key="company.name"
        :image="company.image"
        :name="company.name"
        data-aos="fade-up"
        :data-aos-delay="100 * i"
      />
    </div>
  </div>
</template>

<style scoped></style>

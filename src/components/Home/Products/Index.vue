<script setup>
  import Product from '@/components/Home/Products/Product.vue'

  import engineImg from '@/assets/images/products/engine.png'
  import pluginsImg from '@/assets/images/products/plugins.png'
  import portalImg from '@/assets/images/products/portal.png'
  import virtualImg from '@/assets/images/products/virtual.png'

  const products = [
    {
      id: 1,
      title: 'Aggregation Portal',
      description:
        "Our aggregation portal helps you find all of the speedup tools, infrastructure, and service providers you want, no matter which stage you are at with creating your game or gamified experience. Provide us information via our easy to use wizard tool about what you are creating, after which we'll recommend providers from our ecosystem based upon your bespoke use case.",
      image: portalImg,
    },
    {
      id: 2,
      title: 'Aggregation Plug-ins',
      description:
        'For those creators looking to build in specific web3 ecosystems or go ecosystem-agnostic, we are creating integration layers that make it simple to integrate ecosystem specific or suitable interoperable agnostic providers via low-code solutions, significantly reducing research and integration time. We bundle APIs, SDKs and other tooling into plug-ins for Unity, with Unreal Engine and other game engines coming soon.',
      image: pluginsImg,
    },
    {
      id: 3,
      title: 'Virtual World',
      description:
        'Creators can launch their titles via a permanent piece of digital real estate in our virtual world, Lumira. Lumira is a high fidelity circuit-city themed virtual world, with its own gamified story line. Join our community channels to be first to know when Lumira goes live.',
      image: virtualImg,
    },
    {
      id: 4,
      title: 'Interoperability Engine',
      description:
        'There are multiple layers to provide for when building for interoperability. We decided to build a tool that enables interoperability at the “game play” level, enabling the connection of virtual worlds, games and environments, no matter what game engine they have been built in. Join our community channels to be first to know when we release updates.',
      image: engineImg,
    },
  ]
</script>

<template>
  <div class="grid grid-cols-6 gap-4 bg-black w-full px-2 py-8 lg:px-24 lg:py-24">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 text-white mb-16 lg:mb-32">
      <h2 class="text-5xl lg:text-6xl font-medium text-center font-space-ranger" data-aos="fade-right">Products</h2>
    </div>

    <div class="col-span-6 grid grid-cols-5 gap-4">
      <Product
        v-for="(product, i) in products"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :description="product.description"
        :image="product.image"
        :data-aos="`fade-${i % 2 === 0 ? 'right' : 'left'}`"
        :lg-col-span="i === 0 || i === products.length - 1 ? 'lg:col-span-3' : 'lg:col-span-2'"
      />
    </div>
  </div>
</template>

<style scoped></style>

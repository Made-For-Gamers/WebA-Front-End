<script setup>
  import Product from './Product.vue'

  const products = [
    {
      id: 1,
      title: 'Product Heading',
      description:
        'Product Description - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam a nihil ipsa? Itaque fuga et exercitationem rem sint pariatur nihil, dignissimos iusto iste quo voluptatibus laborum distinctio sed, ut, ipsam ipsum nobis nam earum.',
      image: 'https://www.volusion.com/blog/content/images/2021/07/Product-Photos.jpg',
    },
    {
      id: 2,
      title: 'Product Heading',
      description:
        'Product Description - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam a nihil ipsa? Itaque fuga et exercitationem rem sint pariatur nihil, dignissimos iusto iste quo voluptatibus laborum distinctio sed, ut, ipsam ipsum nobis nam earum.',
      image:
        'https://cdn.shopify.com/s/files/1/2303/2711/files/2_e822dae0-14df-4cb8-b145-ea4dc0966b34.jpg?v=1617059123',
    },
    {
      id: 3,
      title: 'Product Heading',
      description:
        'Product Description - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam a nihil ipsa? Itaque fuga et exercitationem rem sint pariatur nihil, dignissimos iusto iste quo voluptatibus laborum distinctio sed, ut, ipsam ipsum nobis nam earum.',
      image: 'https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1200&format=pjpg&exif=1&iptc=1',
    },
  ]
</script>

<template>
  <div class="grid grid-cols-6 gap-4 bg-black w-full px-2 py-8 lg:px-24 lg:py-24">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 text-white mb-16 lg:mb-32">
      <h2 class="text-6xl lg:text-6xl font-medium">Products</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h4>
    </div>

    <Product
      v-for="product in products"
      :key="product.id"
      :title="product.title"
      :description="product.description"
      :image="product.image"
    />
  </div>
</template>

<style scoped></style>

<script setup>
  import Article from '@/components/Home/News/Article.vue'

  const articles = [
    {
      id: 1,
      title: 'Article Heading',
      description: 'Article Summary - Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      image: 'https://www.shutterstock.com/image-vector/breaking-news-background-world-global-260nw-719766118.jpg',
    },
    {
      id: 2,
      title: 'Article Heading',
      description: 'Article Summary - Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      image:
        'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg',
    },
    {
      id: 3,
      title: 'Article Heading',
      description: 'Article Summary - Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      image: 'https://imgeng.jagran.com/images//2022/aug/breaking-news-21661047276000.jpg',
    },
  ]
</script>

<template>
  <div class="grid grid-cols-6 gap-4 w-full px-2 py-8 lg:px-24 lg:py-24 bg-black">
    <div class="col-span-6 lg:col-span-4 lg:col-start-2 mb-16 lg:mb-32 text-white">
      <h2 class="text-6xl lg:text-6xl font-medium text-center font-space-ranger">News</h2>
      <h4 class="text-2xl mt-6 lg:text-3xl lg:mt-8 text-center font-audiowide">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </h4>
    </div>

    <Article
      v-for="article in articles"
      :key="article.id"
      :id="article.id"
      :title="article.title"
      :description="article.description"
      :image="article.image"
    />

    <a href="#" @click.prevent="() => false" class="text-xl text-white mt-8 lg:mt-16 w-max">View All</a>
  </div>
</template>

<style scoped></style>

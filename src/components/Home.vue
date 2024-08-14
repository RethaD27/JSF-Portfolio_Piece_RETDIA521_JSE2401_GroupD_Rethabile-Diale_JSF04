<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Discounted Products Carousel -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Discounted Products</h2>
      <div class="relative">
        <div class="carousel-container overflow-hidden">
          <div class="carousel-track flex transition-transform duration-300 ease-in-out">
            <div v-for="product in discountedProducts" :key="product.id" class="carousel-item flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
              <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <router-link :to="`/product/${product.id}`" class="block">
                  <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover" />
                  <div class="p-4">
                    <h3 class="text-lg font-bold truncate">{{ product.title }}</h3>
                    <p class="text-red-600 font-bold">{{ product.discountPercentage }}% OFF</p>
                    <p class="text-gray-800 font-bold">${{ product.discountedPrice.toFixed(2) }}</p>
                    <p class="text-gray-500 line-through">${{ product.price.toFixed(2) }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <button @click="prevSlide" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 ml-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextSlide" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mr-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Rest of the Home component content -->
    <!-- ... -->
  </div>
</template>

<script>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import AddToCartButton from './components/AddToCartButton.vue'

export default {
  name: 'Home',
  components: {
    AddToCartButton
  },
  setup() {
    const { filteredProducts, discountedProducts } = inject('useApp')
    const { wishlist, addToWishlist } = inject('useWishlist')

    const currentSlide = ref(0)
    const slideCount = ref(0)
    const carouselTrack = ref(null)

    const updateSlideCount = () => {
      const containerWidth = carouselTrack.value?.offsetWidth || 0
      const itemWidth = containerWidth / getVisibleSlides()
      slideCount.value = Math.ceil(discountedProducts.value.length * itemWidth / containerWidth)
    }

    const getVisibleSlides = () => {
      if (window.innerWidth >= 1280) return 5 // xl
      if (window.innerWidth >= 1024) return 4 // lg
      if (window.innerWidth >= 768) return 3 // md
      if (window.innerWidth >= 640) return 2 // sm
      return 1 // default
    }

    const updateCarousel = () => {
      if (carouselTrack.value) {
        const slideWidth = 100 / getVisibleSlides()
        carouselTrack.value.style.transform = `translateX(-${currentSlide.value * slideWidth}%)`
      }
    }

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slideCount.value
      updateCarousel()
    }

    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + slideCount.value) % slideCount.value
      updateCarousel()
    }

    const handleResize = () => {
      updateSlideCount()
      updateCarousel()
    }

    onMounted(() => {
      carouselTrack.value = document.querySelector('.carousel-track')
      updateSlideCount()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      filteredProducts,
      discountedProducts,
      wishlist,
      addToWishlist,
      nextSlide,
      prevSlide,
      carouselTrack
    }
  }
}
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-track {
  display: flex;
  transition: transform 0.3s ease-in-out;
}

.carousel-item {
  flex-shrink: 0;
}
</style>
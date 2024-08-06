<template>
  <div class="container mx-auto p-6 relative">
    <button @click="goBack" class="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 transition duration-200">
      Go Back
    </button>
    
    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="text-center py-8 bg-white p-4 rounded shadow-md">
        <svg class="w-16 h-16 mx-auto animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"></path>
        </svg>
        <p class="mt-4">Loading...</p>
      </div>
    </div>
    
    <div v-else-if="product" class="bg-white p-6 rounded shadow-lg mt-16">
      <div class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-64 h-64 object-contain mb-4 rounded" />
      </div>
      <h3 class="text-2xl font-bold mb-2">{{ product.title }}</h3>
      <p class="text-gray-700 mb-2">${{ product.price.toFixed(2) }}</p>
      <p class="text-gray-500 mb-2">{{ product.category }}</p>
      <div class="flex items-center mb-2">
        <div class="flex">
          <svg v-for="n in 5" :key="n" class="w-5 h-5" :class="{'text-yellow-400': n <= Math.round(product.rating.rate), 'text-gray-300': n > Math.round(product.rating.rate)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
      </div>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
      <div class="flex justify-evenly items-center mt-5">
        <button @click="toggleFavorite(product.id)" class="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" :class="{ 'text-red-500': isFavorite(product.id), 'text-gray-300': !isFavorite(product.id) }" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200">
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * @module ProductDetail
 * @description Component to display detailed information about a specific product.
 */
export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    /**
     * @description The product details.
     * @type {import('vue').Ref<Object|null>}
     */
    const product = ref(null)
    
    /**
     * @description Loading state of the component.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(true)
    
    /**
     * @description List of favorite product IDs.
     * @type {import('vue').Ref<number[]>}
     */
    const favorites = ref([])

    onMounted(async () => {
      loading.value = true
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${route.params.id}`)
        const data = await response.json()
        product.value = data
      } catch (error) {
        console.error('Error fetching product details:', error)
      } finally {
        loading.value = false
      }

      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites)
      }
    })

    /**
     * @function goBack
     * @description Navigates back to the previous page.
     */
    function goBack() {
      router.go(-1)
    }

    /**
     * @function toggleFavorite
     * @description Toggles the favorite status of a product.
     * @param {number} productId - The ID of the product to toggle.
     */
    function toggleFavorite(productId) {
      const index = favorites.value.indexOf(productId)
      if (index > -1) {
        favorites.value.splice(index, 1)
      } else {
        favorites.value.push(productId)
      }
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    /**
     * @function isFavorite
     * @description Checks if a product is in the favorites list.
     * @param {number} productId - The ID of the product to check.
     * @returns {boolean} - Whether the product is a favorite.
     */
    function isFavorite(productId) {
      return favorites.value.includes(productId)
    }

    return {
      product,
      loading,
      goBack,
      toggleFavorite,
      isFavorite
    }
  }
}
</script>

<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20">
    <div v-for="product in filteredProducts" :key="product.id" class="card-container bg-white shadow-md rounded-lg overflow-hidden border p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <router-link :to="`/product/${product.id}`" class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain mb-5 rounded" />
      </router-link>
      <div class="card-content p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-bold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700 mb-2">${{ product.price.toFixed(2) }}</p>
        <p class="text-gray-500">{{ product.category }}</p>
        <div class="flex items-center mb-4">
          <div class="flex">
            <svg v-for="n in 5" :key="n" class="w-5 h-5" :class="{'text-yellow-400': n <= Math.round(product.rating.rate), 'text-gray-300': n > Math.round(product.rating.rate)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
        </div>
        <div class="mt-auto flex justify-evenly items-center">
          <button @click.prevent="toggleFavorite(product.id)" class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="w-6 h-6"
              :class="{
                'text-gray-300': !isFavorite(product.id),
                'text-red-500': isFavorite(product.id)
              }"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Loading from './Loading.vue'

export default {
  name: 'ProductGrid',
  components: {
    Loading
  },
  props: {
    /**
     * @property {Array} filteredProducts - The list of filtered products to display.
     */
    filteredProducts: {
      type: Array,
      required: true
    },
    /**
     * @property {Boolean} loading - Indicates whether the product data is still loading.
     */
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    /**
     * @description List of favorite product IDs.
     * @type {import('vue').Ref<number[]>}
     */
    const favorites = ref([])

    onMounted(() => {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites)
      }
    })

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
      toggleFavorite,
      isFavorite
    }
  }
}
</script>

<style scoped>
.card-container {
  transition: transform 0.3s ease-in-out;
}

.card-container:hover {
  transform: translateY(-5px);
}
</style>

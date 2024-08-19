<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Featured Products Grid -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Featured Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div class="h-48 overflow-hidden">
            <router-link :to="`/product/${product.id}`">
              <img :src="product.image" :alt="product.title" class="w-full h-full object-cover" />
            </router-link>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold mb-2">
              <router-link :to="`/product/${product.id}`">{{ product.title }}</router-link>
            </h3>
            <p class="text-gray-600 mb-2 truncate">{{ product.description }}</p>
            <p class="text-gray-800 font-bold">{{ "$" + product.price.toFixed(2) }}</p>
            <div class="flex flex-wrap justify-between mt-4">
              <AddToCartButton :product="product" class="mb-2 w-full sm:w-auto" />
              <WishlistButton :product="product" class="mb-2 w-full sm:w-auto" />
              <ComparisonButton :product="product" class="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import AddToCartButton from './AddToCartButton.vue'
import WishlistButton from './WishlistButton.vue'
import ComparisonButton from './ComparisonButton.vue'

export default {
  name: 'Home',
  
  components: {
    AddToCartButton,
    WishlistButton,
    ComparisonButton
  },

  /**
   * Setup function for the Home component.
   * This function provides the necessary data and methods for displaying featured products on the home page.
   *
   * @returns {Object} The reactive variables and methods available in the template.
   */
  setup() {
    /**
     * List of filtered products to be displayed on the home page.
     * @type {Array<Object>}
     */
    const { filteredProducts } = inject('useApp')

    /**
     * Boolean indicating whether the user is logged in.
     * @type {boolean}
     */
    const isLoggedIn = inject('isLoggedIn')

    return {
      filteredProducts,
      isLoggedIn
    }
  }
}
</script>

<template>
  <div class="container mx-auto py-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Featured Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="product in filteredProducts" :key="product.id" class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="h-48 overflow-hidden">
            <router-link :to="`/product/${product.id}`">
              <img :src="product.image" :alt="product.title" class="w-full h-full object-cover" />
            </router-link>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold mb-2">
              <router-link :to="`/product/${product.id}`">
                {{ product.title }}
              </router-link>
            </h3>
            <p class="text-gray-600 mb-2">{{ product.description }}</p>
            <p class="text-gray-800 font-bold">{{ "$" + product.price.toFixed(2) }}</p>
            <div class="flex justify-between mt-4">
              <AddToCartButton :product="product" />
              <button
                @click="addToWishlist(product)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 transition duration-200"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>
      <div v-if="wishlist.length === 0" class="text-gray-500">
        Your wishlist is empty.
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="product in wishlist" :key="product.id" class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="h-48 overflow-hidden">
            <router-link :to="`/product/${product.id}`">
              <img :src="product.image" :alt="product.title" class="w-full h-full object-cover" />
            </router-link>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold mb-2">
              <router-link :to="`/product/${product.id}`">
                {{ product.title }}
              </router-link>
            </h3>
            <p class="text-gray-600 mb-2">{{ product.description }}</p>
            <p class="text-gray-800 font-bold">{{ "$" + product.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import AddToCartButton from './components/AddToCartButton.vue'

export default {
  name: 'Home',
  components: {
    AddToCartButton
  },
  setup() {
    const { filteredProducts } = inject('useApp')
    const { wishlist, addToWishlist } = inject('useWishlist')

    return {
      filteredProducts,
      wishlist,
      addToWishlist
    }
  }
}
</script>
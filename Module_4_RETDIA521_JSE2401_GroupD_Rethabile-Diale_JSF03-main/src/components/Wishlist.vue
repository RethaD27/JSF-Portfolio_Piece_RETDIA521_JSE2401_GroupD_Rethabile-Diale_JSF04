<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>

    <div v-if="wishlist.length === 0" class="text-gray-500">
      Your wishlist is empty.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in wishlist" :key="product.id" class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="h-48 overflow-hidden">
          <img :src="product.image" :alt="product.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <h3 class="text-xl font-bold mb-2">{{ product.title }}</h3>
          <p class="text-gray-600 mb-2">{{ product.description }}</p>
          <p class="text-gray-800 font-bold">{{ "$" + product.price.toFixed(2) }}</p>
          <div class="flex justify-between mt-4">
            <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              @click="removeFromWishlist(product.id)"
            >
              Remove
            </button>
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue';

export default {
  name: 'Wishlist',
  setup() {
    const { useCart } = inject('useCart');
    const { useWishlist } = inject('useWishlist');

    const { addToCart } = useCart();
    const { wishlist, removeFromWishlist } = useWishlist();

    return {
      wishlist,
      removeFromWishlist,
      addToCart,
    };
  },
};
</script>
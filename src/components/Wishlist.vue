<template>
  <div class="container mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4">Your Wishlist</h2>

    <div v-if="filteredWishlist.length === 0" class="text-gray-500">
      Your wishlist is empty.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="product in filteredWishlist" :key="product.id" class="bg-white shadow-md rounded-lg overflow-hidden">
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

    <div class="mt-4 flex justify-end">
      <button
        @click="clearWishlist"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear Wishlist
      </button>
    </div>

    <div class="mt-4">
      <label class="mr-2">Sort by:</label>
      <select v-model="sortOrder" class="border p-2 rounded">
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>

      <label class="ml-4 mr-2">Filter by:</label>
      <input type="text" v-model="filterQuery" placeholder="Search products..." class="border p-2 rounded" />
    </div>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue';

export default {
  name: 'Wishlist',
  setup() {
    const { useCart } = inject('useCart');
    const { wishlist, addToWishlist, removeFromWishlist, clearWishlist } = inject('useWishlist');
    const { addToCart } = useCart();

    const sortOrder = ref('');
    const filterQuery = ref('');

    const filteredWishlist = computed(() => {
      let filtered = [...wishlist.value];

      if (filterQuery.value) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(filterQuery.value.toLowerCase())
        );
      }

      if (sortOrder.value === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'name-asc') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOrder.value === 'name-desc') {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
      }

      return filtered;
    });

    return {
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      addToCart,
      sortOrder,
      filterQuery,
      filteredWishlist
    };
  }
};
</script>
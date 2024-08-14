<template>
  <div class="flex items-center">
    <router-link to="/wishlist" class="relative">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span v-if="wishlistCount > 0" class="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{{ wishlistCount }}</span>
    </router-link>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'WishlistWidget',
  setup() {
    const { wishlistCount } = inject('useWishlist')

    return {
      wishlistCount
    }
  }
}
</script>
// src/composables/useWishlist.js
import { ref } from 'vue';

export function useWishlist() {
  const wishlist = ref([]);

  const addToWishlist = (product) => {
    wishlist.value.push(product);
  };

  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };
}
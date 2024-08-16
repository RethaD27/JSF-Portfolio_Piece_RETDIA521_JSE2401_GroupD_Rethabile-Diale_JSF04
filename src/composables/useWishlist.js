import { ref, watch } from 'vue'
import { useCart } from './useCart' // Import your useCart composable

/**
 * Composable function to manage a wishlist.
 * Provides methods to add, remove, clear, and sync wishlist items with localStorage and an API.
 *
 * @returns {Object} Methods and properties related to the wishlist.
 */
export function useWishlist() {
  /**
   * Reactive array holding the wishlist items.
   * @type {import('vue').Ref<Object[]>}
   */
  const wishlist = ref([])

  // Get addToCart from useCart composable
  const { addToCart } = useCart()

  /**
   * Adds a product to the wishlist if it's not already present.
   *
   * @param {Object} product - The product to add to the wishlist.
   * @param {number} product.id - The unique identifier for the product.
   */
  const addToWishlist = (product) => {
    if (!wishlist.value.some(item => item.id === product.id)) {
      wishlist.value.push(product)
    }
  }

  /**
   * Removes a product from the wishlist by its ID.
   *
   * @param {number} productId - The unique identifier of the product to remove.
   */
  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId)
  }

  /**
   * Clears all items from the wishlist.
   */
  const clearWishlist = () => {
    wishlist.value = []
  }

  /**
   * Loads the wishlist from localStorage.
   */
  const loadWishlistFromStorage = () => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      wishlist.value = JSON.parse(storedWishlist)
    }
  }

  /**
   * Saves the current wishlist to localStorage.
   */
  const saveWishlistToStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value))
  }

  /**
   * Synchronizes the wishlist with an external API.
   * Updates the wishlist with the latest data from the API.
   */
  const syncWishlistWithAPI = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const products = await response.json()
      const storedWishlist = wishlist.value.map(item => item.id)
      wishlist.value = products.filter(product => storedWishlist.includes(product.id))
    } catch (error) {
      console.error('Error syncing wishlist with API:', error)
    }
  }

  /**
   * Moves a product from the wishlist to the cart.
   *
   * @param {Object} product - The product to move to the cart.
   * @param {number} product.id - The unique identifier for the product.
   */
  const moveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  // Watch for changes in the wishlist and save to localStorage
  watch(wishlist, () => {
    saveWishlistToStorage()
  }, { deep: true })

  // Load wishlist from storage when the composable is first used
  loadWishlistFromStorage()

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    syncWishlistWithAPI,
    moveToCart // Expose the moveToCart function
  }
}

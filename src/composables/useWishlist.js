import { ref, watch } from 'vue'
import { useCart } from './useCart' // Import your useCart composable

export function useWishlist() {
  const wishlist = ref([])

  const { addToCart } = useCart() // Get addToCart from useCart

  const addToWishlist = (product) => {
    if (!wishlist.value.some(item => item.id === product.id)) {
      wishlist.value.push(product)
    }
  }

  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId)
  }

  const clearWishlist = () => {
    wishlist.value = []
  }

  const loadWishlistFromStorage = () => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      wishlist.value = JSON.parse(storedWishlist)
    }
  }

  const saveWishlistToStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value))
  }

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

  const moveToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

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

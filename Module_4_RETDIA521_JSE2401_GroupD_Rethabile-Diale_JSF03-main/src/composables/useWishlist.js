import { ref, watch } from 'vue'

export function useWishlist() {
  const wishlist = ref([])

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
    syncWishlistWithAPI
  }
}
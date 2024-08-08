import { ref } from 'vue'

export function useWishlist() {
  const wishlist = ref([])
  const totalWishlistItems = ref(0)

  const addToWishlist = (product) => {
    wishlist.value.push(product)
    saveWishlistToStorage()
    updateTotalWishlistItems()
  }

  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter((item) => item.id !== productId)
    saveWishlistToStorage()
    updateTotalWishlistItems()
  }

  const clearWishlist = () => {
    wishlist.value = []
    saveWishlistToStorage()
    updateTotalWishlistItems()
  }

  const loadWishlistFromStorage = () => {
    const storedWishlist = localStorage.getItem('wishlist')
    if (storedWishlist) {
      wishlist.value = JSON.parse(storedWishlist)
    }
    updateTotalWishlistItems()
  }

  const saveWishlistToStorage = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value))
  }

  const updateTotalWishlistItems = () => {
    totalWishlistItems.value = wishlist.value.length
  }

  const syncWishlistWithAPI = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const products = await response.json()
      const storedWishlist = wishlist.value.map(item => item.id)
      wishlist.value = products.filter(product => storedWishlist.includes(product.id))
      saveWishlistToStorage()
      updateTotalWishlistItems()
    } catch (error) {
      console.error('Error syncing wishlist with API:', error)
    }
  }

  return {
    wishlist,
    totalWishlistItems,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    loadWishlistFromStorage,
    syncWishlistWithAPI
  }
}
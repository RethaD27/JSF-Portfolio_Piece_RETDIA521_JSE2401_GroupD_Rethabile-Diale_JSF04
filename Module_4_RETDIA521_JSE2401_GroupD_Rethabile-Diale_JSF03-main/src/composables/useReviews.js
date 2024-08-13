import { ref, watch } from 'vue'

export function useReviews() {
  const reviews = ref({})

  const loadReviews = () => {
    const storedReviews = localStorage.getItem('allReviews')
    if (storedReviews) {
      reviews.value = JSON.parse(storedReviews)
    }
  }

  const saveReviews = () => {
    localStorage.setItem('allReviews', JSON.stringify(reviews.value))
  }

  const addReview = (productId, review) => {
    if (!reviews.value[productId]) {
      reviews.value[productId] = []
    }
    const newReview = {
      id: Date.now(),
      productId,
      ...review,
      timestamp: new Date().toISOString()
    }
    reviews.value[productId].push(newReview)
  }

  const editReview = (productId, reviewId, updatedReview) => {
    const index = reviews.value[productId].findIndex(r => r.id === reviewId)
    if (index !== -1) {
      reviews.value[productId][index] = {
        ...reviews.value[productId][index],
        ...updatedReview,
        timestamp: new Date().toISOString()
      }
    }
  }

  const deleteReview = (productId, reviewId) => {
    if (reviews.value[productId]) {
      reviews.value[productId] = reviews.value[productId].filter(r => r.id !== reviewId)
    }
  }

  const getReviewsForProduct = (productId) => {
    return reviews.value[productId] || []
  }

  const syncReviewsWithAPI = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const products = await response.json()

      products.forEach(product => {
        if (!reviews.value[product.id]) {
          reviews.value[product.id] = []
        }
      })
    } catch (error) {
      console.error('Error syncing reviews:', error)
      // Optional: Notify user of the error or retry
    }
  }

  // Watch for changes in the reviews object and save to localStorage
  watch(reviews, saveReviews, { deep: true })

  // Load reviews from localStorage when the composable is first used
  loadReviews()

  // Sync with API to ensure we have entries for all products
  syncReviewsWithAPI()

  return {
    reviews,
    addReview,
    editReview,
    deleteReview,
    getReviewsForProduct,
    syncReviewsWithAPI
  }
}

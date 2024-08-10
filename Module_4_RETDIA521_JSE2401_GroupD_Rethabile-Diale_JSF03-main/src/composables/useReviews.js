import { ref, onMounted } from 'vue'

export function useReviews() {
  const reviews = ref([])

  const syncReviewsWithAPI = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/reviews') // Assuming there's a reviews endpoint
      const apiReviews = await response.json()

      // Merge local reviews with API reviews
      const localReviews = JSON.parse(localStorage.getItem('allReviews')) || {}
      const mergedReviews = { ...localReviews }

      apiReviews.forEach(review => {
        if (!mergedReviews[review.productId]) {
          mergedReviews[review.productId] = []
        }
        const existingReviewIndex = mergedReviews[review.productId].findIndex(r => r.id === review.id)
        if (existingReviewIndex === -1) {
          mergedReviews[review.productId].push(review)
        } else {
          mergedReviews[review.productId][existingReviewIndex] = review
        }
      })

      localStorage.setItem('allReviews', JSON.stringify(mergedReviews))
      reviews.value = mergedReviews
    } catch (error) {
      console.error('Error syncing reviews:', error)
    }
  }

  onMounted(() => {
    syncReviewsWithAPI()
  })

  return {
    reviews,
    syncReviewsWithAPI
  }
}
import { ref, watch } from 'vue'

/**
 * Composable function to manage product reviews.
 * @returns {Object} Methods and properties to interact with the reviews system.
 */
export function useReviews() {
  /**
   * Reactive reference to store reviews.
   * @type {Object}
   */
  const reviews = ref({})

  /**
   * Loads reviews from localStorage into the reactive `reviews` object.
   */
  const loadReviews = () => {
    const storedReviews = localStorage.getItem('allReviews')
    if (storedReviews) {
      reviews.value = JSON.parse(storedReviews)
    }
  }

  /**
   * Saves the current state of `reviews` to localStorage.
   */
  const saveReviews = () => {
    localStorage.setItem('allReviews', JSON.stringify(reviews.value))
  }

  /**
   * Adds a new review for a specific product.
   * @param {number} productId - The ID of the product to add the review to.
   * @param {Object} review - The review object containing review details.
   * @param {string} review.text - The text of the review.
   * @param {number} review.rating - The rating of the review.
   */
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

  /**
   * Edits an existing review for a specific product.
   * @param {number} productId - The ID of the product whose review is to be edited.
   * @param {number} reviewId - The ID of the review to edit.
   * @param {Object} updatedReview - The updated review object.
   * @param {string} [updatedReview.text] - The updated text of the review.
   * @param {number} [updatedReview.rating] - The updated rating of the review.
   */
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

  /**
   * Deletes a review for a specific product.
   * @param {number} productId - The ID of the product whose review is to be deleted.
   * @param {number} reviewId - The ID of the review to delete.
   */
  const deleteReview = (productId, reviewId) => {
    if (reviews.value[productId]) {
      reviews.value[productId] = reviews.value[productId].filter(r => r.id !== reviewId)
    }
  }

  /**
   * Gets all reviews for a specific product.
   * @param {number} productId - The ID of the product to get reviews for.
   * @returns {Array} An array of reviews for the specified product.
   */
  const getReviewsForProduct = (productId) => {
    return reviews.value[productId] || []
  }

  /**
   * Syncs the `reviews` object with an external API to ensure all products have review entries.
   * @async
   */
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

<template>
  <div class="container mx-auto p-6 relative">
    <button @click="goBack" class="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 transition duration-200">
      Go Back
    </button>

    <div v-if="loading" class="flex items-center justify-center h-screen">
      <div class="text-center py-8 bg-white p-4 rounded shadow-md">
        <svg class="w-16 h-16 mx-auto animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"></path>
        </svg>
        <p class="mt-4">Loading...</p>
      </div>
    </div>

    <div v-else-if="product" class="bg-white p-6 rounded shadow-lg mt-16">
      <div class="flex justify-center items-center">
        <img :src="product.image" :alt="product.title" class="w-64 h-64 object-contain mb-4 rounded" />
      </div>
      <h3 class="text-2xl font-bold mb-2">{{ product.title }}</h3>
      <p class="text-gray-700 font-bold mb-2">${{ product.price.toFixed(2) }}</p>
      <p class="text-gray-500 mb-2">{{ product.category }}</p>
      <div class="flex items-center mb-2">
        <div class="flex">
          <svg v-for="n in 5" :key="n" class="w-5 h-5" :class="{'text-yellow-400': n <= Math.round(product.rating.rate), 'text-gray-300': n > Math.round(product.rating.rate)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
      </div>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>

      <div v-if="product.discountPercentage" class="mt-4">
        <p class="text-red-600 font-bold">{{ product.discountPercentage }}% OFF</p>
        <p class="text-gray-800 font-bold">${{ product.discountedPrice.toFixed(2) }}</p>
        <p class="text-gray-500 line-through">${{ product.price.toFixed(2) }}</p>
        <p class="text-gray-600">Sale ends on: {{ formatDate(product.saleEndDate) }}</p>
      </div>

      <div class="flex justify-between items-center mt-5">
        <button @click="toggleFavorite(product.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" :class="{ 'text-red-500': isFavorite(product.id), 'text-gray-300': !isFavorite(product.id) }" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <AddToCartButton :product="product" />
        <button
          @click="addToWishlist(product)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 transition duration-200"
        >
          Add to Wishlist
        </button>
        <ComparisonButton :product="product" />
      </div>

      <!-- Rating and Review Section -->
      <div v-if="isLoggedIn" class="mt-8">
        <h3 class="text-xl font-bold mb-4">Leave a Review</h3>
        <div class="flex items-center mb-4">
          <span class="mr-2">Rating:</span>
          <div class="flex">
            <button v-for="star in 5" :key="star" @click="setRating(star)" class="text-2xl focus:outline-none">
              {{ star <= rating ? '★' : '☆' }}
            </button>
          </div>
        </div>
        <textarea v-model="reviewText" class="w-full p-2 border rounded" rows="4" placeholder="Write your review here..."></textarea>
        <button @click="submitReview" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
      </div>

      <!-- Display Reviews -->
      <div class="mt-8">
        <h3 class="text-xl font-bold mb-4">Reviews</h3>
        <div class="mb-4">
          <label class="mr-2">Sort by:</label>
          <select v-model="sortBy" class="border p-1 rounded">
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div v-for="review in sortedReviews" :key="review.id" class="mb-4 p-4 border rounded">
          <div class="flex justify-between items-center mb-2">
            <div>
              <span class="font-bold">{{ review.userName }}</span>
              <span class="ml-2 text-gray-500">{{ formatDate(review.timestamp) }}</span>
            </div>
            <div>
              {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
            </div>
          </div>
          <p>{{ review.text }}</p>
          <div v-if="isLoggedIn && review.userId === currentUserId" class="mt-2">
            <button @click="updateReview(review)" class="text-blue-500 mr-2">Edit</button>
            <button @click="removeReview(review.id)" class="text-red-500">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification component -->
    <div v-if="notification" class="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg">
      {{ notification }}
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddToCartButton from './AddToCartButton.vue'
import ComparisonButton from './ComparisonButton.vue'
import { useReviews } from '../composables/useReviews.js'

export default {
  name: 'ProductDetail',
  components: {
    AddToCartButton,
    ComparisonButton
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const product = ref(null)
    const loading = ref(true)
    const favorites = ref([])
    const isLoggedIn = inject('isLoggedIn')
    const currentUserId = ref(localStorage.getItem('userId'))
    const rating = ref(0)
    const reviewText = ref('')
    const sortBy = ref('date')
    const notification = ref('')

    // Using the useReviews composable
    const { reviews, addReview, editReview, deleteReview, getReviewsForProduct } = useReviews()

    const productId = computed(() => route.params.id)

    const goBack = () => {
      router.back()
    }

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const setRating = (value) => {
      rating.value = value
    }

    const submitReview = () => {
      const newReview = {
        id: Date.now(),
        userName: 'User', // Replace with actual user name if available
        userId: currentUserId.value,
        rating: rating.value,
        text: reviewText.value,
        timestamp: new Date().toISOString(),
      }
      addReview(productId.value, newReview)
      reviewText.value = ''
      rating.value = 0
      notification.value = 'Review submitted successfully!'
      setTimeout(() => {
        notification.value = ''
      }, 3000)
    }

    const updateReview = (review) => {
      const updatedReview = {
        ...review,
        rating: rating.value,
        text: reviewText.value,
      }
      editReview(productId.value, review.id, updatedReview)
      notification.value = 'Review updated successfully!'
      setTimeout(() => {
        notification.value = ''
      }, 3000)
    }

    const removeReview = (reviewId) => {
      deleteReview(productId.value, reviewId)
      notification.value = 'Review deleted successfully!'
      setTimeout(() => {
        notification.value = ''
      }, 3000)
    }

    const sortedReviews = computed(() => {
      const productReviews = getReviewsForProduct(productId.value)
      return [...productReviews].sort((a, b) => {
        if (sortBy.value === 'date') {
          return new Date(b.timestamp) - new Date(a.timestamp)
        } else if (sortBy.value === 'rating') {
          return b.rating - a.rating
        }
      })
    })

    const fetchProduct = async () => {
      loading.value = true
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`)
        const data = await response.json()
        product.value = data
        product.value.discountedPrice = data.price * (1 - data.discountPercentage / 100)
        product.value.saleEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        loading.value = false
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    const isFavorite = (id) => {
      return favorites.value.includes(id)
    }

    const toggleFavorite = (id) => {
      if (isFavorite(id)) {
        favorites.value = favorites.value.filter(favId => favId !== id)
      } else {
        favorites.value.push(id)
      }
    }

    const addToWishlist = (product) => {
      // Add product to wishlist logic
      notification.value = 'Added to wishlist!'
      setTimeout(() => {
        notification.value = ''
      }, 3000)
    }

    onMounted(() => {
      fetchProduct()
    })

    return {
      product,
      loading,
      goBack,
      formatDate,
      setRating,
      rating,
      reviewText,
      submitReview,
      updateReview,
      reviews,
      sortBy,
      sortedReviews,
      removeReview,
      isFavorite,
      toggleFavorite,
      addToWishlist,
      isLoggedIn,
      notification
    }
  }
}
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>

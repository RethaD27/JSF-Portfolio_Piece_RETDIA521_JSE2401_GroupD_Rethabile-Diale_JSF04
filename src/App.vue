<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <ThemeToggle />
    <Navbar :totalItems="totalItems" :wishlistCount="wishlistCount" />
    <div class="container mx-auto p-6">
      <WishlistWidget />

      <div class="mt-20 flex justify-between items-center flex-wrap mb-4">
        <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <div class="flex items-center mb-2 sm:mb-0">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="border p-2 rounded-l"
          />
          <button
            @click="searchProducts"
            class="bg-gray-500 text-white border border-l-0 p-2 rounded-r"
          >
            Search
          </button>
        </div>

        <select v-model="sortOrder" class="border p-2 rounded">
          <option value="">Sort by Price</option>
          <option value="default">Default</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>

        <button
          @click="resetFiltersAndSort"
          class="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
        >
          Reset
        </button>
      </div>

      <router-view 
        :filteredProducts="filteredProducts" 
        :loading="loading"
        :selectedCategory="selectedCategory"
        :sortOrder="sortOrder"
        :searchQuery="searchQuery"
      />
    </div>
  </div>
</template>

<script>
/**
 * @fileoverview Main App component for the e-commerce application.
 * @component
 */

import { ref, computed, onMounted, provide, watch } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import WishlistWidget from './components/WishlistWidget.vue'
import { useCart } from './composables/useCart'
import { useWishlist } from './composables/useWishlist'
import { useReviews } from './composables/useReviews'
import { useAuth } from './composables/useAuth'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} category
 * @property {string} description
 * @property {string} image
 */

/**
 * @vue-component
 * @name App
 * @description Main application component that handles product filtering, sorting, and overall app state.
 */
export default {
  name: 'App',
  components: {
    Navbar,
    ThemeToggle,
    WishlistWidget
  },
  setup() {
    const { loadCart, totalItems } = useCart()
    const { wishlist, wishlistCount } = useWishlist()
    const { reviews, syncReviewsWithAPI, addReview, editReview, deleteReview, getReviewsForProduct } = useReviews()
    const { isAuthenticated, checkAuth, logout } = useAuth()

    /**
     * @type {import('vue').Ref<Array<Product>>}
     * @description Ref containing the list of products.
     */
    const products = ref([])

    /**
     * @type {import('vue').Ref<Array<string>>}
     * @description Ref containing the list of product categories.
     */
    const categories = ref([])

    /**
     * @type {import('vue').Ref<string>}
     * @description Ref containing the current search query.
     */
    const searchQuery = ref('')

    /**
     * @type {import('vue').Ref<string>}
     * @description Ref containing the currently selected category.
     */
    const selectedCategory = ref('')

    /**
     * @type {import('vue').Ref<string>}
     * @description Ref containing the current sort order.
     */
    const sortOrder = ref('')

    /**
     * @type {import('vue').Ref<boolean>}
     * @description Ref indicating whether the app is in a loading state.
     */
    const loading = ref(true)

    /**
     * @type {import('vue').Ref<boolean>}
     * @description Ref indicating whether the user is logged in.
     */
    const isLoggedIn = ref(false)

    /**
     * @type {import('vue').Ref<boolean>}
     * @description Ref indicating whether dark mode is active.
     */
    const isDarkMode = ref(false)

    const router = useRouter()

    /**
     * @type {import('vue').Ref<Array<Product>>}
     * @description Ref containing the list of discounted products.
     */
    const discountedProducts = ref([])

    /**
     * @async
     * @function fetchProducts
     * @description Fetches products from the API and applies discounts.
     */
    const fetchProducts = async () => {
      loading.value = true
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        products.value = data
        applyDiscounts()
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        loading.value = false
      }
    }

    /**
     * @async
     * @function fetchCategories
     * @description Fetches product categories from the API.
     */
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        const data = await response.json()
        categories.value = data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    /**
     * @function applyDiscounts
     * @description Applies random discounts to a subset of products.
     */
    const applyDiscounts = () => {
      const shuffled = [...products.value].sort(() => 0.5 - Math.random())
      discountedProducts.value = shuffled.slice(0, 5).map(product => ({
        ...product,
        discountPercentage: Math.floor(Math.random() * 50) + 10,
        discountedPrice: product.price * (1 - (Math.floor(Math.random() * 50) + 10) / 100),
        saleEndDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
      }))
    }

    /**
     * @function searchProducts
     * @description Triggers product search based on the current search query.
     */
    const searchProducts = () => {
      // Vue's reactivity will handle the filtering
    }

    /**
     * @function resetFiltersAndSort
     * @description Resets all filters and sorting options.
     */
    const resetFiltersAndSort = () => {
      selectedCategory.value = ''
      sortOrder.value = ''
      searchQuery.value = ''
    }

    /**
     * @type {import('vue').ComputedRef<Array<Product>>}
     * @description Computed property that returns filtered and sorted products.
     */
    const filteredProducts = computed(() => {
      let prods = [...products.value]
      if (selectedCategory.value) {
        prods = prods.filter(product => product.category === selectedCategory.value)
      }
      if (sortOrder.value === 'asc') {
        prods.sort((a, b) => a.price - b.price)
      } else if (sortOrder.value === 'desc') {
        prods.sort((a, b) => b.price - a.price)
      } else if (sortOrder.value === 'default') {
        prods.sort((a, b) => a.id - b.id)
      }
      if (searchQuery.value) {
        prods = prods.filter(product => 
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }
      return prods
    })

    /**
     * @function checkLoginStatus
     * @description Checks and updates the user's login status.
     */
    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token')
      if (isLoggedIn.value) {
        loadCart()
      }
    }

    onMounted(() => {
      checkAuth()
      fetchProducts()
      fetchCategories()
      checkLoginStatus()
      const savedTheme = localStorage.getItem('theme')
      isDarkMode.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      syncReviewsWithAPI()
      const { syncWishlistWithAPI } = useWishlist()
      syncWishlistWithAPI()
    })

    watch(isAuthenticated, (newValue) => {
      if (newValue) {
        loadCart()
      }
    })

    router.beforeEach((to, from, next) => {
      if (to.path === '/comparison' && !isLoggedIn.value) {
        next('/login')
      } else {
        next()
      }
    })

    // Provide values to child components
    provide('isAuthenticated', isAuthenticated)
    provide('logout', logout)
    provide('isLoggedIn', isLoggedIn)
    provide('totalItems', totalItems)
    provide('isDarkMode', isDarkMode)
    provide('useWishlist', useWishlist)
    provide('useCart', useCart())
    provide('useReviews', { reviews, syncReviewsWithAPI })
    provide('useApp', {
      filteredProducts: computed(() => filteredProducts.value),
      discountedProducts: computed(() => discountedProducts.value)
    })

    return {
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      filteredProducts,
      searchProducts,
      resetFiltersAndSort,
      isLoggedIn,
      checkLoginStatus,
      totalItems,
      isDarkMode,
      wishlistCount,
      discountedProducts
    }
  }
}
</script>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #4a5568;
  --secondary-color: #718096;
}

.dark-mode {
  --bg-color: #1a202c;
  --text-color: #e2e8f0;
  --primary-color: #a0aec0;
  --secondary-color: #cbd5e0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
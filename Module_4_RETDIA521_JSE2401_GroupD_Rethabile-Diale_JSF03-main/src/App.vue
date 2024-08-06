<template>
  <div>
    <Navbar />
    <div class="container mx-auto p-6">
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
import { ref, computed, onMounted, provide } from 'vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const products = ref([])
    const categories = ref([])
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortOrder = ref('')
    const loading = ref(true)
    const isLoggedIn = ref(false)

    const fetchProducts = async () => {
      loading.value = true
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        products.value = data
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        loading.value = false
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories')
        const data = await response.json()
        categories.value = data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    const searchProducts = () => {
      // Vue's reactivity will handle the filtering
    }

    const resetFiltersAndSort = () => {
      selectedCategory.value = ''
      sortOrder.value = ''
      searchQuery.value = ''
    }

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

    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token')
    }

    onMounted(() => {
      fetchProducts()
      fetchCategories()
      checkLoginStatus()
    })

    provide('isLoggedIn', isLoggedIn)

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
      checkLoginStatus
    }
  }
}
</script>
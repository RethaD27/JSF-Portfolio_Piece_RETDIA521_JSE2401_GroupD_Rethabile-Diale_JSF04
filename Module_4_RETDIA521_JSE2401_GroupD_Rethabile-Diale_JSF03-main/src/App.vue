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

        <!-- New Reset Button -->
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
import { ref, computed, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    /**
     * @description List of all products fetched from the API.
     * @type {import('vue').Ref<Object[]>}
     */
    const products = ref([])

    /**
     * @description List of product categories fetched from the API.
     * @type {import('vue').Ref<string[]>}
     */
    const categories = ref([])

    /**
     * @description Search query entered by the user.
     * @type {import('vue').Ref<string>}
     */
    const searchQuery = ref('')

    /**
     * @description Selected category for filtering products.
     * @type {import('vue').Ref<string>}
     */
    const selectedCategory = ref('')

    /**
     * @description Selected sort order for sorting products.
     * @type {import('vue').Ref<string>}
     */
    const sortOrder = ref('')

    /**
     * @description Indicates whether the product data is still loading.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(true)

    /**
     * @function fetchProducts
     * @description Fetches the list of products from the API.
     * @returns {Promise<void>}
     */
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

    /**
     * @function fetchCategories
     * @description Fetches the list of product categories from the API.
     * @returns {Promise<void>}
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
     * @function searchProducts
     * @description Initiates a product search based on the search query.
     */
    const searchProducts = () => {
      // This function is kept for consistency, but Vue's reactivity will handle the filtering
    }

    /**
     * @function resetFiltersAndSort
     * @description Resets the filters and sorting options to their default values.
     */
    const resetFiltersAndSort = () => {
      selectedCategory.value = ''
      sortOrder.value = ''
      searchQuery.value = ''
    }

    /**
     * @computed filteredProducts
     * @description Computes the filtered list of products based on the selected category, sort order, and search query.
     * @returns {Object[]} The filtered list of products.
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

    onMounted(() => {
      fetchProducts()
      fetchCategories()
    })

    return {
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      filteredProducts,
      searchProducts,
      resetFiltersAndSort
    }
  }
}
</script>

import { ref, computed } from 'vue'

/**
 * Manages a comparison list of products with a maximum limit.
 * 
 * @module useComparison
 * @returns {Object} Composable functions and state for managing the comparison list.
 */
export function useComparison() {
  const comparisonList = ref([])
  const MAX_COMPARISON_ITEMS = 4

  /**
   * Adds a product to the comparison list if it's not already included and the list isn't full.
   * 
   * @param {Object} product - The product object to add to the comparison list.
   * @param {number|string} product.id - The unique identifier for the product.
   */
  const addToComparison = (product) => {
    if (comparisonList.value.length < MAX_COMPARISON_ITEMS && !comparisonList.value.some(item => item.id === product.id)) {
      comparisonList.value.push(product)
    }
  }

  /**
   * Removes a product from the comparison list by its unique identifier.
   * 
   * @param {number|string} productId - The unique identifier for the product to be removed.
   */
  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(item => item.id !== productId)
  }

  /**
   * Clears all products from the comparison list.
   */
  const clearComparison = () => {
    comparisonList.value = []
  }

  /**
   * Checks if a product is in the comparison list by its unique identifier.
   * 
   * @param {number|string} productId - The unique identifier for the product to check.
   * @returns {boolean} - Returns `true` if the product is in the comparison list, otherwise `false`.
   */
  const isInComparison = (productId) => {
    return comparisonList.value.some(item => item.id === productId)
  }

  /**
   * The number of products currently in the comparison list.
   * 
   * @type {ComputedRef<number>}
   */
  const comparisonCount = computed(() => comparisonList.value.length)

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    comparisonCount,
    MAX_COMPARISON_ITEMS
  }
}

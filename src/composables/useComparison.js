/**
 * @typedef {Object} Product
 * @property {number|string} id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {string} [description] - A brief description of the product.
 * @property {number} price - The price of the product.
 * @property {string} imageUrl - The URL of the product's image.
 */

import { ref, computed } from 'vue'

const comparisonList = ref([])

/**
 * The maximum number of items allowed in the comparison list.
 * @type {number}
 * @constant
 */
const MAX_COMPARISON_ITEMS = 4

/**
 * Custom composable for managing a product comparison list.
 * @returns {Object} The comparison list, and methods to manipulate it.
 */
export function useComparison() {
  /**
   * Adds a product to the comparison list if it's not already included and the list isn't full.
   * @param {Product} product - The product to add to the comparison list.
   */
  const addToComparison = (product) => {
    if (comparisonList.value.length < MAX_COMPARISON_ITEMS && !comparisonList.value.some(item => item.id === product.id)) {
      comparisonList.value.push(product)
    }
  }

  /**
   * Removes a product from the comparison list by its ID.
   * @param {number|string} productId - The unique identifier of the product to remove.
   */
  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(item => item.id !== productId)
  }

  /**
   * Clears the entire comparison list.
   */
  const clearComparison = () => {
    comparisonList.value = []
  }

  /**
   * Checks if a product is already in the comparison list.
   * @param {number|string} productId - The unique identifier of the product.
   * @returns {boolean} True if the product is in the comparison list, false otherwise.
   */
  const isInComparison = (productId) => {
    return comparisonList.value.some(item => item.id === productId)
  }

  /**
   * The number of products currently in the comparison list.
   * @type {import('vue').ComputedRef<number>}
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

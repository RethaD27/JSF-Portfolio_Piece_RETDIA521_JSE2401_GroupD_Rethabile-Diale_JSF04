import { ref, computed } from 'vue'

const comparisonList = ref([])
const MAX_COMPARISON_ITEMS = 4

export function useComparison() {
  const addToComparison = (product) => {
    if (comparisonList.value.length < MAX_COMPARISON_ITEMS && !comparisonList.value.some(item => item.id === product.id)) {
      comparisonList.value.push(product)
    }
  }

  const removeFromComparison = (productId) => {
    comparisonList.value = comparisonList.value.filter(item => item.id !== productId)
  }

  const clearComparison = () => {
    comparisonList.value = []
  }

  const isInComparison = (productId) => {
    return comparisonList.value.some(item => item.id === productId)
  }

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
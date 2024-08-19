<template>
  <button
    @click="toggleComparison"
    :disabled="!isLoggedIn || (isInComparison && comparisonCount >= MAX_COMPARISON_ITEMS)"
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200"
  >
    {{ buttonText }}
  </button>
</template>

<script>
import { computed, inject } from 'vue'
import { useComparison } from '../composables/useComparison'
import { useRouter } from 'vue-router'

export default {
  name: 'ComparisonButton',
  props: {
    /**
     * The product to be added or removed from comparison.
     * @type {Object}
     * @property {string} id - The unique identifier of the product.
     */
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addToComparison, removeFromComparison, isInComparison, comparisonCount, MAX_COMPARISON_ITEMS } = useComparison()
    const isLoggedIn = inject('isLoggedIn')
    const router = useRouter()

    /**
     * Toggles the product's presence in the comparison list.
     * If the user is not logged in, redirects to the login page.
     */
    const toggleComparison = () => {
      if (!isLoggedIn.value) {
        router.push('/login')
        return
      }

      if (isInComparison(props.product.id)) {
        removeFromComparison(props.product.id)
      } else {
        addToComparison(props.product)
      }
    }

    /**
     * Computes the button text based on the user's login status and product's comparison status.
     * @returns {string} The text to display on the button.
     */
    const buttonText = computed(() => {
      if (!isLoggedIn.value) return 'Login to Compare'
      if (isInComparison(props.product.id)) return 'Remove from Comparison'
      if (comparisonCount.value >= MAX_COMPARISON_ITEMS) return 'Comparison List Full'
      return 'Add to Comparison'
    })

    return {
      toggleComparison,
      buttonText,
      isLoggedIn,
      isInComparison: computed(() => isInComparison(props.product.id)),
      comparisonCount,
      MAX_COMPARISON_ITEMS
    }
  }
}
</script>

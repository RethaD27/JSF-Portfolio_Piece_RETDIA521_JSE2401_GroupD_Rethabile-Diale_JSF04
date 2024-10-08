<template>
  <button
    @click="toggleComparison"
    :disabled="!userILoggedIn || (isInComparison && comparisonCount >= MAX_COMPARISON_ITEMS)"
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-200"
  >
    {{ userILoggedIn ? buttonText : 'Login to Compare' }}
  </button>
</template>

<script>
import { inject, watchEffect, ref, computed } from 'vue'
import { useComparison } from '../composables/useComparison'
import { useAuth } from '../composables/useAuth'
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
    const router = useRouter()
    const { isAuthenticated } = useAuth()
    const isLoggedIn = inject('isLoggedIn')

    /**
     * Handles the toggle comparison action. If the user is logged in, it adds/removes the product from comparison.
     * Otherwise, it redirects the user to the login page.
     */
    const handleToggleComparison = () => {
      if (userILoggedIn.value) {
        if (isInComparison(props.product.id)) {
          removeFromComparison(props.product.id)
        } else {
          addToComparison(props.product)
        }
      } else {
        router.push('/login')
      }
    }

    const userILoggedIn = ref(isAuthenticated.value)

    watchEffect(() => {
      userILoggedIn.value = isAuthenticated.value
    })

    /**
     * Computes the button text based on the user's login status and product's comparison status.
     * @returns {string} The text to display on the button.
     */
    const buttonText = computed(() => {
      if (isInComparison(props.product.id)) return 'Remove from Comparison'
      if (comparisonCount.value >= MAX_COMPARISON_ITEMS) return 'Comparison List Full'
      return 'Add to Comparison'
    })

    return {
      toggleComparison: handleToggleComparison,
      buttonText,
      userILoggedIn,
      isInComparison: computed(() => isInComparison(props.product.id)),
      comparisonCount,
      MAX_COMPARISON_ITEMS
    }
  }
}
</script>

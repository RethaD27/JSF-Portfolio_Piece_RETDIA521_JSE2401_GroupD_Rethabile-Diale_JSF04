<template>
  <button
    @click="addToCart"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
    :disabled="!isLoggedIn"
  >
    {{ userILoggedIn ? 'Add To Cart' : 'Login to Add' }}
  </button>
</template>

<script>
import { inject, watchEffect, ref } from 'vue'
import { useCart } from '../composables/useCart'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'AddToCartButton',
  props: {
    /**
     * The product object to be added to the cart.
     * @type {Object}
     * @required
     */
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addToCart } = useCart()
    const isLoggedIn = inject('isLoggedIn')
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    /**
     * Handles the add to cart action. If the user is logged in, it adds the product to the cart.
     * Otherwise, it redirects the user to the login page.
     */
    const handleAddToCart = () => {
      if (isLoggedIn.value) {
        addToCart(props.product)
      } else {
        router.push('/login')
      }
    }

const userILoggedIn = ref(isAuthenticated.value)

  watchEffect(() => {
    userILoggedIn.value = isAuthenticated.value
  })

    return {
      addToCart: handleAddToCart,
      isLoggedIn,
      userILoggedIn,
    }
  }
}

</script>

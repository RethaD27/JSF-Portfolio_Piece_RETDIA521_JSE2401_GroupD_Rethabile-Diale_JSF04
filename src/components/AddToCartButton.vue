<template>
  <button
    @click="addToCart"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
    :disabled="!isLoggedIn"
  >
    {{ isLoggedIn ? 'Add To Cart' : 'Login to Add' }}
  </button>
</template>

<script>
import { inject } from 'vue'
import { useCart } from '../composables/useCart'
import { useRouter } from 'vue-router'

export default {
  name: 'AddToCartButton',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { addToCart } = useCart()
    const isLoggedIn = inject('isLoggedIn')
    const router = useRouter()

    const handleAddToCart = () => {
      if (isLoggedIn.value) {
        addToCart(props.product)
      } else {
        router.push('/login')
      }
    }

    return {
      addToCart: handleAddToCart,
      isLoggedIn
    }
  }
}
</script>
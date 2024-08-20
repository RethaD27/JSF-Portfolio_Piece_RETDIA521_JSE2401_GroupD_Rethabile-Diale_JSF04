<template>
  <button
    @click="addToWishlist"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
    :disabled="!isLoggedIn"
  >
    {{ userILoggedIn ? 'Add To Wishlist' : 'Login to Add' }}
  </button>
</template>

<script>
import { inject, ref, watchEffect } from 'vue'
import { useWishlist } from '../composables/useWishlist'
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'WishlistButton',

  props: {
    /**
     * The product object that will be added to the wishlist.
     * 
     * @type {Object}
     * @property {number} id - The ID of the product.
     * @property {string} name - The name of the product.
     */
    product: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const { addToWishlist } = useWishlist()
    const isLoggedIn = inject('isLoggedIn')
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    const userILoggedIn = ref(isAuthenticated.value)

    /**
     * Handles the click event for adding a product to the wishlist.
     * Redirects to the login page if the user is not logged in.
     * 
     * @function
     */
    const handleAddToWishlist = () => {
      if (userILoggedIn.value) {
        addToWishlist(props.product)
      } else {
        router.push('/login')
      }
    }

    watchEffect(() => {
      userILoggedIn.value = isAuthenticated.value
    })

    return {
      addToWishlist: handleAddToWishlist,
      isLoggedIn,
      userILoggedIn
    }
  }
}
</script>

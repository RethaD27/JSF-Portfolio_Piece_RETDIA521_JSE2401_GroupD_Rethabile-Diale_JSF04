<template>
  <button
    @click="addToWishlist"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-200"
    :disabled="!isLoggedIn"
  >
    {{ isLoggedIn ? 'Add To Wishlist' : 'Login to Add' }}
  </button>
</template>

<script>
import { inject } from 'vue'
import { useWishlist } from '../composables/useWishlist'
import { useRouter } from 'vue-router'

/**
 * A button component for adding a product to the wishlist.
 * The button displays "Add To Wishlist" if the user is logged in, or "Login to Add" if not.
 * Clicking the button will either add the product to the wishlist or redirect the user to the login page.
 * 
 * @component
 * @example
 * <WishlistButton :product="{ id: 1, name: 'Sample Product' }" />
 */
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
    /**
     * Composable function for wishlist operations.
     * 
     * @function
     * @returns {Object} - Contains the function `addToWishlist` to add a product to the wishlist.
     */
    const { addToWishlist } = useWishlist()
    
    /**
     * Injected reactive reference indicating if the user is logged in.
     * 
     * @type {import('vue').Ref<boolean>}
     */
    const isLoggedIn = inject('isLoggedIn')
    
    /**
     * Vue Router instance for navigation.
     * 
     * @type {import('vue-router').Router}
     */
    const router = useRouter()

    /**
     * Handles the click event for adding a product to the wishlist.
     * Redirects to the login page if the user is not logged in.
     * 
     * @function
     */
    const handleAddToWishlist = () => {
      if (isLoggedIn.value) {
        addToWishlist(props.product)
      } else {
        router.push('/login')
      }
    }

    return {
      addToWishlist: handleAddToWishlist,
      isLoggedIn
    }
  }
}
</script>

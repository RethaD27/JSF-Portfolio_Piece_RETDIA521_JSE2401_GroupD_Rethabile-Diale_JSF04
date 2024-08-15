<template>
    <button
      @click="addToWishlist"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-200"
      :disabled="!isLoggedIn"
    >
      {{ isLoggedIn ? 'Add To Wishlist' : 'Login to Add' }}
    </button>
  </template>
  
  <script>
  import { inject } from 'vue'
  import { useWishlist } from '../composables/useWishlist'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'WishlistButton',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const { addToWishlist } = useWishlist()
      const isLoggedIn = inject('isLoggedIn')
      const router = useRouter()
  
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
  
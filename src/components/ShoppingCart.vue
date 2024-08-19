<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <div v-if="cart.length === 0" class="text-gray-500">Your cart is empty</div>
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="bg-white shadow-md rounded-lg overflow-hidden mb-4 flex items-center">
        <!-- Image Container -->
        <div class="w-24 h-24 overflow-hidden flex-shrink-0">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </router-link>
        </div>
        <!-- Content Container -->
        <div class="p-4 flex-1 flex justify-between items-center">
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-2">
              <router-link :to="`/product/${item.id}`">
                {{ item.title }}
              </router-link>
            </h3>
            <p class="text-gray-600 mb-2">{{ item.description }}</p>
            <p class="text-gray-800 font-bold">{{ "$" + item.price.toFixed(2) }}</p>
          </div>
          <div class="flex items-center">
            <button @click="updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 bg-gray-200 rounded">-</button>
            <span class="mx-2">{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
            <button @click="removeFromCart(item.id)" class="ml-4 text-red-500">Remove</button>
          </div>
        </div>
      </div>
      <div class="mt-4 text-right">
        <p class="font-bold">Total: ${{ totalCost }}</p>
        <button @click="clearCart" class="mt-2 bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '../composables/useCart'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

/**
 * A Vue component that displays the shopping cart with options to update quantities, remove items, and clear the cart.
 *
 * @component
 */
export default {
  name: 'ShoppingCart',
  setup() {
    /**
     * Provides cart-related methods and state.
     *
     * @const
     * @type {Object}
     * @property {Ref<Array>} cart - The current list of items in the cart.
     * @property {Function} removeFromCart - Function to remove an item from the cart.
     * @property {Function} updateQuantity - Function to update the quantity of an item in the cart.
     * @property {Function} clearCart - Function to clear all items from the cart.
     * @property {Ref<number>} totalCost - The total cost of items in the cart.
     * @property {Function} loadCart - Function to load the cart data.
     */
    const { cart, removeFromCart, updateQuantity, clearCart, totalCost, loadCart } = useCart()

    const router = useRouter()

    /**
     * Lifecycle hook that runs when the component is mounted.
     * Redirects to the login page if no token is found in local storage; otherwise, loads the cart.
     */
    onMounted(() => {
      if (!localStorage.getItem('token')) {
        router.push('/login')
      } else {
        loadCart()
      }
    })

    return {
      cart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalCost
    }
  }
}
</script>

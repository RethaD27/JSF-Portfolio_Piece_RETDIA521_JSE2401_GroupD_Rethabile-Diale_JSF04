<template>
  <div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>
    <div v-if="cart.length === 0" class="text-gray-500">Your cart is empty</div>
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="flex items-center justify-between border-b py-4">
        <div>
          <h3 class="font-bold">{{ item.title }}</h3>
          <p class="text-gray-600">${{ item.price }}</p>
        </div>
        <div class="flex items-center">
          <button @click="updateQuantity(item.id, item.quantity - 1)" class="px-2 py-1 bg-gray-200 rounded">-</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button @click="updateQuantity(item.id, item.quantity + 1)" class="px-2 py-1 bg-gray-200 rounded">+</button>
          <button @click="removeFromCart(item.id)" class="ml-4 text-red-500">Remove</button>
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

export default {
  name: 'ShoppingCart',
  setup() {
    const { cart, removeFromCart, updateQuantity, clearCart, totalCost } = useCart()

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
<template>
  <nav class="fixed w-full bg-purple-900 p-4 text-purple-400 shadow-lg z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold swift-cart-store">SwiftCart Store</div>
      <div class="hidden md:flex">
        <router-link to="/" class="mr-4 hover:underline">Home</router-link>
        <router-link to="/" class="mr-4 hover:underline">Wishlist</router-link>
        <router-link to="/cart" v-if="isLoggedIn" class="mr-4 hover:underline">
          Cart ({{ totalItems }})
        </router-link>
        <router-link to="/comparison" v-if="isLoggedIn" class="mr-4 hover:underline">
          Compare ({{ comparisonCount }})
        </router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="hover:underline">Login</router-link>
        <button v-else @click="logout" class="hover:underline">Logout</button>
      </div>
      <button @click="toggleMenu" class="md:hidden text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
    <div v-if="open" class="md:hidden mt-4 bg-purple-500">
      <router-link to="/" class="block p-2 hover:bg-yellow-400">Home</router-link>
      <router-link to="/" class="block p-2 hover:bg-yellow-400">Wishlist</router-link>
      <router-link to="/cart" v-if="isLoggedIn" class="block p-2 hover:bg-yellow-400">
        Cart ({{ totalItems }})
      </router-link>
      <router-link to="/comparison" v-if="isLoggedIn" class="block p-2 hover:bg-yellow-400">
        Compare ({{ comparisonCount }})
      </router-link>
      <router-link v-if="!isLoggedIn" to="/login" class="block p-2 hover:bg-yellow-400">Login</router-link>
      <button v-else @click="logout" class="block w-full text-left p-2 hover:bg-yellow-400">Logout</button>
    </div>
  </nav>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'
import { useComparison } from '../composables/useComparison'

export default {
  name: 'Navbar',
  setup() {
    const open = ref(false)
    const router = useRouter()
    const isLoggedIn = inject('isLoggedIn')
    const { clearCart, totalItems } = useCart()
    const { comparisonCount } = useComparison()

    const toggleMenu = () => {
      open.value = !open.value
    }

    const logout = () => {
      localStorage.removeItem('token')
      isLoggedIn.value = false
      clearCart()
      router.push('/')
    }

    return {
      open,
      toggleMenu,
      isLoggedIn,
      logout,
      totalItems,
      comparisonCount
    }
  }
}
</script>

<style scoped>
.swift-cart-store {
  font-family: 'Brush Script MT', cursive;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 1px;
  background: linear-gradient(45deg, #ff79c6, #bd93f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

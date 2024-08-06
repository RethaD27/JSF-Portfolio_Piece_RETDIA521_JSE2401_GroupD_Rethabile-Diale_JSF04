<template>
  <nav class="fixed w-full bg-purple-900 p-4 text-purple-400 shadow-lg z-10">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold swift-cart-store">SwiftCart Store</div>
      <div class="hidden md:flex">
        <router-link to="/" class="mr-4 hover:underline">Home</router-link>
        <router-link to="/" class="mr-4 hover:underline">Wishlist</router-link>
        <router-link to="/" class="mr-4 hover:underline">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- SVG content -->
          </svg>
        </router-link>
        <router-link to="/" class="hover:underline">Login</router-link>
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
      <router-link to="/" class="block p-2 hover:bg-yellow-400">
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- SVG content -->
        </svg>
      </router-link>
      <router-link to="/" class="block p-2 hover:bg-yellow-400">Login</router-link>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'

/**
 * @module Navbar
 * @description A navigation bar component for the SwiftCart Store.
 */
export default {
  name: 'Navbar',
  setup() {
    /**
     * @description Ref to keep track of the menu's open state.
     * @type {import('vue').Ref<boolean>}
     */
    const open = ref(false)

    /**
     * @function toggleMenu
     * @description Toggles the visibility of the mobile menu.
     */
    const toggleMenu = () => {
      open.value = !open.value
    }

    return {
      open,
      toggleMenu
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

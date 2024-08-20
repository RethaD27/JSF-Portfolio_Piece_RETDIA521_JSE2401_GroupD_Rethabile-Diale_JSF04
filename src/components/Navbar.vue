<template>
  <nav
    class="fixed w-full shadow-lg z-10"
    :class="[
      'bg-purple-900 text-purple-400',
      { 'dark:bg-gray-800 dark:text-gray-400': isDarkMode },
    ]"
  >
    <div class="container mx-auto flex justify-between items-center p-4">
      <div class="text-2xl font-bold rapid-cart-boutique">
        <i class="fa-solid fa-crown text-2xl mr-2"></i>
        RapidCart Boutique
      </div>
      <div class="hidden md:flex items-center">
        <router-link to="/" class="mr-4 hover:underline">
          <i class="fa-solid fa-house"></i>
        </router-link>
        <router-link
          to="/wishlist"
          v-if="isAuthenticated"
          class="mr-4 hover:underline"
        >
          <i class="fa-solid fa-heart"></i> ({{ wishlistCount }})
        </router-link>
        <router-link
          to="/cart"
          v-if="isAuthenticated"
          class="mr-4 hover:underline"
        >
          <i class="fa-solid fa-cart-shopping"></i> ({{ totalItems }})
        </router-link>
        <router-link
          to="/comparison"
          v-if="isAuthenticated"
          class="mr-4 hover:underline"
        >
          <i class="fas fa-list"></i> ({{ comparisonCount }})
        </router-link>
        <!-- Display the username with a null check -->
        <span v-if="isAuthenticated && user" class="text-white dark:text-gray-400 mr-4">
          {{ user.username }}
        </span>
        <router-link v-if="!isAuthenticated" to="/login" class="hover:underline">
          <i class="fa-solid fa-user"></i>
        </router-link>
        <button
          v-else
          @click="handleLogout"
          class="hover:underline"
        >
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
      <div class="flex items-center">
        <ThemeToggle @theme-changed="isDarkMode = $event" />
        <button
          @click="toggleMenu"
          class="md:hidden text-white dark:text-gray-400 ml-4"
        >
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
    </div>
    <div
      v-if="open"
      class="md:hidden mt-4"
      :class="[
        'bg-purple-500 dark:bg-gray-700',
        { 'dark:text-gray-400': isDarkMode },
      ]"
    >
      <router-link
        to="/"
        class="block p-2 hover:bg-yellow-400 dark:hover:bg-gray-600"
      >
        <i class="fa-solid fa-house"></i>
      </router-link>
      <router-link
        to="/wishlist"
        v-if="isAuthenticated"
        class="block p-2 hover:bg-yellow-400 dark:hover:bg-gray-600"
      >
        <i class="fa-solid fa-heart"></i> ({{ wishlistCount }})
      </router-link>
      <router-link
        to="/cart"
        v-if="isAuthenticated"
        class="block p-2 hover:bg-yellow-400 dark:hover:bg-gray-600"
      >
        <i class="fa-solid fa-cart-shopping"></i> ({{ totalItems }})
      </router-link>
      <router-link
        to="/comparison"
        v-if="isAuthenticated"
        class="block p-2 hover:bg-yellow-400 dark:hover:bg-gray-600"
      >
        <i class="fas fa-list"></i> ({{ comparisonCount }})
      </router-link>
      <!-- Display the username in the mobile menu with a null check -->
      <span v-if="isAuthenticated && user" class="block p-2 text-white dark:text-gray-400">
        {{ user.username }}
      </span>
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="block p-2 hover:bg-yellow-400 dark:hover:bg-gray-600"
      >
        <i class="fa-solid fa-user"></i>
      </router-link>
      <button
        v-else
        @click="handleLogout"
        class="block w-full text-left p-2 hover:bg-yellow-400 dark:hover:bg-gray-600"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "../composables/useCart";
import { useComparison } from "../composables/useComparison";
import { useWishlist } from "../composables/useWishlist";
import { useAuth } from "../composables/useAuth";
import ThemeToggle from "./ThemeToggle.vue";

export default {
  name: "Navbar",
  components: {
    ThemeToggle,
  },
  setup() {
    const open = ref(false);
    const router = useRouter();
    const isDarkMode = ref(false);
    const { clearCart, totalItems } = useCart();
    const { comparisonCount } = useComparison();
    const { wishlist } = useWishlist();
    const { isAuthenticated, logout, user } = useAuth(); // Access user object

    const wishlistCount = computed(() => wishlist.value.length);

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const handleLogout = () => {
      logout();
      clearCart();
      router.push('/');
    };

    return {
      open,
      toggleMenu,
      isAuthenticated,
      handleLogout,
      totalItems,
      comparisonCount,
      wishlistCount,
      isDarkMode,
      user, // Return user for template usage
    };
  },
};
</script>

<style scoped>
.rapid-cart-boutique {
  font-family: "Brush Script MT", cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  background: linear-gradient(45deg, #ff79c6, #bd93f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

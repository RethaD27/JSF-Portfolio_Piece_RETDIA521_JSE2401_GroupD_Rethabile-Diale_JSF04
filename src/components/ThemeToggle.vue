<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ isDarkMode ? '☀️' : '🌙' }}
  </button>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

/**
 * A Vue component that toggles between light and dark themes.
 *
 * @component
 */
export default {
  name: 'ThemeToggle',
  setup() {
    /**
     * Reactive state that tracks if dark mode is enabled.
     *
     * @type {Ref<boolean>}
     */
    const isDarkMode = ref(false);

    /**
     * Toggles the theme between light and dark modes.
     * Updates local storage with the current theme and applies the theme.
     */
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
      applyTheme();
    };

    /**
     * Applies the current theme to the document.
     * Adds or removes the 'dark-mode' class from the document root element.
     */
    const applyTheme = () => {
      document.documentElement.classList.toggle('dark-mode', isDarkMode.value);
    };

    /**
     * Lifecycle hook that runs when the component is mounted.
     * Retrieves the saved theme from local storage or defaults to system preference.
     */
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme');
      isDarkMode.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      applyTheme();
    });

    /**
     * Watcher that applies the theme whenever `isDarkMode` changes.
     */
    watch(isDarkMode, applyTheme);

    return { isDarkMode, toggleTheme };
  }
};
</script>

<style scoped>
/**
 * Styles for the theme toggle button.
 */
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  padding: 0.5rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/**
 * Hover effect for the theme toggle button.
 */
.theme-toggle:hover {
  transform: scale(1.1);
}
</style>

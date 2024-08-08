<!-- src/components/ThemeToggle.vue -->
<template>
  <button @click="toggleTheme" class="theme-toggle">
    {{ isDarkMode ? '☀️' : '🌙' }}
  </button>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'ThemeToggle',
  setup() {
    const isDarkMode = ref(false);

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
      applyTheme();
    };

    const applyTheme = () => {
      document.documentElement.classList.toggle('dark-mode', isDarkMode.value);
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme');
      isDarkMode.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      applyTheme();
    });

    watch(isDarkMode, applyTheme);

    return { isDarkMode, toggleTheme };
  }
};
</script>

<style scoped>
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

.theme-toggle:hover {
  transform: scale(1.1);
}
</style>
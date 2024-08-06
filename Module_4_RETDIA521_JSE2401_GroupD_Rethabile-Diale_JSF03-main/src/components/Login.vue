<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input id="username" name="username" type="text" required
              v-model="username"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <div class="relative">
              <input :id="password" :name="password" :type="showPassword ? 'text' : 'password'" required
                v-model="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password">
              <button type="button" @click="togglePassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <eye-icon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <eye-off-icon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="isLoading || !username || !password"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading || !username || !password }">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <lock-closed-icon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
      <div v-if="error" class="mt-2 text-center text-sm text-red-600">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EyeIcon from '../icons/EyeIcon.vue'
import EyeOffIcon from '../icons/EyeOffIcon.vue'
import LockClosedIcon from '../icons/LockClosedIcon.vue'

export default {
  name: 'Login',
  components: {
    EyeIcon,
    EyeOffIcon,
    LockClosedIcon
  },
  setup() {
    const username = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const isLoading = ref(false)
    const error = ref('')
    const router = useRouter()
    const route = useRoute()

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleLogin = async () => {
      isLoading.value = true
      error.value = ''

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()
        localStorage.setItem('token', data.token)
        
        // Redirect to the previous page or home
        const redirectPath = route.query.redirect || '/'
        router.push(redirectPath)
      } catch (err) {
        error.value = 'Invalid username or password'
      } finally {
        isLoading.value = false
      }
    }

    return {
      username,
      password,
      showPassword,
      isLoading,
      error,
      togglePassword,
      handleLogin
    }
  }
}
</script>
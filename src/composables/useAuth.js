// src/composables/useAuth.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const token = ref(localStorage.getItem('token'))

export function useAuth() {
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username, password) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      token.value = data.token
      localStorage.setItem('token', data.token)
      user.value = { username }
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  const checkAuth = () => {
    token.value = localStorage.getItem('token')
    if (token.value) {
      // You might want to validate the token here or fetch user data
      user.value = { username: 'User' } // Placeholder, replace with actual user data
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
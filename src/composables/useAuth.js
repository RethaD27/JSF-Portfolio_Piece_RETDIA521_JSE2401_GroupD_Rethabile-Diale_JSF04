// src/composables/useAuth.js
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const token = ref(localStorage.getItem('token'))

/**
 * Composable function to handle user authentication.
 * Provides methods for login, logout, and checking authentication status.
 *
 * @returns {Object} An object containing user, token, isAuthenticated, login, logout, and checkAuth.
 */
export function useAuth() {
  const router = useRouter()

  /**
   * A computed property to check if the user is authenticated.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const isAuthenticated = computed(() => !!token.value)

  /**
   * Logs in a user using the provided username and password.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<boolean>} Returns true if login is successful, otherwise false.
   */
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

  /**
   * Logs out the current user, clears the token and user data, and redirects to the login page.
   */
  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  /**
   * Checks if the user is authenticated by looking for a token in local storage.
   * Sets the user data if the token is found.
   */
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

import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

const cart = ref([])
const userId = ref(null)

/**
 * A composable that provides cart functionalities including adding, removing, updating products,
 * and managing the cart's state in localStorage.
 * @returns {Object} Cart functionalities and reactive properties.
 */
export function useCart() {
  
  /**
   * Adds a product to the cart. If the product already exists, its quantity is incremented.
   * @param {Object} product - The product object to add to the cart.
   * @param {number} product.id - The unique identifier of the product.
   * @param {number} product.price - The price of the product.
   */
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    saveCart()
  }

  /**
   * Removes a product from the cart by its ID.
   * @param {number} productId - The unique identifier of the product to remove.
   */
  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
    saveCart()
  }

  /**
   * Updates the quantity of a product in the cart. Removes the product if the quantity is 0 or less.
   * @param {number} productId - The unique identifier of the product to update.
   * @param {number} quantity - The new quantity of the product.
   */
  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        saveCart()
      }
    }
  }

  /**
   * Clears the cart by removing all products.
   */
  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  /**
   * Saves the current cart to localStorage with a key based on the user ID.
   */
  const saveCart = () => {
    localStorage.setItem(`cart_${userId.value}`, JSON.stringify(cart.value))
  }

  /**
   * Loads the cart from localStorage based on the user's token. Assumes the token contains the user ID in the 'sub' claim.
   */
  const loadCart = () => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      userId.value = decodedToken.sub // Assuming the user ID is stored in the 'sub' claim
      const savedCart = localStorage.getItem(`cart_${userId.value}`)
      if (savedCart) {
        cart.value = JSON.parse(savedCart)
      }
    }
  }

  /**
   * Computes the total number of items in the cart.
   * @returns {number} The total number of items.
   */
  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  /**
   * Computes the total cost of items in the cart.
   * @returns {string} The total cost formatted to two decimal places.
   */
  const totalCost = computed(() => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    totalItems,
    totalCost
  }
}

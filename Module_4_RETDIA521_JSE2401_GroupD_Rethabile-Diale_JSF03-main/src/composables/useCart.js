import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'

const cart = ref([])
const userId = ref(null)

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cart.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    saveCart()
  }

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
    saveCart()
  }

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

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  const saveCart = () => {
    localStorage.setItem(`cart_${userId.value}`, JSON.stringify(cart.value))
  }

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

  const totalItems = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

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
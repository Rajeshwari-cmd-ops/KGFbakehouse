import React, { createContext, useContext, useState, useEffect } from 'react'
import { BUSINESS_INFO } from '../data/products.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('kgf_cart_v2')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const [flyingParticles, setFlyingParticles] = useState([])

  useEffect(() => {
    try {
      localStorage.setItem('kgf_cart_v2', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  const addToCart = (product, quantity = 1, clickEvent = null) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })

    // Cart badge bounce animation
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), 700)

    // Trigger flying item arc animation toward top cart
    if (clickEvent && clickEvent.clientX && clickEvent.clientY) {
      const id = Date.now() + Math.random()
      const newParticle = {
        id,
        startX: clickEvent.clientX,
        startY: clickEvent.clientY
      }
      setFlyingParticles((prev) => [...prev, newParticle])
      setTimeout(() => {
        setFlyingParticles((prev) => prev.filter((p) => p.id !== id))
      }, 950)
    }
  }

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Direct WhatsApp Checkout Order String Generator
  const generateWhatsAppOrderUrl = (customerDetails = {}) => {
    if (cart.length === 0) return ''

    let message = `Hello KGF Bakehouse! 🥖\n\nI would like to place an order from your website:\n\n`
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* × ${item.quantity} = ₹${item.price * item.quantity}\n`
    })

    message += `\n*Total Order Value:* ₹${cartSubtotal}\n`

    if (customerDetails.name) {
      message += `\n*Customer Details:*\n`
      message += `• Name: ${customerDetails.name}\n`
      if (customerDetails.phone) message += `• Phone: ${customerDetails.phone}\n`
      if (customerDetails.address) message += `• Delivery Area / Address: ${customerDetails.address}\n`
      if (customerDetails.date) message += `• Required By: ${customerDetails.date}\n`
      if (customerDetails.notes) message += `• Dietary / Prep Notes: ${customerDetails.notes}\n`
    }

    message += `\nPlease confirm availability and delivery slot for Whitefield/Bengaluru. Thank you!`

    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isBouncing,
        flyingParticles,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

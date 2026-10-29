import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    getWhatsAppCheckoutLink,
    clearCart,
  } = useCart()

  const [customerName, setCustomerName] = useState('')
  const [deliveryNotes, setDeliveryNotes] = useState('')

  const handleWhatsAppCheckout = () => {
    const url = getWhatsAppCheckoutLink(customerName, deliveryNotes)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      setIsCartDrawerOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartDrawerOpen(false)}
            className="absolute inset-0 bg-[#2E1D16]/50 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FDF9F3] text-[#2E1D16] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#2E1D16]/10 flex items-center justify-between bg-[#FBF4ED]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#C4733A]" />
                  <h3 className="font-serif text-xl font-bold text-[#2E1D16]">Your Pre-Order Basket</h3>
                </div>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#2E1D16]/10 text-[#2E1D16]/70 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 rounded-full bg-[#F3E3D3] flex items-center justify-center mx-auto mb-4 text-[#C4733A]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#2E1D16] mb-1">
                      Your basket is empty
                    </h4>
                    <p className="text-xs text-[#2E1D16]/70 max-w-xs mx-auto mb-6">
                      Explore our freshly baked breads, melt-in-your-mouth cookies, and artisan cakes.
                    </p>
                    <Link
                      to="/shop"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="inline-block px-5 py-2.5 rounded-full bg-[#C4733A] text-white text-xs font-semibold hover:bg-[#AF622C] transition-colors shadow-sm"
                    >
                      Browse Bakery Menu
                    </Link>
                  </div>
                ) : (
                  <>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3.5 p-3.5 rounded-2xl bg-white border border-[#2E1D16]/5 shadow-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h5 className="font-serif font-bold text-sm text-[#2E1D16] truncate">
                                {item.name}
                              </h5>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-[#2E1D16]/40 hover:text-red-500 transition-colors p-0.5"
                                title="Remove"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[11px] text-[#7D8C6F] font-semibold">{item.unit}</div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-[#2E1D16]/15 rounded-lg bg-[#FDF9F3]">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-[#2E1D16]/5 text-[#2E1D16]/80 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-[#2E1D16]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-[#2E1D16]/5 text-[#2E1D16]/80 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="font-serif font-bold text-sm text-[#C4733A]">
                              ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Pre-Order Details */}
                    <div className="pt-3 border-t border-[#2E1D16]/10 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2E1D16]/70 mb-1">
                          Your Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Jasleen Kaur"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#2E1D16]/15 bg-white focus:outline-none focus:border-[#C4733A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#2E1D16]/70 mb-1">
                          Delivery / Dietary Notes
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Self-pickup at Hoodi Circle, eggless if possible"
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#2E1D16]/15 bg-white focus:outline-none focus:border-[#C4733A]"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#2E1D16]/10 bg-[#FBF4ED] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1D16]/70">
                      Estimated Subtotal:
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#C4733A]">
                      ₹{cartTotal}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#7D8C6F] bg-[#EAEFE6] p-2.5 rounded-xl border border-[#7D8C6F]/20">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span>Baked fresh on pre-order. 24–48 hours notice.</span>
                  </div>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all hover:scale-[1.02] shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <Link
                      to="/cart"
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="text-xs text-[#C4733A] font-semibold hover:underline"
                    >
                      View Full Cart & Details →
                    </Link>
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-[#2E1D16]/50 hover:text-red-500 transition-colors"
                    >
                      Clear Basket
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

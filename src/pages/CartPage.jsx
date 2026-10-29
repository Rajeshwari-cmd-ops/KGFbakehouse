import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, MapPin, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { BUSINESS_INFO } from '../data/products.js'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, getWhatsAppCheckoutLink } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [orderType, setOrderType] = useState('pickup') // 'pickup' or 'delivery'
  const [notes, setNotes] = useState('')

  const handlePlaceOrder = () => {
    const formattedNotes = `Order Type: ${orderType === 'pickup' ? 'Self-Pickup at Hoodi Circle' : 'Doorstep Bengaluru Delivery'}\nPhone: ${customerPhone}\nSpecial Instructions: ${notes || 'None'}`
    const url = getWhatsAppCheckoutLink(customerName, formattedNotes)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="w-full bg-[#FDF9F3] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E1D16] mb-2">
          Your Pre-Order Basket
        </h1>
        <p className="text-xs text-[#2E1D16]/70 mb-8">
          Review your bakes, choose pickup or delivery, and send directly to Chef Jasleen on WhatsApp.
        </p>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#2E1D16]/10 shadow-sm p-8">
            <div className="w-16 h-16 rounded-full bg-[#F3E3D3] flex items-center justify-center mx-auto mb-4 text-[#C4733A]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2E1D16] mb-2">
              Your basket is empty
            </h2>
            <p className="text-xs text-[#2E1D16]/70 max-w-sm mx-auto mb-6">
              Our freshly baked artisan breads, chocolate cakes, and butter cookies are waiting for you!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C4733A] text-white text-xs font-semibold shadow-md"
            >
              <span>Explore Bakery Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#2E1D16]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#2E1D16]/10">
                <span className="font-serif font-bold text-base text-[#2E1D16]">
                  {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs text-[#2E1D16]/50 hover:text-red-500 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-[#2E1D16]/5 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-serif font-bold text-sm text-[#2E1D16] truncate">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#2E1D16]/40 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#7D8C6F] font-semibold">{item.unit}</div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#2E1D16]/20 rounded-lg bg-[#FDF9F3]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#2E1D16]/5 text-[#2E1D16]/80"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-[#2E1D16]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#2E1D16]/5 text-[#2E1D16]/80"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="font-serif font-bold text-base text-[#C4733A]">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Form & WhatsApp Action */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#2E1D16]/10 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2E1D16]">Order Details</h2>

              {/* Order Type Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    orderType === 'pickup'
                      ? 'border-[#C4733A] bg-[#C4733A]/10 text-[#C4733A]'
                      : 'border-[#2E1D16]/15 bg-[#FDF9F3] text-[#2E1D16]/70'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Self-Pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    orderType === 'delivery'
                      ? 'border-[#C4733A] bg-[#C4733A]/10 text-[#C4733A]'
                      : 'border-[#2E1D16]/15 bg-[#FDF9F3] text-[#2E1D16]/70'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Bengaluru Delivery</span>
                </button>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#2E1D16]/80 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jasleen Kaur"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#2E1D16]/80 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 80738 79160"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#2E1D16]/80 mb-1">
                    Delivery Address / Dietary Preferences
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Whitefield address, eggless if possible"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A]"
                  />
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-4 border-t border-[#2E1D16]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#2E1D16]/70">
                    Estimated Subtotal:
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#C4733A]">
                    ₹{cartTotal}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#7D8C6F] bg-[#EAEFE6] p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>24–48 hours advance notice for freshly baked orders.</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all hover:scale-[1.02] shadow-xl cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Place Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

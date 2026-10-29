import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Sparkles, ShieldCheck, Calendar, ArrowRight } from 'lucide-react'
import { CUSTOM_CAKES_SHOWCASE, createCustomCakeWhatsAppLink, BUSINESS_INFO } from '../data/products.js'

export default function CustomCakesPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: 'Birthday',
    date: '',
    size: '1 kg (6-8 servings)',
    flavor: 'Belgian Chocolate Ganache',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = createCustomCakeWhatsAppLink(formData)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full bg-[#FDF9F3] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#7D8C6F] mb-1">
            Bespoke Celebration Studio
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#2E1D16] mb-3 sm:mb-4">
            Custom Gluten-Free Celebration Cakes
          </h1>
          <p className="text-xs sm:text-sm text-[#2E1D16]/70 leading-relaxed">
            Every celebration deserves a showstopping cake. From textured buttercream florals to dark chocolate ganache drip bakes — crafted with 100% certified gluten-free safety for your peace of mind.
          </p>
        </div>

        {/* 3 Generated Custom Cake Photos Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {CUSTOM_CAKES_SHOWCASE.map((cake, idx) => (
            <motion.div
              key={cake.id}
              whileHover={{ y: -6 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#2E1D16]/10 shadow-lg flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F3E3D3]">
                <img
                  src={cake.image}
                  alt={cake.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#7D8C6F] uppercase tracking-wider mb-1">
                    {cake.flavor}
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2E1D16]">
                    {cake.title}
                  </h3>
                  <p className="text-xs text-[#2E1D16]/70 mt-1.5 sm:mt-2 leading-relaxed">
                    {cake.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#2E1D16]/10 flex items-center justify-between text-xs font-semibold text-[#C4733A]">
                  <span>Dedicated GF Kitchen</span>
                  <span>Pre-Order 48h</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Cake Enquiry Form */}
        <div className="max-w-3xl mx-auto bg-white border border-[#2E1D16]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C4733A]">
              WhatsApp Direct Booking
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1 mb-2">
              Plan Your Dream Cake
            </h2>
            <p className="text-xs text-[#2E1D16]/70 max-w-md mx-auto">
              Share your details below. Clicking submit will open WhatsApp with your cake specifications pre-filled.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jasleen Kaur"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-5 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 80738 79160"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs px-5 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full text-xs px-4 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Kids Theme">Children's Themed Birthday</option>
                  <option value="Milestone Gathering">Family Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs px-4 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                  Weight / Servings
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full text-xs px-4 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
                >
                  <option value="500g (3-4 servings)">500g (3–4 servings)</option>
                  <option value="1 kg (6-8 servings)">1 kg (6–8 servings)</option>
                  <option value="1.5 kg (10-12 servings)">1.5 kg (10–12 servings)</option>
                  <option value="2 kg+ (Grand Celebration)">2 kg+ (Grand Celebration)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                Preferred Flavor Profile
              </label>
              <select
                value={formData.flavor}
                onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                className="w-full text-xs px-5 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
              >
                <option value="Belgian Chocolate Ganache">Belgian Dark Chocolate Ganache</option>
                <option value="Chocolate Drip with Fresh Berries">Chocolate Drip with Fresh Berries</option>
                <option value="Vanilla Bean with Strawberry Coulis">Vanilla Bean with Strawberry Coulis</option>
                <option value="Rose Pistachio Cardamom Meadow">Rose Pistachio & Cardamom Meadow</option>
                <option value="Caramelized Butterscotch Praline">Caramelized Butterscotch Praline</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                Piped Custom Message or Design Concept
              </label>
              <textarea
                rows="3"
                placeholder="e.g. 'Happy 30th Birthday Vishal' with dark chocolate rosettes and gold accents..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs px-5 py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
              />
            </div>

            <div className="flex items-center gap-2 p-3.5 rounded-full bg-[#EAEFE6] text-xs text-[#7D8C6F] font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Please order at least 48 hours prior for custom multi-tier celebration cakes.</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2.5 hover:bg-[#20ba59] transition-all hover:scale-102 active:scale-95 shadow-xl cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="5.5" r="3.2" />
                <circle cx="18.2" cy="10" r="3.2" />
                <circle cx="15.8" cy="17.2" r="3.2" />
                <circle cx="8.2" cy="17.2" r="3.2" />
                <circle cx="5.8" cy="10" r="3.2" />
                <circle cx="12" cy="12" r="2.2" fill="#25D366" />
              </svg>
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Design Your Dream Cake via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

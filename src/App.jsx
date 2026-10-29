import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider, useCart } from './context/CartContext.jsx'
import Header from './components/Header.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SearchModal from './components/SearchModal.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CustomCakesPage from './pages/CustomCakesPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FlowerDefs from './components/FlowerDefs.jsx'
import { MessageCircle, Sparkles } from 'lucide-react'
import { BUSINESS_INFO } from './data/products.js'

// Helper component to scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function MainAppLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { flyingParticles } = useCart()

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF9F3] text-[#2E1D16] font-sans selection:bg-[#C4733A] selection:text-white">
      <ScrollToTop />
      {/* Global SVG Flower ClipPath Definition */}
      <FlowerDefs />

      {/* Header with Announcement bar + Sticky Floating Glass Pill Navbar */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Content Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/custom-cakes" element={<CustomCakesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all fallback to HomePage */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Quick Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Footer with Soft Curved Top Edge */}
      <Footer />

      {/* Floating Add to Cart Flight Animation (Framer Motion Arc to Cart) */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <AnimatePresence>
          {flyingParticles &&
            flyingParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: particle.startX - 16,
                  y: particle.startY - 16,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: [
                    particle.startX - 16,
                    (particle.startX + window.innerWidth - 60) / 2,
                    window.innerWidth - 60,
                  ],
                  y: [
                    particle.startY - 16,
                    Math.max(20, Math.min(particle.startY - 120, 200)),
                    55,
                  ],
                  scale: [1, 1.35, 0.35],
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-8 h-8 rounded-full bg-[#C4733A] text-white flex items-center justify-center shadow-2xl border-2 border-white"
              >
                <Sparkles className="w-4 h-4 fill-white text-white animate-spin" />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Floating WhatsApp Action Button with gentle hover expansion */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
          'Hello KGF Bakehouse! 🥖 I have a question about your gluten-free bakes.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        aria-label="Direct WhatsApp Message"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2">
          WhatsApp Pre-Order
        </span>
      </a>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <MainAppLayout />
      </BrowserRouter>
    </CartProvider>
  )
}

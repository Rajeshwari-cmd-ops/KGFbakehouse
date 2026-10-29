import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, MessageCircle, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { BUSINESS_INFO } from '../data/products.js'

export default function Navbar({ onNavigate, currentPage = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartCount, setIsCartOpen, isBouncing } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Our Story', id: 'story' },
    { label: 'Bestsellers', id: 'bestsellers' },
    { label: 'Categories', id: 'categories' },
    { label: 'Custom Cakes', id: 'custom-cakes' },
    { label: 'GF Promise', id: 'gf-promise' },
    { label: 'Reviews', id: 'reviews' },
  ]

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#2E1D16]/95 backdrop-blur-md py-3.5 shadow-xl border-b border-[#FAF3EB]/10'
            : 'bg-[#2E1D16]/80 backdrop-blur-sm py-5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#C4733A] flex items-center justify-center text-[#FDF9F3] font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FDF9F3] group-hover:text-[#F3E3D3] transition-colors leading-tight">
                KGF Bakehouse
              </div>
              <div className="text-[10px] font-sans tracking-widest uppercase text-[#7D8C6F] font-semibold">
                100% Dedicated Gluten-Free
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-[#FDF9F3]/80 hover:text-[#C4733A] transition-colors tracking-wide cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Order button */}
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello KGF Bakehouse! I would like to enquire about ordering fresh gluten-free bakes.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#7D8C6F] text-[#FDF9F3] hover:bg-[#6C7A5E] transition-all hover:scale-105 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Pre-Order</span>
            </a>

            {/* Cart Trigger with Bounce Animation */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#38241C] text-[#FDF9F3] hover:bg-[#C4733A] transition-colors cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  animate={isBouncing ? { scale: [1, 1.45, 0.9, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-1 -right-1 bg-[#C4733A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-[#2E1D16]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#FDF9F3] hover:text-[#C4733A] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#2E1D16]/98 backdrop-blur-xl border-b border-[#FAF3EB]/10 p-6 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left py-2 text-base font-medium text-[#FDF9F3]/90 hover:text-[#C4733A] border-b border-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7D8C6F] text-[#FDF9F3] font-semibold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({BUSINESS_INFO.phone})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

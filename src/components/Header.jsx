import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { BUSINESS_INFO } from '../data/products.js'
import Logo from './Logo.jsx'

export default function Header({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartCount, setIsCartDrawerOpen, isBouncing } = useCart()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Custom Cakes', path: '/custom-cakes' },
    { label: 'Our Story', path: '/#story' },
    { label: 'GF Promise', path: '/#gf-promise' },
    { label: 'Contact', path: '/contact' },
  ]

  const handleNavClick = (path) => {
    setMobileMenuOpen(false)
    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '')
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* 1. Announcement Bar with Gentle Looping Shimmer */}
      <div className="bg-[#2E1D16] text-[#FDF9F3] text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium border-b border-white/5 relative z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 relative">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#F3E3D3] text-[11px] font-semibold border border-white/10 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#C4733A] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Dedicated Gluten-Free Kitchen</span>
          </span>

          <span className="sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C4733A]/30 text-[#F3E3D3] text-[10px] font-bold border border-white/10 flex-shrink-0">
            100% Celiac Safe
          </span>

          <span className="relative overflow-hidden font-medium inline-block text-[11px] sm:text-xs truncate">
            <span>Thoughtfully Baked. 0% Gluten.</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
              style={{ animation: 'textShimmer 3.5s infinite ease-in-out' }}
            />
          </span>

          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-[#94A485] font-medium">Hoodi, Whitefield, Bengaluru</span>
        </div>
      </div>

      {/* 2. Floating Glass-Pill Navbar with Top Margin (Soft Organic Shape) */}
      <div className="sticky top-2 sm:top-3 z-40 px-2 sm:px-6 w-full max-w-6xl mx-auto transition-all duration-300">
        <header
          className={`w-full rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 ${
            scrolled
              ? 'bg-[#FDF9F3]/95 backdrop-blur-md shadow-xl border border-[#2E1D16]/15'
              : 'bg-[#FDF9F3]/90 backdrop-blur-md shadow-md border border-[#2E1D16]/10'
          }`}
        >
          {/* Recreated Clean Single-Color SVG Logo (Espresso Brown) */}
          <Link
            to="/"
            className="flex items-center text-[#2E1D16] hover:text-[#C4733A] transition-colors group py-0.5 flex-shrink-0 h-7 sm:h-10"
            aria-label="KGF Bakehouse Home"
          >
            <Logo className="h-full w-auto max-w-[125px] sm:max-w-none flex-shrink-0" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-xs sm:text-sm font-medium transition-colors hover:text-[#C4733A] ${
                  location.pathname === link.path ? 'text-[#C4733A] font-semibold' : 'text-[#2E1D16]/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center p-1.5 sm:p-2 rounded-full text-[#2E1D16]/80 hover:text-[#C4733A] hover:bg-[#2E1D16]/5 transition-colors cursor-pointer touch-manipulation"
              aria-label="Search Products"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Trigger with Bouncing Badge */}
            <button
              id="header-cart-button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center p-1.5 sm:p-2.5 rounded-full bg-[#2E1D16] text-[#FDF9F3] hover:bg-[#C4733A] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md touch-manipulation"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <motion.span
                  animate={isBouncing ? { scale: [1, 1.45, 0.9, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-1 -right-1 bg-[#C4733A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-[#FDF9F3]"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* WhatsApp Pre-Order Button (Pill) */}
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello KGF Bakehouse! 🥖 I would like to place a fresh bakery pre-order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-all hover:scale-105 shadow-sm"
            >
              <span>WhatsApp Pre-Order</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center p-1.5 sm:p-2 rounded-full text-[#2E1D16] hover:bg-[#2E1D16]/5 transition-colors touch-manipulation cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-x-3 top-20 z-50 bg-[#FDF9F3] rounded-3xl shadow-2xl border border-[#2E1D16]/15 p-5 flex flex-col gap-3.5 lg:hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2E1D16]/10">
              <span className="font-serif font-bold text-base text-[#2E1D16]">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full hover:bg-black/5 touch-manipulation cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5 text-[#2E1D16]" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-base font-serif font-bold text-[#2E1D16] hover:text-[#C4733A] py-2 px-2 rounded-xl hover:bg-[#F3E3D3]/50 transition-colors min-h-[44px] flex items-center touch-manipulation"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello KGF Bakehouse! 🥖 I would like to place a fresh bakery pre-order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md min-h-[48px] touch-manipulation"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

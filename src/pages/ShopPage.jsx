import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Phone, Check, ArrowRight } from 'lucide-react'
import FlowerProductCard from '../components/FlowerProductCard.jsx'
import FlowerHeading from '../components/FlowerHeading.jsx'
import { useCart } from '../context/CartContext.jsx'
import {
  BUSINESS_INFO,
  MENU_CATEGORIES,
  PRODUCTS,
  INGREDIENTS_STRING,
  createWhatsAppOrderLink
} from '../data/products.js'

export default function ShopPage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [addedItemMap, setAddedItemMap] = useState({})

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }))
    }, 1500)
  }

  const scrollToCategory = (catId) => {
    setActiveCategory(catId)
    if (catId === 'all') {
      window.scrollTo({ top: 400, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(`cat-${catId}`)
    if (el) {
      const yOffset = -90
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Group products by category
  const categorizedProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return MENU_CATEGORIES.map((cat) => {
      const items = PRODUCTS.filter((p) => {
        const matchesCategory = p.category === cat.id
        const matchesQuery =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        return matchesCategory && matchesQuery
      })
      return {
        ...cat,
        items
      }
    }).filter((cat) => cat.items.length > 0)
  }, [searchQuery])

  return (
    <div className="w-full bg-[#FDF9F3] text-[#2E1D16] min-h-screen pb-36 selection:bg-[#C4733A] selection:text-white">
      {/* ══════════════════════════════════════════════════════
          1. DARK ESPRESSO HERO SECTION (Design System Contrast)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#2E1D16] text-[#FDF9F3] py-10 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        {/* Ambient Warm Blur Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C4733A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#7D8C6F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-[#F3E3D3] uppercase tracking-wider">
            100% Celiac Safe • Dedicated Wheat-Free Kitchen
          </div>

          <h1 className="font-serif text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FDF9F3] flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-[#C4733A] text-xl sm:text-4xl select-none">🌾</span>
            <span>Our Artisan Menu</span>
            <span className="text-[#C4733A] text-xl sm:text-4xl select-none">🌾</span>
          </h1>

          <p className="text-xs sm:text-base text-[#FDF9F3]/80 max-w-2xl mx-auto leading-relaxed">
            Freshly prepared to order in Whitefield, Bengaluru. Made with certified alternative grains, pure butter, and zero wheat exposure.
          </p>

          {/* Search Bar */}
          <div className="pt-2 sm:pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#FDF9F3]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cookies, muffins, pizzas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-[#FDF9F3] placeholder-white/40 focus:outline-none focus:border-[#C4733A] focus:bg-white/15 transition-all shadow-inner min-h-[44px]"
            />
          </div>

          {/* Category Quick Navigation Chips - Horizontal Swipe on Mobile */}
          <div className="pt-2 sm:pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-4 -mx-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
            <button
              onClick={() => scrollToCategory('all')}
              className={`px-4 py-2 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center justify-center flex-shrink-0 touch-manipulation ${
                activeCategory === 'all'
                  ? 'bg-[#C4733A] text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-[#FDF9F3]/85'
              }`}
            >
              All Items
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`px-4 py-2 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center justify-center flex-shrink-0 touch-manipulation ${
                  activeCategory === cat.id
                    ? 'bg-[#C4733A] text-white shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-[#FDF9F3]/85'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. MENU SECTIONS: ORGANIC SHAPES WITH CRUMB PATTERN PERSONALITY
      ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bakery-crumb-pattern">
        {/* Soft Blurred Pastel Blobs in Corners (Static Warmth) */}
        <div className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-[#F3E3D3]/65 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-[#EAEFE6]/55 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-12 w-[30rem] h-[30rem] rounded-full bg-[#F3E3D3]/50 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        {categorizedProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-serif text-2xl font-bold text-[#2E1D16]">
              No menu items match "{searchQuery}"
            </h3>
            <p className="text-xs text-[#2E1D16]/65 mt-2 mb-6">
              Please check your spelling or clear your search to explore all categories.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2.5 rounded-full bg-[#C4733A] text-white text-xs font-semibold cursor-pointer shadow-md"
            >
              Clear Search
            </button>
          </div>
        ) : (
          categorizedProducts.map((category, catIdx) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="mb-24 scroll-mt-24"
            >
              {/* Category Heading with 5-Petal Flower Decoration */}
              <FlowerHeading title={category.name} />

              {/* Product Grid: Perfectly Aligned 8-Petal Scalloped Flower Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-6 lg:gap-10">
                {category.items.map((prod, itemIdx) => {
                  const isAdded = !!addedItemMap[prod.id]
                  return (
                    <FlowerProductCard
                      key={prod.id}
                      prod={prod}
                      idx={itemIdx}
                      onAddToCart={handleAddToCart}
                      isAdded={isAdded}
                    />
                  )
                })}
              </div>

              {/* Subtle divider between categories */}
              {catIdx < categorizedProducts.length - 1 && (
                <div className="w-24 h-px bg-[#2E1D16]/10 mx-auto mt-16 sm:mt-20" />
              )}
            </section>
          ))
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          3. DEDICATED DARK ESPRESSO CONTRAST SECTION (Baking Craft)
      ══════════════════════════════════════════════════════ */}
      <section className="my-12 sm:my-16 bg-[#2E1D16] text-[#FDF9F3] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#94A485]">
            Strict Allergen Protocol
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FDF9F3]">
            "We Bake What We Eat Every Day."
          </h2>
          <p className="text-xs sm:text-sm text-[#FDF9F3]/80 leading-relaxed max-w-2xl mx-auto">
            Founder-led with 13+ years living with severe Celiac disease. Our tools, pans, and ovens are dedicated 100% to certified gluten-free flours. No cross-contamination, ever.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello KGF Bakehouse! 🥖 I would like to ask about custom bakes or allergens.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C4733A] hover:bg-[#AF622C] text-white text-xs font-semibold shadow-md transition-all hover:scale-105 min-h-[48px] touch-manipulation"
            >
              <span>Ask the Baker on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. INGREDIENTS TRANSPARENCY STRIP (Cream/Beige Bar)
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-10">
        <div className="p-4 sm:p-6 rounded-2xl bg-[#F8EFE4] border border-[#2E1D16]/10 text-center shadow-sm">
          <div className="text-xs font-bold text-[#C4733A] uppercase tracking-wider mb-1 sm:mb-1.5">
            Transparent Ingredient Sourcing
          </div>
          <p className="text-xs sm:text-sm text-[#2E1D16]/85 font-medium leading-relaxed max-w-4xl mx-auto">
            <span className="font-serif font-bold text-[#2E1D16]">Ingredients: </span>
            {INGREDIENTS_STRING}
          </p>
        </div>
      </div>
    </div>

      {/* ══════════════════════════════════════════════════════
          5. FLOATING PILL: PRE ORDER (Self Pickup)
      ══════════════════════════════════════════════════════ */}
      <aside aria-label="Pre-Order Pickup Banner" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw]">
        <a
          href={`tel:+918073879160`}
          className="flex items-center justify-center gap-2 px-4 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#C4733A] hover:bg-[#AF622C] text-white font-serif font-bold text-xs sm:text-sm shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 whitespace-nowrap cursor-pointer touch-manipulation min-h-[48px]"
          title="Direct Pre-Order Call for Self Pickup"
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white flex-shrink-0" />
          <span className="sm:hidden">Pre Order: 8073879160</span>
          <span className="hidden sm:inline">Pre Order @ 8073879160 (Self Pickup)</span>
        </a>
      </aside>
    </div>
  )
}

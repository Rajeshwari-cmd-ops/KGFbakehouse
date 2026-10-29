import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * BestsellerMuffinCard — Dedicated Muffin/Cupcake Silhouette Card for Weekly Bestsellers
 * - Distinct puffy dome + pleated cupcake wrapper clip shape
 * - Soft offset blush #F3E3D3 liner shadow behind the muffin
 * - Tilted terracotta "Bestseller" ribbon badge on corner
 * - Soft blush rounded background card container
 * - Staggered bounce-in scroll reveal
 * - Gentle jelly wobble and lift on hover
 * - One-time pulse on price pill appearance
 * - "🔥 Popular this week" mini-text badge above item name
 * - Preserves Add to Cart squish + floating heart
 */
export default function BestsellerMuffinCard({
  prod,
  idx = 0,
  onAddToCart,
  isAdded = false,
}) {
  const [showHeart, setShowHeart] = useState(false)

  const handleAddClick = (e) => {
    e.stopPropagation()
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 850)

    if (onAddToCart) {
      onAddToCart(prod, e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 28 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 14,
        delay: idx * 0.05,
      }}
      className="group relative bg-[#FAF1E8] hover:bg-[#F7EBE0] border border-[#E8D5C4]/90 rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300 select-none w-full"
    >
      {/* Muffin / Cup Shape Container */}
      <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 mx-auto flex items-center justify-center my-1">
        {/* Tilted Terracotta Bestseller Ribbon Badge */}
        <div className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 z-20 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#C4733A] text-white font-bold text-[8px] sm:text-[10px] tracking-wider uppercase shadow-md -rotate-12 border border-white/50">
            ★ Bestseller
          </span>
        </div>

        {/* Soft Offset Silhouette in Blush #F3E3D3 (Cupcake Liner Shadow) */}
        <div
          className="absolute inset-[-3px] sm:inset-[-6px] bg-[#F3E3D3] transition-transform duration-500 pointer-events-none"
          style={{
            clipPath: 'url(#bestseller-muffin-clip)',
            WebkitClipPath: 'url(#bestseller-muffin-clip)',
            transform: 'translate(4px, 5px) rotate(2deg)',
          }}
          aria-hidden="true"
        />

        {/* Foreground Muffin-Clipped Food Image with Gentle Jelly Wobble on Hover */}
        <motion.div
          whileHover={{
            y: -7,
            rotate: [0, -3.5, 3.5, -2, 1, 0],
            scale: 1.03,
            transition: {
              duration: 0.65,
              ease: 'easeInOut',
            },
          }}
          className="relative w-full h-full block cursor-pointer"
        >
          <Link
            to={`/product/${prod.id}`}
            className="w-full h-full block"
            style={{
              clipPath: 'url(#bestseller-muffin-clip)',
              WebkitClipPath: 'url(#bestseller-muffin-clip)',
            }}
            title={`View ${prod.name}`}
          >
            <img
              src={prod.image}
              alt={prod.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />

            {/* Soft Warm Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </Link>
        </motion.div>
      </div>

      {/* Card Body Details */}
      <div className="mt-2.5 sm:mt-3 flex flex-col items-center w-full flex-1 justify-between">
        <div className="flex flex-col items-center w-full">
          {/* Mini-Badge: "🔥 Popular this week" */}
          <div className="inline-flex items-center justify-center gap-1 text-[9px] sm:text-[11px] font-semibold text-[#C4733A] mb-0.5 sm:mb-1 tracking-tight">
            <span>🔥 Popular this week</span>
          </div>

          {/* Product Title in Playfair Display */}
          <Link
            to={`/product/${prod.id}`}
            className="hover:text-[#C4733A] transition-colors"
          >
            <h3 className="font-serif font-bold text-xs sm:text-base text-[#2E1D16] leading-snug line-clamp-1">
              {prod.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-[10px] sm:text-xs text-[#2E1D16]/75 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed min-h-[1.75rem] sm:min-h-[2rem]">
            {prod.description}
          </p>
        </div>

        {/* Price Terracotta Pill with Pulse Animation + Add to Cart */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-1.5 sm:gap-2 relative w-full pt-1">
          {/* Price Pill: Single Gentle Pulse Once on Appearance */}
          <motion.span
            initial={{ scale: 0.75, opacity: 0 }}
            whileInView={{
              scale: [0.75, 1.15, 1],
              opacity: 1,
            }}
            animate={{
              scale: [0.75, 1.15, 1],
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: idx * 0.12 + 0.35,
              ease: 'easeOut',
            }}
            className="px-2.5 sm:px-3.5 py-1 rounded-full bg-[#C4733A] text-white font-bold text-[11px] sm:text-xs shadow-sm tracking-wide"
          >
            {prod.priceDisplay || `₹${prod.price}`}
          </motion.span>

          {/* Add to Cart Button Container (44px min touch target) */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAddClick}
              title={`Add ${prod.name} to pre-order basket`}
              aria-label={`Add ${prod.name} to basket`}
              className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm cursor-pointer touch-manipulation ${
                isAdded
                  ? 'bg-[#7D8C6F] text-white'
                  : 'bg-[#2E1D16] hover:bg-[#C4733A] text-white'
              }`}
            >
              {isAdded ? (
                <Check className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.button>

            {/* Single Floating Heart Animation on Add to Cart */}
            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: -34,
                    scale: [0.6, 1.25, 1],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none text-[#C4733A] z-20 flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 fill-[#C4733A] text-[#C4733A] drop-shadow-sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

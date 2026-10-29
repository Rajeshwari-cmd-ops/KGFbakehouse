import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * FlowerProductCard — Signature 8-Petal Scalloped Flower Shape
 * - One signature shape across the entire menu
 * - Subtle offset blush doily silhouette behind the image
 * - Bloom animation on scroll-in (scale 0.6 -> 1.0, slight rotate)
 * - Gentle hover rotation (~10deg) and scale (1.05)
 * - Price pill pop-in
 * - Add to Cart squish + single floating heart fade
 */
export default function FlowerProductCard({
  prod,
  idx = 0,
  onAddToCart,
  isAdded = false,
}) {
  const [showHeart, setShowHeart] = useState(false)

  const handleAddClick = (e) => {
    e.stopPropagation()
    // Trigger floating heart
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 850)

    if (onAddToCart) {
      onAddToCart(prod, e)
    }
  }

  // Staggered bloom delay (100ms per item)
  const bloomDelay = (idx % 6) * 0.1

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: bloomDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col items-center text-center select-none"
    >
      {/* 8-Petal Flower Container with Blush Paper Doily Silhouette */}
      <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto flex items-center justify-center">
        {/* Subtle Offset Flower Silhouette in Soft Blush #F3E3D3 (Like a paper doily under the cookie) */}
        <div
          className="absolute inset-[-3px] sm:inset-[-6px] bg-[#F3E3D3] transition-transform duration-500 ease-out group-hover:rotate-[-4deg] group-hover:scale-102 pointer-events-none"
          style={{
            clipPath: 'url(#flower-scallop-clip)',
            WebkitClipPath: 'url(#flower-scallop-clip)',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        />

        {/* Foreground 8-Petal Scalloped Food Image */}
        <Link
          to={`/product/${prod.id}`}
          className="relative w-full h-full block cursor-pointer transition-transform duration-400 ease-out group-hover:rotate-[10deg] group-hover:scale-105"
          style={{
            clipPath: 'url(#flower-scallop-clip)',
            WebkitClipPath: 'url(#flower-scallop-clip)',
          }}
          title={`View ${prod.name}`}
        >
          <img
            src={prod.image}
            alt={prod.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gentle warm ambient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
        </Link>
      </div>

      {/* Product Information: Perfectly Aligned & Centered Below */}
      <div className="mt-2.5 sm:mt-3.5 flex flex-col items-center max-w-[170px] sm:max-w-[210px] w-full">
        {/* Product Title in Playfair */}
        <Link
          to={`/product/${prod.id}`}
          className="hover:text-[#C4733A] transition-colors"
        >
          <h3 className="font-serif font-bold text-xs sm:text-base text-[#2E1D16] leading-snug line-clamp-1">
            {prod.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-[10px] sm:text-xs text-[#2E1D16]/70 mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed min-h-[1.75rem] sm:min-h-[2rem]">
          {prod.description}
        </p>

        {/* Price Terracotta Pill + Add to Cart with Squish & Floating Heart */}
        <div className="mt-2 flex items-center justify-center gap-1.5 sm:gap-2 relative">
          {/* Price Pill: tiny pop-in animation */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: bloomDelay + 0.15 }}
            className="px-2.5 py-1 rounded-full bg-[#C4733A] text-white font-bold text-[11px] sm:text-xs shadow-sm tracking-wide"
          >
            {prod.priceDisplay || `₹${prod.price}`}
          </motion.span>

          {/* Add to Cart Button Container (44px min touch target area) */}
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

            {/* Single Floating Heart on Add to Cart */}
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

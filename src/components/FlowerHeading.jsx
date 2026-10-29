import React from 'react'
import { motion } from 'framer-motion'

/**
 * FlowerHeading — Bakery-Themed Section Heading
 * Features Playfair typography, terracotta squiggle underline,
 * a small 5-petal flower icon, and a single slow-falling petal.
 */
export default function FlowerHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  showSparkle = false,
}) {
  const isCenter = align === 'center'

  return (
    <div
      className={`relative mb-12 sm:mb-16 ${
        isCenter ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div className="text-xs uppercase tracking-widest font-semibold text-[#7D8C6F] mb-1.5 flex items-center justify-center gap-1.5">
          <span>{eyebrow}</span>
        </div>
      )}

      <div className={`flex items-center gap-2.5 sm:gap-3.5 mb-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        {/* Left Cute Flower */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C4733A] text-[#C4733A] opacity-85 flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2a3 3 0 0 0-3 3c0 .3.05.6.14.86A3 3 0 0 0 6 9a3 3 0 0 0 .86 2.14A3 3 0 0 0 6 15a3 3 0 0 0 3.14 2.86A3 3 0 0 0 12 22a3 3 0 0 0 2.86-4.14A3 3 0 0 0 18 15a3 3 0 0 0-.86-3.86A3 3 0 0 0 18 9a3 3 0 0 0-3.14-2.86A3 3 0 0 0 12 2zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        </svg>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2E1D16] tracking-tight">
          {title}
        </h2>

        {/* Right Cute Flower */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C4733A] text-[#C4733A] opacity-85 flex-shrink-0"
          aria-hidden="true"
        >
          <path d="M12 2a3 3 0 0 0-3 3c0 .3.05.6.14.86A3 3 0 0 0 6 9a3 3 0 0 0 .86 2.14A3 3 0 0 0 6 15a3 3 0 0 0 3.14 2.86A3 3 0 0 0 12 22a3 3 0 0 0 2.86-4.14A3 3 0 0 0 18 15a3 3 0 0 0-.86-3.86A3 3 0 0 0 18 9a3 3 0 0 0-3.14-2.86A3 3 0 0 0 12 2zm0 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
        </svg>
      </div>

      {/* Squiggle Underline + 5-Petal Flower Decoration */}
      <div
        className={`flex items-center gap-2 mt-3 relative ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        <svg
          className="w-24 sm:w-32 h-3 text-[#C4733A]"
          viewBox="0 0 140 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 9C20 3 35 11 52 6C69 1 85 10 102 5C119 1 130 8 138 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

          {/* Static 5-Petal Little Bakery Flower Icon */}
          <div className="relative w-5 h-5 flex items-center justify-center text-[#C4733A]">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-[#C4733A] opacity-90"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 5 rounded petals */}
              <circle cx="12" cy="5.5" r="3.2" />
              <circle cx="18.2" cy="10" r="3.2" />
              <circle cx="15.8" cy="17.2" r="3.2" />
              <circle cx="8.2" cy="17.2" r="3.2" />
              <circle cx="5.8" cy="10" r="3.2" />
              {/* Center dot in soft cream */}
              <circle cx="12" cy="12" r="2.2" fill="#FDF9F3" />
            </svg>
          </div>

          {/* Tiny Sparkle Animation Next to Squiggle Underline (Subtle Twinkle, Slow) */}
          {showSparkle && (
            <motion.div
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.75, 1.25, 0.75],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-[#C4733A] ml-1 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-[#C4733A]"
              >
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </motion.div>
          )}
        </div>

      {subtitle && (
        <p className="text-xs sm:text-sm text-[#2E1D16]/75 max-w-2xl mx-auto mt-3 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

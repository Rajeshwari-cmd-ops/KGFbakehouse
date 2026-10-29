import React from 'react'

/**
 * KGF Bakehouse Official Vector Logo
 * Precise recreation based directly on the official brand reference badge (Image 2):
 * - Terracotta / warm caramel rounded badge (#C4733A)
 * - Baker's hat / house icon with double-contour line
 * - 4 rounded square window panes (2x2) inside the bread-house base
 * - Circular wheat-free emblem on right puff with authentic wheat stalk, grains, and slash
 * - Bold geometric "KGF"
 * - Clean uppercase "KAUR'S GLUTEN FREE"
 * - Heavy block "BAKEHOUSE"
 *
 * Supports:
 * - variant="badge" (default): authentic terracotta badge background with dark espresso icon and text
 * - variant="clean": transparent background using currentColor (for dark footer or monochrome usage)
 */
export default function Logo({
  className = 'h-9 sm:h-10 w-auto',
  variant = 'badge',
  iconOnly = false,
  style = {},
}) {
  const isBadge = variant === 'badge'
  const textColor = isBadge ? '#26160F' : 'currentColor'
  const iconStroke = isBadge ? '#26160F' : 'currentColor'

  if (iconOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 76 76"
        fill="none"
        className={className}
        style={{ display: 'inline-block', ...style }}
        aria-label="KGF Bakehouse Icon"
      >
        {isBadge && (
          <rect width="76" height="76" rx="15" fill="#C4733A" />
        )}
        <g stroke={iconStroke} strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Baker's Hat / House Contour */}
          <path
            d="M 17 63 
               L 55 63 
               C 59 63 62 60 62 56 
               L 62 43 
               C 62 39 65 36 69 33 
               C 73 30 72 24 68 20 
               C 64 17 58 17 54 20 
               C 50 13 41 10 34 12 
               C 26 14 22 20 21 26 
               C 14 24 7 28 6 35 
               C 4 42 9 45 13 45 
               L 13 56 
               C 13 60 15 63 17 63 Z"
            strokeWidth="3.2"
            fill="none"
          />

          {/* Inner Contour */}
          <path
            d="M 21 58 
               L 51 58 
               C 54 58 56 56 56 53 
               L 56 44 
               M 18 44 
               L 18 53 
               C 18 56 20 58 21 58"
            strokeWidth="2.2"
            fill="none"
          />

          {/* 4 Rounded Window Panes (2x2) */}
          <rect x="27.5" y="47" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />
          <rect x="35" y="47" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />
          <rect x="27.5" y="54" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />
          <rect x="35" y="54" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />

          {/* Circular Wheat-Free Ring on Right Puff */}
          <circle cx="55" cy="30" r="9.5" strokeWidth="2.2" fill="none" />

          {/* Wheat Stalk stem */}
          <path d="M 49 36 L 61 24" strokeWidth="1.8" />
          {/* Wheat Grains / Husks along the stem */}
          <path d="M 50.5 34 C 49 32.5 49 30.5 50.5 29.5 C 51.5 30.5 52.5 32.5 50.5 34 Z" fill={textColor} stroke="none" />
          <path d="M 52 35 C 53.5 34 54.5 33 54.5 31 C 53.5 31 52.5 33 52 35 Z" fill={textColor} stroke="none" />
          <path d="M 53.5 31 C 52 29.5 52 27.5 53.5 26.5 C 54.5 27.5 55.5 29.5 53.5 31 Z" fill={textColor} stroke="none" />
          <path d="M 55 32 C 56.5 31 57.5 30 57.5 28 C 56.5 28 55.5 30 55 32 Z" fill={textColor} stroke="none" />
          <path d="M 57 27.5 C 56 26.5 56 25 57 24 C 57.8 24.8 58.5 26.5 57 27.5 Z" fill={textColor} stroke="none" />
          <path d="M 58.5 28.5 C 59.5 27.8 60.5 27 60 25.5 C 59 26 58.5 27.5 58.5 28.5 Z" fill={textColor} stroke="none" />

          {/* Gluten-Free Crossed Slash bar */}
          <path d="M 47 24.5 L 63 35.5" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 255 76"
      fill="none"
      className={className}
      style={{ display: 'inline-block', ...style }}
      aria-label="KGF Bakehouse Logo"
    >
      {/* Terracotta Badge Background (Image 2 Reference) */}
      {isBadge && (
        <rect width="255" height="76" rx="14" fill="#C4733A" />
      )}

      {/* Baker's Hat / House Outline Icon */}
      <g stroke={iconStroke} strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Contour */}
        <path
          d="M 17 63 
             L 55 63 
             C 59 63 62 60 62 56 
             L 62 43 
             C 62 39 65 36 69 33 
             C 73 30 72 24 68 20 
             C 64 17 58 17 54 20 
             C 50 13 41 10 34 12 
             C 26 14 22 20 21 26 
             C 14 24 7 28 6 35 
             C 4 42 9 45 13 45 
             L 13 56 
             C 13 60 15 63 17 63 Z"
          strokeWidth="3.2"
          fill="none"
        />

        {/* Inner Contour */}
        <path
          d="M 21 58 
             L 51 58 
             C 54 58 56 56 56 53 
             L 56 44 
             M 18 44 
             L 18 53 
             C 18 56 20 58 21 58"
          strokeWidth="2.2"
          fill="none"
        />

        {/* 4 Rounded Window Panes (2x2) */}
        <rect x="27.5" y="47" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />
        <rect x="35" y="47" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />
        <rect x="27.5" y="54" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />
        <rect x="35" y="54" width="5" height="5" rx="1.2" fill={textColor} stroke="none" />

        {/* Circular Wheat-Free Ring on Right Puff */}
        <circle cx="55" cy="30" r="9.5" strokeWidth="2.2" fill="none" />

        {/* Wheat Stalk stem */}
        <path d="M 49 36 L 61 24" strokeWidth="1.8" />
        {/* Wheat Grains / Husks along the stem */}
        <path d="M 50.5 34 C 49 32.5 49 30.5 50.5 29.5 C 51.5 30.5 52.5 32.5 50.5 34 Z" fill={textColor} stroke="none" />
        <path d="M 52 35 C 53.5 34 54.5 33 54.5 31 C 53.5 31 52.5 33 52 35 Z" fill={textColor} stroke="none" />
        <path d="M 53.5 31 C 52 29.5 52 27.5 53.5 26.5 C 54.5 27.5 55.5 29.5 53.5 31 Z" fill={textColor} stroke="none" />
        <path d="M 55 32 C 56.5 31 57.5 30 57.5 28 C 56.5 28 55.5 30 55 32 Z" fill={textColor} stroke="none" />
        <path d="M 57 27.5 C 56 26.5 56 25 57 24 C 57.8 24.8 58.5 26.5 57 27.5 Z" fill={textColor} stroke="none" />
        <path d="M 58.5 28.5 C 59.5 27.8 60.5 27 60 25.5 C 59 26 58.5 27.5 58.5 28.5 Z" fill={textColor} stroke="none" />

        {/* Gluten-Free Crossed Slash bar */}
        <path d="M 47 24.5 L 63 35.5" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Typography — Exact Layout & Proportions from Image 2 */}
      {/* 1. KGF — Large, Heavy Geometric Sans */}
      <text
        x="78"
        y="41"
        fontFamily="'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="40"
        fontWeight="900"
        fill={textColor}
        letterSpacing="-0.5"
      >
        KGF
      </text>

      {/* 2. KAUR'S GLUTEN FREE — Clean Uppercase Subtitle */}
      <text
        x="79"
        y="53.5"
        fontFamily="'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="8.4"
        fontWeight="800"
        fill={textColor}
        letterSpacing="1.2"
      >
        KAUR'S GLUTEN FREE
      </text>

      {/* 3. BAKEHOUSE — Heavy Block Brand Name */}
      <text
        x="79"
        y="67"
        fontFamily="'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="13.5"
        fontWeight="900"
        fill={textColor}
        letterSpacing="1.6"
      >
        BAKEHOUSE
      </text>
    </svg>
  )
}

import React from 'react'

/**
 * Universal 8-Petal Soft Scalloped Flower ClipPath
 * Scaled in objectBoundingBox (0 to 1) for seamless responsive scaling.
 * Rounded petals like a daisy cookie cutter or muffin cup liner.
 */
export default function FlowerDefs() {
  return (
    <svg width="0" height="0" className="sr-only absolute" aria-hidden="true">
      <defs>
        <clipPath id="flower-scallop-clip" clipPathUnits="objectBoundingBox">
          <path d="M 0.8234 0.3661 A 0.155 0.155 0 0 1 0.8234 0.6339 A 0.155 0.155 0 0 1 0.6339 0.8234 A 0.155 0.155 0 0 1 0.3661 0.8234 A 0.155 0.155 0 0 1 0.1766 0.6339 A 0.155 0.155 0 0 1 0.1766 0.3661 A 0.155 0.155 0 0 1 0.3661 0.1766 A 0.155 0.155 0 0 1 0.6339 0.1766 A 0.155 0.155 0 0 1 0.8234 0.3661 Z" />
        </clipPath>

        {/* 3-Muffin Silhouette for Hero Trio Cluster (Scalloped Muffin Dome + Flared Overhang + Tapered Wrapper Base) */}
        <clipPath id="muffin-scallop-clip" clipPathUnits="objectBoundingBox">
          <path d="M 0.2600 0.9375 C 0.2600 0.9667, 0.3250 0.9792, 0.5000 0.9792 C 0.6750 0.9792, 0.7400 0.9667, 0.7400 0.9375 L 0.8100 0.5625 C 0.8600 0.5625, 0.9400 0.5250, 0.9600 0.4500 C 0.9800 0.3667, 0.9100 0.2750, 0.8400 0.2250 C 0.8000 0.1333, 0.7000 0.0750, 0.6100 0.0750 C 0.5600 0.0500, 0.5000 0.0500, 0.5000 0.0500 C 0.5000 0.0500, 0.4400 0.0500, 0.3900 0.0750 C 0.3000 0.0750, 0.2000 0.1333, 0.1600 0.2250 C 0.0900 0.2750, 0.0200 0.3667, 0.0400 0.4500 C 0.0600 0.5250, 0.1400 0.5625, 0.1900 0.5625 Z" />
        </clipPath>

        {/* Dedicated Muffin / Cupcake Silhouette for Bestsellers (Puffy Dome Top + Pleated Cupcake Wrapper Base) */}
        <clipPath id="bestseller-muffin-clip" clipPathUnits="objectBoundingBox">
          <path d="M 0.27 0.94 C 0.33 0.965, 0.40 0.945, 0.50 0.965 C 0.60 0.945, 0.67 0.965, 0.73 0.94 L 0.82 0.57 C 0.88 0.57, 0.95 0.51, 0.97 0.43 C 0.99 0.34, 0.92 0.24, 0.84 0.19 C 0.79 0.09, 0.68 0.04, 0.50 0.04 C 0.32 0.04, 0.21 0.09, 0.16 0.19 C 0.08 0.24, 0.01 0.34, 0.03 0.43 C 0.05 0.51, 0.12 0.57, 0.18 0.57 Z" />
        </clipPath>

        <mask id="muffin-silhouette-mask" maskContentUnits="objectBoundingBox">
          <path fill="#ffffff" d="M 0.2600 0.9375 C 0.2600 0.9667, 0.3250 0.9792, 0.5000 0.9792 C 0.6750 0.9792, 0.7400 0.9667, 0.7400 0.9375 L 0.8100 0.5625 C 0.8600 0.5625, 0.9400 0.5250, 0.9600 0.4500 C 0.9800 0.3667, 0.9100 0.2750, 0.8400 0.2250 C 0.8000 0.1333, 0.7000 0.0750, 0.6100 0.0750 C 0.5600 0.0500, 0.5000 0.0500, 0.5000 0.0500 C 0.5000 0.0500, 0.4400 0.0500, 0.3900 0.0750 C 0.3000 0.0750, 0.2000 0.1333, 0.1600 0.2250 C 0.0900 0.2750, 0.0200 0.3667, 0.0400 0.4500 C 0.0600 0.5250, 0.1400 0.5625, 0.1900 0.5625 Z" />
        </mask>
      </defs>
    </svg>
  )
}

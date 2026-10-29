import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Plus,
  Eye,
  WheatOff,
  Sprout,
  Smile,
  Clock,
  CheckCircle,
  HeartHandshake,
  ChevronDown,
  MessageCircle,
  Check
} from 'lucide-react'
import Marquee from '../components/Marquee.jsx'
import FlowerProductCard from '../components/FlowerProductCard.jsx'
import BestsellerMuffinCard from '../components/BestsellerMuffinCard.jsx'
import FlowerHeading from '../components/FlowerHeading.jsx'
import GoogleReviewsSection from '../components/GoogleReviewsSection.jsx'
import { useCart } from '../context/CartContext.jsx'
import {
  BUSINESS_INFO,
  CATEGORIES,
  PRODUCTS,
  TRUST_PILLARS,
  CUSTOM_CAKES_SHOWCASE,
  FAQ_ITEMS,
  SAMPLE_REVIEWS,
  INSTAGRAM_GRID,
  createWhatsAppOrderLink,
} from '../data/products.js'

import heroSpreadImg from '../assets/hero_spread.jpg'
import storyBakerImg from '../assets/story_baker.jpg'
import loafImg from '../assets/prod_multigrain_bread.jpg'
import customCake1Img from '../assets/custom_cake_2.jpg'
import imgMuffins from '../assets/prod_cupcake.jpg'
import cookiesArtisanImg from '../assets/cookies_artisan.jpg'
import chocolateCakeImg from '../assets/custom_cake_1.jpg'
import muffinsBerryImg from '../assets/prod_muffins.jpg'
import heroBakeryImg from '../assets/hero_bakery.jpg'

// Floating Flour Particles Component for Hero (Boosted Visibility & Graceful Drift)
function FlourDustParticles() {
  const particles = [
    { id: 1, top: '10%', left: '8%', delay: '0s', duration: '7.5s', size: 'w-2 h-2', bg: 'bg-white/65' },
    { id: 2, top: '20%', left: '26%', delay: '1.5s', duration: '9s', size: 'w-1.5 h-1.5', bg: 'bg-white/55' },
    { id: 3, top: '6%', left: '48%', delay: '3.2s', duration: '8s', size: 'w-2.5 h-2.5', bg: 'bg-white/70' },
    { id: 4, top: '32%', left: '68%', delay: '0.8s', duration: '10s', size: 'w-2 h-2', bg: 'bg-white/60' },
    { id: 5, top: '52%', left: '14%', delay: '2.2s', duration: '7s', size: 'w-1.5 h-1.5', bg: 'bg-white/55' },
    { id: 6, top: '16%', left: '84%', delay: '4s', duration: '8.5s', size: 'w-2 h-2', bg: 'bg-white/65' },
    { id: 7, top: '65%', left: '55%', delay: '1.8s', duration: '9.5s', size: 'w-2.5 h-2.5', bg: 'bg-white/70' },
    { id: 8, top: '30%', left: '38%', delay: '3.5s', duration: '6.8s', size: 'w-1.5 h-1.5', bg: 'bg-white/55' },
    { id: 9, top: '45%', left: '90%', delay: '1s', duration: '8.2s', size: 'w-2 h-2', bg: 'bg-white/60' },
    { id: 10, top: '75%', left: '22%', delay: '4.2s', duration: '9.2s', size: 'w-2 h-2', bg: 'bg-white/55' },
    { id: 11, top: '4%', left: '34%', delay: '2.5s', duration: '7.2s', size: 'w-2.5 h-2.5', bg: 'bg-white/70' },
    { id: 12, top: '58%', left: '78%', delay: '0.5s', duration: '10.5s', size: 'w-1.5 h-1.5', bg: 'bg-white/55' },
    { id: 13, top: '80%', left: '44%', delay: '3s', duration: '8.8s', size: 'w-2 h-2', bg: 'bg-white/65' },
    { id: 14, top: '25%', left: '58%', delay: '4.8s', duration: '7.8s', size: 'w-2 h-2', bg: 'bg-white/55' },
    { id: 15, top: '70%', left: '4%', delay: '1.2s', duration: '9s', size: 'w-2.5 h-2.5', bg: 'bg-white/70' },
    { id: 16, top: '40%', left: '30%', delay: '3.8s', duration: '8.4s', size: 'w-1.5 h-1.5', bg: 'bg-white/60' },
    { id: 17, top: '85%', left: '88%', delay: '2.6s', duration: '9s', size: 'w-2 h-2', bg: 'bg-white/55' },
    { id: 18, top: '60%', left: '96%', delay: '4.5s', duration: '7.5s', size: 'w-1.5 h-1.5', bg: 'bg-white/60' },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute ${p.size} ${p.bg} rounded-full blur-[0.4px] shadow-sm`}
          style={{
            top: p.top,
            left: p.left,
            animation: `flourDrift ${p.duration} infinite ease-in-out`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

// Steam Wisps gently rising above hot bakery bread
function SteamWisps() {
  return (
    <div className="absolute -top-12 left-1/3 w-36 h-28 pointer-events-none z-20 flex justify-center items-end">
      {/* Wisp 1 */}
      <span
        className="w-4 h-16 bg-gradient-to-t from-white/30 via-white/20 to-transparent rounded-full blur-[4px] mx-1"
        style={{ animation: 'steamRise 4s infinite ease-out', animationDelay: '0s' }}
      />
      {/* Wisp 2 */}
      <span
        className="w-5 h-20 bg-gradient-to-t from-white/40 via-white/25 to-transparent rounded-full blur-[5px] mx-1"
        style={{ animation: 'steamRise 4.8s infinite ease-out', animationDelay: '1.2s' }}
      />
      {/* Wisp 3 */}
      <span
        className="w-3.5 h-14 bg-gradient-to-t from-white/30 via-white/15 to-transparent rounded-full blur-[3px] mx-1"
        style={{ animation: 'steamRise 4.2s infinite ease-out', animationDelay: '2.4s' }}
      />
    </div>
  )
}

// Floating Circular Food Image Marquee Strip
function FloatingBakeryTreatsMarquee() {
  const treats = [
    { name: 'Butter Cookies', img: PRODUCTS[0]?.image },
    { name: 'Blueberry Muffins', img: PRODUCTS[2]?.image },
    { name: 'Chocolate Waffle', img: PRODUCTS[5]?.image },
    { name: 'Glazed Donuts', img: PRODUCTS[6]?.image },
    { name: 'Marble Tea Cake', img: PRODUCTS[10]?.image },
    { name: 'Fudge Brownie', img: PRODUCTS[11]?.image },
    { name: 'Celebration Cake', img: PRODUCTS[12]?.image },
    { name: 'Burger Buns', img: PRODUCTS[13]?.image },
    { name: 'Rosemary Focaccia', img: PRODUCTS[18]?.image },
    { name: 'Samosas', img: PRODUCTS[19]?.image },
    { name: 'Margherita Pizza', img: PRODUCTS[25]?.image },
    { name: 'Besan Laddoos', img: PRODUCTS[32]?.image },
    { name: 'Kaju Katli', img: PRODUCTS[34]?.image },
  ]

  return (
    <div className="py-6 bg-[#FBF4ED] border-y border-[#2E1D16]/10 overflow-hidden relative group">
      <div className="flex animate-marquee-slow gap-8 items-center cursor-pointer">
        {[...treats, ...treats].map((treat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 flex-shrink-0 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#2E1D16]/5 shadow-sm transition-transform duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-inner border border-[#C4733A]/20">
              <img
                src={treat.img}
                alt={treat.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="font-serif font-bold text-xs text-[#2E1D16] whitespace-nowrap">
              {treat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Illustrated Bakery Treats for Weekly Bestsellers Section Only
function renderBakeryTreatSvg(type, size = 26) {
  switch (type) {
    case 'croissant':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <path
            d="M4 20 C 3 11, 13 5, 27 9 C 24 15, 22 23, 11 25 C 7 25, 4 22, 4 20 Z"
            fill="#C4733A"
          />
          <path d="M10 7 C 14 9, 18 13, 19 18" stroke="#FCE8D5" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6 13 C 11 15, 14 19, 15 23" stroke="#FCE8D5" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M16 8 C 20 11, 23 15, 24 19" stroke="#E2925B" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="27.5" cy="9.5" r="1.2" fill="#E2925B" />
        </svg>
      )
    case 'cupcake':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <path d="M9 18 L11 28 C 11 29, 12 30, 13 30 L19 30 C 20 30, 21 29, 21 28 L23 18 Z" fill="#E5B995" />
          <line x1="12.5" y1="18" x2="13.5" y2="30" stroke="#C4733A" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="16" y1="18" x2="16" y2="30" stroke="#C4733A" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="19.5" y1="18" x2="18.5" y2="30" stroke="#C4733A" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M6 18 C 6 12, 11 10, 16 10 C 21 10, 26 12, 26 18 C 26 19, 24.5 20, 23 19.5 C 21 19, 19.5 17.5, 16 17.5 C 12.5 17.5, 11 19, 9 19.5 C 7.5 20, 6 19, 6 18 Z"
            fill="#FFF7EE"
          />
          <path d="M10 15 C 13 12.5, 19 12.5, 22 15" stroke="#E8BD9A" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="16" cy="8" r="2.4" fill="#C4733A" />
          <path d="M16 6 C 17 4, 19 4, 20 5" stroke="#7D8C6F" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      )
    case 'chocolate':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <rect x="7" y="5" width="18" height="22" rx="3" fill="#2E1D16" />
          <rect x="9" y="7" width="6.5" height="8" rx="1.5" fill="#4B3024" />
          <rect x="16.5" y="7" width="6.5" height="8" rx="1.5" fill="#4B3024" />
          <rect x="9" y="17" width="6.5" height="8" rx="1.5" fill="#4B3024" />
          <rect x="16.5" y="17" width="6.5" height="8" rx="1.5" fill="#4B3024" />
          <path d="M10 8.5 H13.5" stroke="#684535" strokeWidth="1" strokeLinecap="round" />
          <path d="M17.5 8.5 H21" stroke="#684535" strokeWidth="1" strokeLinecap="round" />
        </svg>
      )
    case 'cookie':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <circle cx="16" cy="16" r="12" fill="#DFA36B" />
          <circle cx="12" cy="12" r="2" fill="#2E1D16" />
          <circle cx="20" cy="11.5" r="1.8" fill="#2E1D16" />
          <circle cx="16" cy="16.5" r="2.2" fill="#2E1D16" />
          <circle cx="11.5" cy="19.5" r="1.7" fill="#2E1D16" />
          <circle cx="20.5" cy="19.5" r="1.9" fill="#2E1D16" />
          <circle cx="7" cy="14" r="1.2" fill="#F5E8DC" />
        </svg>
      )
    case 'bread':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <path
            d="M5 20 C 4 13, 9 9, 16 9 C 23 9, 28 13, 27 20 C 27 22, 25 23, 23 23 L9 23 C 7 23, 5 22, 5 20 Z"
            fill="#C4733A"
          />
          <path d="M7 23 L25 23" stroke="#8E481A" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 13.5 L13 18.5" stroke="#FDEEE0" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14.5 12 L17.5 18" stroke="#FDEEE0" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M19 13.5 L22 18.5" stroke="#FDEEE0" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'donut':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <circle cx="16" cy="16" r="12" fill="#DFA36B" />
          <path
            d="M16 4 C 22.5 4, 28 9.5, 28 16 C 28 18, 26.5 19, 25 18 C 23 17, 21.5 18.5, 20 18.5 C 18.5 18.5, 17 17, 15 17 C 13.5 17, 12 18.5, 10 18 C 8.5 17.5, 7 19, 5 18 C 4 17.5, 4 16.8, 4 16 C 4 9.5, 9.5 4, 16 4 Z"
            fill="#E89B88"
          />
          <circle cx="16" cy="16" r="4.2" fill="#F8EAE0" />
          <line x1="10" y1="10" x2="12" y2="8.5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="20" y1="10" x2="22" y2="11.5" stroke="#2E1D16" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="19" y1="21" x2="21.5" y2="20" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="11" y1="21" x2="13" y2="22.5" stroke="#C4733A" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )
    case 'macaron':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="drop-shadow-sm select-none">
          <path d="M6 14 C 6 8.5, 11 7.5, 16 7.5 C 21 7.5, 26 8.5, 26 14 Z" fill="#ECA688" />
          <path d="M6 14 C 8 15.5, 24 15.5, 26 14" stroke="#C4733A" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5" />
          <rect x="7" y="14.5" width="18" height="3" rx="1.5" fill="#FFF9F2" />
          <path d="M6 18 C 8 16.5, 24 16.5, 26 18" stroke="#C4733A" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.5 1.5" />
          <path d="M6 18 C 6 23.5, 11 24.5, 16 24.5 C 21 24.5, 26 23.5, 26 18 Z" fill="#ECA688" />
        </svg>
      )
    default:
      return null
  }
}

// Falling Bakery Treats Component for Weekly Bestsellers Section Only
function FallingBakeryTreats() {
  const treats = [
    { id: 1, type: 'croissant', size: 28, left: '3%', duration: '11.5s', delay: '-2.5s', sway: 'treat-sway-1', mobile: true },
    { id: 2, type: 'cookie', size: 22, left: '11%', duration: '9.8s', delay: '-7.2s', sway: 'treat-sway-2', mobile: false },
    { id: 3, type: 'cupcake', size: 30, left: '19%', duration: '13.2s', delay: '-1.0s', sway: 'treat-sway-3', mobile: true },
    { id: 4, type: 'donut', size: 24, left: '27%', duration: '10.5s', delay: '-5.8s', sway: 'treat-sway-1', mobile: false },
    { id: 5, type: 'chocolate', size: 24, left: '36%', duration: '12.0s', delay: '-9.4s', sway: 'treat-sway-2', mobile: false },
    { id: 6, type: 'macaron', size: 20, left: '46%', duration: '11.0s', delay: '-3.3s', sway: 'treat-sway-3', mobile: true },
    { id: 7, type: 'bread', size: 32, left: '55%', duration: '13.8s', delay: '-8.1s', sway: 'treat-sway-1', mobile: false },
    { id: 8, type: 'cookie', size: 22, left: '64%', duration: '10.2s', delay: '-1.8s', sway: 'treat-sway-2', mobile: false },
    { id: 9, type: 'croissant', size: 26, left: '73%', duration: '12.6s', delay: '-6.5s', sway: 'treat-sway-3', mobile: true },
    { id: 10, type: 'cupcake', size: 28, left: '81%', duration: '9.4s', delay: '-4.2s', sway: 'treat-sway-1', mobile: false },
    { id: 11, type: 'donut', size: 24, left: '89%', duration: '11.8s', delay: '-10.6s', sway: 'treat-sway-2', mobile: true },
    { id: 12, type: 'macaron', size: 22, left: '95%', duration: '12.4s', delay: '-0.5s', sway: 'treat-sway-3', mobile: false },
    { id: 13, type: 'chocolate', size: 26, left: '97%', duration: '10.8s', delay: '-5.0s', sway: 'treat-sway-1', mobile: true },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {treats.map((item) => (
        <div
          key={item.id}
          className={`absolute ${item.mobile ? 'block' : 'hidden sm:block'}`}
          style={{
            left: item.left,
            animation: `treat-fall ${item.duration} linear infinite ${item.delay}`,
            willChange: 'top, opacity',
          }}
        >
          <div className={item.sway}>
            {renderBakeryTreatSvg(item.type, item.size)}
          </div>
        </div>
      ))}
    </div>
  )
}

// Faint Corner Florals for "Our Philosophy & Craft" Section Only
function FaintCornerFlorals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Top Left Botanical Sprig */}
      <svg
        className="absolute -top-2 -left-2 w-28 h-28 sm:w-44 sm:h-44 text-[#C4733A] opacity-25"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M10,110 C35,75 55,45 105,15" strokeLinecap="round" />
        <path d="M40,82 C30,70 32,55 45,58 C45,72 40,82 40,82 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M65,58 C55,46 58,32 70,36 C69,50 65,58 65,58 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M85,38 C80,22 92,15 100,24 C98,34 85,38 85,38 Z" fill="currentColor" fillOpacity="0.12" />
        <circle cx="106" cy="14" r="3" fill="currentColor" fillOpacity="0.3" />
        <path d="M25,95 C15,86 18,74 29,78" strokeLinecap="round" />
      </svg>

      {/* Top Right Botanical Bloom */}
      <svg
        className="absolute -top-2 -right-2 w-28 h-28 sm:w-44 sm:h-44 text-[#7D8C6F] opacity-25 transform scale-x-[-1]"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M15,110 C40,75 60,45 105,15" strokeLinecap="round" />
        <path d="M45,82 C35,70 38,55 50,58 C50,72 45,82 45,82 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M70,58 C60,46 63,32 75,36 C74,50 70,58 70,58 Z" fill="currentColor" fillOpacity="0.12" />
        <circle cx="106" cy="14" r="3.5" fill="currentColor" fillOpacity="0.3" />
        <path d="M88,40 C85,26 96,20 102,28" strokeLinecap="round" />
      </svg>

      {/* Bottom Left Botanical Leaf */}
      <svg
        className="absolute -bottom-2 -left-2 w-28 h-28 sm:w-44 sm:h-44 text-[#7D8C6F] opacity-25 transform scale-y-[-1]"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M15,110 C40,75 60,45 105,15" strokeLinecap="round" />
        <path d="M45,82 C35,70 38,55 50,58 C50,72 45,82 45,82 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M70,58 C60,46 63,32 75,36 C74,50 70,58 70,58 Z" fill="currentColor" fillOpacity="0.12" />
        <circle cx="106" cy="14" r="3" fill="currentColor" fillOpacity="0.3" />
      </svg>

      {/* Bottom Right Botanical Sprig */}
      <svg
        className="absolute -bottom-2 -right-2 w-28 h-28 sm:w-44 sm:h-44 text-[#C4733A] opacity-25 transform rotate-180"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M10,110 C35,75 55,45 105,15" strokeLinecap="round" />
        <path d="M40,82 C30,70 32,55 45,58 C45,72 40,82 40,82 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M65,58 C55,46 58,32 70,36 C69,50 65,58 65,58 Z" fill="currentColor" fillOpacity="0.12" />
        <path d="M85,38 C80,22 92,15 100,24 C98,34 85,38 85,38 Z" fill="currentColor" fillOpacity="0.12" />
        <circle cx="106" cy="14" r="3" fill="currentColor" fillOpacity="0.3" />
      </svg>
    </div>
  )
}

// Story Showcase: Collage Style with Big Scalloped Hero in Center & Scattered Floating Mini-Images
function StoryCollageShowcase() {
  return (
    <div className="relative py-2 px-1 max-w-lg mx-auto select-none">
      {/* ── DESKTOP COLLAGE (sm and up) ── */}
      <div className="hidden sm:block relative w-[370px] h-[370px] lg:w-[410px] lg:h-[390px] mx-auto">
        {/* Central Big Hero Wrapper */}
        <div className="absolute inset-0 m-auto w-64 h-64 lg:w-72 lg:h-72 z-10">
          {/* Soft Blush Offset Shadow Behind Big Scallop */}
          <div
            className="absolute inset-0 bg-[#F3D9C4] pointer-events-none rounded-full"
            style={{
              clipPath: 'url(#flower-scallop-clip)',
              WebkitClipPath: 'url(#flower-scallop-clip)',
              transform: 'rotate(5deg) scale(1.06)',
            }}
            aria-hidden="true"
          />

          {/* 1. BIG HERO IMAGE in center (Scalloped shape, slightly rotated) */}
          <motion.div
            whileHover={{ scale: 1.025, rotate: -1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full h-full shadow-xl -rotate-2 cursor-pointer z-10"
            style={{
              clipPath: 'url(#flower-scallop-clip)',
              WebkitClipPath: 'url(#flower-scallop-clip)',
            }}
          >
            <img
              src={storyBakerImg}
              alt="KGF Bakehouse master baker crafting artisan gluten-free sourdough"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Floating "Baked with Love 💛" Badge overlapping the big image bottom */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08, rotate: -6 }}
            className="absolute -bottom-2 -right-1 lg:-bottom-3 lg:right-1 bg-[#C4733A] text-white px-4 py-2 rounded-full shadow-2xl border-2 border-white text-xs font-bold -rotate-3 flex items-center gap-1.5 z-30 cursor-default"
          >
            <span>Baked with Love</span>
            <span className="text-amber-200">💛</span>
          </motion.div>
        </div>

        {/* 2. SMALL FLOATING IMAGE 1 (Belgian Dark Chocolate Cake) - Squircle Top-Left */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          whileHover={{ scale: 1.08 }}
          className="absolute -top-1 left-1 lg:-top-2 lg:left-2 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl shadow-lg border-2 border-white overflow-hidden z-20 -rotate-6 bg-[#FCF3EB]"
        >
          <img
            src={chocolateCakeImg}
            alt="Artisan Gluten-Free Chocolate Cake"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 3. SMALL FLOATING IMAGE 2 (Golden Butter Cookies) - Circle Bottom-Left */}
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
          whileHover={{ scale: 1.08 }}
          className="absolute -bottom-2 left-3 lg:-bottom-2 lg:left-5 w-18 h-18 lg:w-20 lg:h-20 rounded-full shadow-lg border-2 border-white overflow-hidden z-20 rotate-3 bg-[#FCF3EB]"
        >
          <img
            src={cookiesArtisanImg}
            alt="Handcrafted Gluten-Free Cookies"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 4. SMALL FLOATING IMAGE 3 (Fresh Berry Muffins) - Squircle Top-Right */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.6 }}
          whileHover={{ scale: 1.08 }}
          className="absolute top-2 -right-1 lg:top-1 lg:right-1 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl shadow-lg border-2 border-white overflow-hidden z-20 rotate-6 bg-[#FCF3EB]"
        >
          <img
            src={muffinsBerryImg}
            alt="Fresh Berry Muffins"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* ── MOBILE COLLAGE (stacks: big image top, smalls below) ── */}
      <div className="sm:hidden flex flex-col items-center">
        {/* Big Scalloped Center */}
        <div className="relative w-56 h-56 mx-auto">
          {/* Blush Offset Shadow */}
          <div
            className="absolute inset-0 bg-[#F3D9C4] pointer-events-none rounded-full"
            style={{
              clipPath: 'url(#flower-scallop-clip)',
              WebkitClipPath: 'url(#flower-scallop-clip)',
              transform: 'rotate(5deg) scale(1.05)',
            }}
            aria-hidden="true"
          />
          {/* Big Scalloped Image */}
          <div
            className="relative w-full h-full shadow-xl -rotate-2"
            style={{
              clipPath: 'url(#flower-scallop-clip)',
              WebkitClipPath: 'url(#flower-scallop-clip)',
            }}
          >
            <img
              src={storyBakerImg}
              alt="KGF Bakehouse master baker crafting artisan gluten-free sourdough"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating "Baked with Love 💛" Badge */}
          <div className="absolute -bottom-2 right-1 bg-[#C4733A] text-white px-3.5 py-1.5 rounded-full shadow-2xl border-2 border-white text-xs font-bold -rotate-3 flex items-center gap-1.5 z-20">
            <span>Baked with Love</span>
            <span className="text-amber-200">💛</span>
          </div>
        </div>

        {/* Small Floating Images Scattered in a Row Below */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {/* Small 1: Cake (Squircle) */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            className="w-16 h-16 rounded-2xl shadow-md border-2 border-white overflow-hidden -rotate-4 bg-[#FCF3EB]"
          >
            <img
              src={chocolateCakeImg}
              alt="Artisan Chocolate Cake"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Small 2: Cookies (Circle) */}
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
            className="w-16 h-16 rounded-full shadow-md border-2 border-white overflow-hidden rotate-2 bg-[#FCF3EB]"
          >
            <img
              src={cookiesArtisanImg}
              alt="Handcrafted Cookies"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Small 3: Muffins (Squircle) */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.6 }}
            className="w-16 h-16 rounded-2xl shadow-md border-2 border-white overflow-hidden rotate-4 bg-[#FCF3EB]"
          >
            <img
              src={muffinsBerryImg}
              alt="Fresh Muffins"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Crafted by 13-Year Celiac Baker Pill */}
      <div className="mt-4 sm:mt-6 text-center">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#7D8C6F]/15 text-[#7D8C6F] text-xs font-semibold border border-[#7D8C6F]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Crafted by a 13-Year Celiac Baker</span>
        </span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { addToCart } = useCart()
  const [openFaq, setOpenFaq] = useState(-1)
  const [storyExpanded, setStoryExpanded] = useState(false)
  const [addedItemMap, setAddedItemMap] = useState({})
  const [selectedHomeCategory, setSelectedHomeCategory] = useState('all')
  const [mobileShowAll, setMobileShowAll] = useState(false)

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'auto' })
        }
      }, 50)
    }
  }, [])

  const HOME_BAKE_TABS = [
    { id: 'all', label: 'All Bakes' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'cakes', label: 'Cakes' },
    { id: 'artisan-breads', label: 'Breads' },
    { id: 'breakfast', label: 'Waffles' },
    { id: 'muffins-cupcakes', label: 'Muffins' },
    { id: 'tasty-treats', label: 'Treats' },
    { id: 'sweet-indulgences', label: 'Sweets' },
  ]

  const filteredHomeProducts = React.useMemo(() => {
    if (selectedHomeCategory === 'all') return PRODUCTS
    return PRODUCTS.filter((p) => p.category === selectedHomeCategory)
  }, [selectedHomeCategory])

  const handleAddToCart = (product, event) => {
    addToCart(product, 1, event)
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }))
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }))
    }, 1500)
  }

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? -1 : idx)
  }

  // 4 bestsellers for the homepage
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4)

  const iconMap = {
    WheatOff: WheatOff,
    ShieldCheck: ShieldCheck,
    Sprout: Sprout,
    Smile: Smile,
    Clock: Clock,
    CheckCircle: CheckCircle,
    HeartHandshake: HeartHandshake,
  }

  const headlineWords = [
    { text: 'Goodness', highlight: false },
    { text: 'in', highlight: false },
    { text: 'Every', highlight: true },
    { text: 'Bite.', highlight: true, hasUnderline: true },
  ]

  return (
    <div className="w-full bg-[#FDF9F3] relative">
      {/* Subtle Home Page Character Pattern (Wheat & Cupcake faint wallpaper) */}
      <div className="absolute inset-0 home-wallpaper-pattern pointer-events-none -z-0 opacity-70" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════════
          1. HERO (Full-Screen Dark Espresso #2E1D16 with Living Bakery Motion)
      ══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-[90vh] lg:min-h-[720px] max-h-[840px] pt-16 pb-16 bg-gradient-to-b from-[#1E120D] via-[#2E1D16] to-[#251711] text-[#FDF9F3] flex items-center overflow-hidden"
      >
        {/* Subtle Floating Flour Dust Particles */}
        <FlourDustParticles />

        {/* Ambient Warm Radial Lighting Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#C4733A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#7D8C6F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column Content */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >


              {/* Word-by-Word Staggered Animated Headline — Clamped for Mobile Screen Sizes */}
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FDF9F3] leading-[1.12] sm:leading-[1.08] flex flex-wrap justify-center lg:justify-start gap-x-2.5 sm:gap-x-3.5 gap-y-1">
                {headlineWords.map((word, idx) => (
                  <span key={idx} className="relative inline-block overflow-visible">
                    <motion.span
                      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.55,
                        delay: idx * 0.15,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                      className={
                        word.highlight
                          ? 'italic font-normal text-[#C4733A]'
                          : 'text-[#FDF9F3]'
                      }
                    >
                      {word.text}
                    </motion.span>

                    {/* Terracotta underline that draws itself in under "Bite." like melted chocolate */}
                    {word.hasUnderline && (
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-[#C4733A] overflow-visible"
                        viewBox="0 0 100 12"
                        fill="none"
                      >
                        <motion.path
                          d="M2 8C26 2 52 11 98 4"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.75, duration: 0.95, ease: 'easeOut' }}
                        />
                      </svg>
                    )}
                  </span>
                ))}
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base md:text-lg text-[#FDF9F3]/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Safe, fresh, and deeply satisfying artisan gluten-free bakes — crafted with certified flours, real butter, and zero wheat exposure.
              </p>

              {/* Rounded-Full Action Buttons (min-h-[48px] touch targets on mobile) */}
              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-full bg-[#C4733A] text-white font-semibold text-xs sm:text-sm hover:bg-[#AF622C] transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  to="/custom-cakes"
                  className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-[#FDF9F3] border border-white/20 font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center text-center"
                >
                  Order Custom Cakes
                </Link>
              </div>

              {/* Direct WhatsApp helper */}
              <div className="pt-2 text-xs text-[#FDF9F3]/60 flex items-center justify-center lg:justify-start gap-2">
                <span>Direct inquiry or advice?</span>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Hello KGF Bakehouse! I would like to enquire about ordering gluten-free bakes.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: 3 Attached Muffin-Shaped Food Images (Trio Cluster) with Gentle Bobbing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Floating Steam Wisps Rising Above Center Muffin */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <SteamWisps />
                </div>

                {/* The 3 Muffin Cluster Container (Attached side by side, slightly overlapping, middle one bigger & front) */}
                <div className="relative flex items-end justify-center -space-x-4 sm:-space-x-8 md:-space-x-10 py-4 sm:py-6 px-1 select-none">
                  {/* 1. LEFT MUFFIN: Sourdough Bread */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    className="relative w-24 h-32 sm:w-38 sm:h-50 md:w-48 md:h-60 flex-shrink-0 cursor-pointer -rotate-3 z-10"
                    title="Seeded Artisan Sourdough"
                  >
                    {/* Subtle Scalloped Flower-Style Blush Outline */}
                    <div
                      className="absolute inset-[-3px] sm:inset-[-6px] bg-[#F3E3D3]/85 transition-transform duration-300 pointer-events-none"
                      style={{
                        clipPath: 'url(#muffin-scallop-clip)',
                        WebkitClipPath: 'url(#muffin-scallop-clip)',
                      }}
                      aria-hidden="true"
                    />
                    {/* Muffin Silhouette Clipped Food Image */}
                    <div
                      className="w-full h-full relative overflow-hidden shadow-2xl"
                      style={{
                        clipPath: 'url(#muffin-scallop-clip)',
                        WebkitClipPath: 'url(#muffin-scallop-clip)',
                      }}
                    >
                      <img
                        src={loafImg}
                        alt="Artisanal sourdough gluten-free bread"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* 2. CENTER MUFFIN: Belgian Chocolate Cake (Bigger & Front) */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    whileHover={{ scale: 1.05, zIndex: 35 }}
                    className="relative w-32 h-44 sm:w-48 sm:h-64 md:w-60 md:h-76 flex-shrink-0 cursor-pointer z-20 mb-1.5 sm:mb-4"
                    title="Belgian Chocolate Celebration Cake"
                  >
                    {/* Terracotta Scalloped Outline */}
                    <div
                      className="absolute inset-[-4px] sm:inset-[-7px] bg-[#C4733A] transition-transform duration-300 pointer-events-none"
                      style={{
                        clipPath: 'url(#muffin-scallop-clip)',
                        WebkitClipPath: 'url(#muffin-scallop-clip)',
                      }}
                      aria-hidden="true"
                    />
                    {/* Muffin Silhouette Clipped Food Image */}
                    <div
                      className="w-full h-full relative overflow-hidden shadow-2xl"
                      style={{
                        clipPath: 'url(#muffin-scallop-clip)',
                        WebkitClipPath: 'url(#muffin-scallop-clip)',
                      }}
                    >
                      <img
                        src={customCake1Img}
                        alt="Decadent gluten-free chocolate cake with berries"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* 3. RIGHT MUFFIN: Golden Muffin / Cupcake */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    className="relative w-24 h-32 sm:w-38 sm:h-50 md:w-48 md:h-60 flex-shrink-0 cursor-pointer rotate-3 z-10"
                    title="Fresh Gluten-Free Muffins"
                  >
                    {/* Subtle Scalloped Flower-Style Blush Outline */}
                    <div
                      className="absolute inset-[-3px] sm:inset-[-6px] bg-[#F3E3D3]/85 transition-transform duration-300 pointer-events-none"
                      style={{
                        clipPath: 'url(#muffin-scallop-clip)',
                        WebkitClipPath: 'url(#muffin-scallop-clip)',
                      }}
                      aria-hidden="true"
                    />
                    {/* Muffin Silhouette Clipped Food Image */}
                    <div
                      className="w-full h-full relative overflow-hidden shadow-2xl"
                      style={{
                        clipPath: 'url(#muffin-scallop-clip)',
                        WebkitClipPath: 'url(#muffin-scallop-clip)',
                      }}
                    >
                      <img
                        src={imgMuffins}
                        alt="Freshly baked gluten-free muffins and cupcakes"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Circular Bakery Sticker Stamp Badge ("100% Celiac Safe Kitchen") Overlapping Cluster */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -4 }}
                    className="absolute -bottom-3 left-0 sm:-bottom-6 sm:left-4 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#C4733A] text-white p-1 sm:p-2 shadow-2xl border-2 sm:border-4 border-dashed border-[#F3E3D3]/40 flex flex-col items-center justify-center text-center -rotate-12 cursor-default select-none z-30"
                  >
                    <div className="w-full h-full rounded-full border border-white/30 flex flex-col items-center justify-center p-0.5 sm:p-1">
                      <span className="text-[6px] sm:text-[8px] uppercase tracking-widest font-bold text-[#F3E3D3]">Certified</span>
                      <span className="font-serif font-black text-base sm:text-2xl leading-none my-0.5">100%</span>
                      <span className="text-[6px] sm:text-[8px] uppercase tracking-wider font-extrabold text-white leading-tight">Celiac Safe</span>
                      <span className="text-[5px] sm:text-[7px] text-[#F3E3D3]/85 uppercase">Kitchen</span>
                    </div>
                  </motion.div>


                </div>

                {/* Clean Caption Line Below Cluster (Moved cleanly below, no box overlay over images) */}
                <div className="mt-3 sm:mt-6 text-center">
                  <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 max-w-full">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse flex-shrink-0" />
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#FDF9F3] truncate">
                      Pure Indulgence. 0% Gluten.
                    </span>
                    <span className="text-white/40 hidden sm:inline">•</span>
                    <span className="text-[11px] sm:text-xs text-[#94A485] font-medium hidden sm:inline">
                      Belgian Chocolate Cakes • Seeded Sourdough • Almond Shortbread
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. SCROLLING MARQUEE STRIP (Speed-up on hover)
      ══════════════════════════════════════════════════════ */}
      <Marquee
        items={[
          '100% Gluten-Free',
          'Freshly Baked Daily',
          'Handcrafted with Love',
          'Dedicated Wheat-Free Kitchen',
          'Celiac Safe & Lab Tested',
          'Custom Celebration Cakes',
          'Zero Preservatives',
          'Whitefield Bengaluru Delivery',
        ]}
      />

      {/* ══════════════════════════════════════════════════════
          3. CUTE & CALM TRUST PILLAR CARDS (Soft Blush Squircle, Scalloped Trim & Floating Icon)
      ══════════════════════════════════════════════════════ */}
      <section id="trust-pillars" className="py-12 sm:py-20 bg-[#FDF9F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-6 sm:pt-8">
            {TRUST_PILLARS.map((pillar, idx) => {
              const IconComp = iconMap[pillar.icon] || ShieldCheck
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover="hover"
                  className="group relative flex flex-col items-center text-center px-5 sm:px-6 pt-9 sm:pt-10 pb-7 sm:pb-8 rounded-[2rem] sm:rounded-[2.2rem] bg-[#F3E3D3] border border-[#E7D2BF] shadow-[0_8px_24px_rgba(46,29,22,0.04)] hover:shadow-[0_14px_32px_rgba(46,29,22,0.09)] transition-all duration-300 hover:-translate-y-1.5 h-full select-none"
                >
                  {/* Cute Icon in a Circle on Top of Card (Does one soft bounce on hover) */}
                  <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      variants={{
                        hover: {
                          y: [0, -6, 0],
                          transition: { duration: 0.45, ease: 'easeInOut' }
                        }
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FDF9F3] text-[#C4733A] border-2 border-[#E7D2BF] shadow-md flex items-center justify-center transition-colors duration-300 group-hover:border-[#C4733A]/40 group-hover:shadow-lg"
                    >
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                    </motion.div>
                  </div>

                  {/* Soft Scalloped / Flower-Trim Top Accent */}
                  <div className="flex items-center justify-center gap-1.5 mb-3.5 opacity-65">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4733A]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4733A]" />
                    <span className="w-8 h-1 rounded-full bg-[#C4733A]/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C4733A]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4733A]" />
                  </div>

                  {/* Title in Editorial Playfair */}
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#2E1D16] tracking-tight mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Readable, Relaxed Description in Inter */}
                  <p className="text-xs sm:text-[13px] text-[#2E1D16]/80 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. FLOATING CIRCULAR BAKERY TREATS MARQUEE STRIP
      ══════════════════════════════════════════════════════ */}
      <FloatingBakeryTreatsMarquee />

      {/* ══════════════════════════════════════════════════════
          5. OUR BAKES (Direct Food Items with Subtle Wallpaper Background Charm)
      ══════════════════════════════════════════════════════ */}
      <section id="our-bakes" className="relative py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDF9F3] overflow-hidden">
        {/* Soft Blurred Pastel Blobs in Corners (Static Warmth, No Movement) */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#F3E3D3]/65 blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#EAEFE6]/60 blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-24 -left-12 w-[32rem] h-[32rem] rounded-full bg-[#F3E3D3]/55 blur-3xl pointer-events-none -z-0" />

        {/* Faint Subtle Repeating Wallpaper Pattern (Wheat, Cupcakes & Flowers at Low Opacity) */}
        <div className="absolute inset-0 bakery-wallpaper-pattern pointer-events-none -z-0 opacity-80" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FlowerHeading
            eyebrow="FRESHLY BAKED TO PRE-ORDER"
            title="Our Bakes"
            subtitle="Explore our handcrafted gluten-free bakery items — prepared in a dedicated wheat-free kitchen with certified organic flours and pure dairy butter."
          />

          {/* Filter Pills on Top - Horizontal Swipeable on Mobile, Wrapped on Desktop */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-4 -mx-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap mb-8 sm:mb-14">
            {HOME_BAKE_TABS.map((tab) => {
              const isActive = selectedHomeCategory === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedHomeCategory(tab.id)
                    setMobileShowAll(false)
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[44px] flex items-center justify-center flex-shrink-0 touch-manipulation ${
                    isActive
                      ? 'bg-[#C4733A] text-white shadow-md scale-105'
                      : 'bg-[#F3E3D3]/60 hover:bg-[#F3E3D3] text-[#2E1D16]/85 hover:scale-102'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Clean Aligned Grid of Flower-Shaped Food Items (2 items per row on mobile, compact layout) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-6 lg:gap-8">
            {filteredHomeProducts.map((prod, idx) => {
              const isHiddenOnMobile = !mobileShowAll && idx >= 6
              return (
                <div
                  key={prod.id}
                  className={isHiddenOnMobile ? 'hidden sm:block' : 'block'}
                >
                  <FlowerProductCard
                    prod={prod}
                    idx={idx}
                    onAddToCart={handleAddToCart}
                    isAdded={!!addedItemMap[prod.id]}
                  />
                </div>
              )
            })}
          </div>

          {/* Mobile "Show More" Button after first 6 items — Short & Browsable Mobile Scroll */}
          {filteredHomeProducts.length > 6 && (
            <div className="mt-8 text-center sm:hidden">
              <button
                onClick={() => setMobileShowAll(!mobileShowAll)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C4733A] text-white text-xs font-bold shadow-md hover:bg-[#b0632e] active:scale-95 transition-all touch-manipulation cursor-pointer"
              >
                <span>
                  {mobileShowAll
                    ? 'Show Less'
                    : `Show More (${filteredHomeProducts.length - 6} more)`}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileShowAll ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. WEEKLY BESTSELLERS (Lively Muffin-Shaped Cards with Blush Card Background & Wobble)
      ══════════════════════════════════════════════════════ */}
      <section id="bestsellers" className="py-12 sm:py-20 bestsellers-blush-band border-y border-[#2E1D16]/10 relative overflow-hidden">
        {/* Cute Falling Bakery Treats (Weekly Bestsellers Section Only) */}
        <FallingBakeryTreats />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FlowerHeading
            eyebrow="HANDCRAFTED FAVOURITES"
            title="Weekly Bestsellers"
            subtitle="Loved by Celiacs, kids, and food lovers alike. Order directly into your pre-order basket or message us on WhatsApp."
            showSparkle={true}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {bestsellers.map((prod, idx) => (
              <BestsellerMuffinCard
                key={prod.id}
                prod={prod}
                idx={idx}
                onAddToCart={handleAddToCart}
                isAdded={!!addedItemMap[prod.id]}
              />
            ))}
          </div>

          <div className="mt-10 sm:mt-14 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C4733A] text-white font-semibold text-xs sm:text-sm hover:bg-[#AF622C] transition-all hover:scale-105 active:scale-95 shadow-md w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <span className="sm:hidden">Explore Full Menu →</span>
              <span className="hidden sm:inline">Explore All 39 Bakery Items in Menu</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. BRAND STORY with Flower Scalloped Baker Image & Notebook Personality
      ══════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════
          7. BRAND STORY with Collage Layout, Word Fade-In & Squiggle Draw
      ══════════════════════════════════════════════════════ */}
      <section
        id="story"
        className="py-14 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#FCF3EB] via-[#F8EAE0] to-[#FAF1E8] border-y border-[#EED7C5]"
      >
        {/* Faint Florals in Corners (This Section Only) */}
        <FaintCornerFlorals />

        {/* Soft Blurred Ambient Glow Blobs in Corners */}
        <div className="absolute top-6 left-6 w-72 h-72 rounded-full bg-[#F3D9C4]/40 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-6 right-6 w-80 h-80 rounded-full bg-[#EAEFE6]/50 blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Column: Image Layout — Collage Style */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-5 relative"
            >
              <StoryCollageShowcase />
            </motion.div>

            {/* Right Column: Text Animations */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#C4733A]">
                    Our Philosophy & Craft
                  </span>
                  <span className="text-[#C4733A]/70">🌾✨</span>
                </motion.div>

                {/* Heading: Fade-in word by word (slow, smooth) on scroll-in */}
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#2E1D16] mt-1.5 leading-tight"
                >
                  {['"Because', 'Everyone', 'Deserves', 'Something', 'Delicious."'].map((word, idx) => (
                    <motion.span
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 14 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
                        },
                      }}
                      className="inline-block mr-[0.26em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h2>

                {/* Underline Squiggle Under Heading Draws Itself In (SVG stroke animation) */}
                <div className="mt-2 mb-2 w-52 sm:w-64 select-none" aria-hidden="true">
                  <svg viewBox="0 0 260 18" fill="none" className="w-full h-auto overflow-visible">
                    <motion.path
                      d="M3 11 C 45 4, 90 16, 130 10 C 170 4, 215 16, 256 10"
                      fill="transparent"
                      stroke="#C4733A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.25 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Lead Paragraph: Staggered Fade-Up */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="text-sm sm:text-base text-[#2E1D16]/80 leading-relaxed"
              >
                When our founder was diagnosed with Celiac disease over 13 years ago in Bangalore, finding trustworthy, delicious baked goods was nearly impossible. Most gluten-free breads were dry, dense, and tasted like cardboard.
              </motion.p>

              {/* Second Paragraph: Staggered Fade-Up (Expandable on Mobile, Always Visible on Desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
                className={`${storyExpanded ? 'block' : 'hidden sm:block'}`}
              >
                <p className="text-sm sm:text-base text-[#2E1D16]/80 leading-relaxed">
                  KGF Bakehouse (Kaur's Gluten Free Bakehouse) was built to change that forever. We craft gluten-free breads that toast with genuine bounce and chew, cakes that are velvety moist, and cookies with pure buttery melt-in-mouth richness.
                </p>
              </motion.div>

              {/* Read More Toggle Button for Mobile Only */}
              <button
                type="button"
                onClick={() => setStoryExpanded(!storyExpanded)}
                className="sm:hidden text-xs font-bold text-[#C4733A] hover:text-[#AF622C] flex items-center gap-1.5 py-1 px-1 -mt-2 cursor-pointer touch-manipulation min-h-[44px]"
              >
                <span>{storyExpanded ? 'Show less ▴' : 'Read full story ▾'}</span>
              </button>

              {/* The Two Info Cards: Pop-in Bounce + On Hover Lift with Icon Spin (Slow) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1 sm:pt-2">
                {/* Info Card 1: Whole Grain Nutrition */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 22 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.35 }}
                  whileHover="hover"
                  variants={{
                    hover: { y: -6, transition: { duration: 0.25, ease: 'easeOut' } },
                  }}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-[#FDF7F2] border border-[#C4733A]/20 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      variants={{
                        hover: { rotate: 360, transition: { duration: 0.85, ease: 'easeInOut' } },
                      }}
                      className="w-9 h-9 rounded-full bg-[#C4733A]/15 text-[#C4733A] flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <Sprout className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#2E1D16] mb-1">
                        Whole Grain Nutrition
                      </h4>
                      <p className="text-xs text-[#2E1D16]/75 leading-relaxed">
                        Crafted using certified jowar (sorghum), ragi, almond, and brown rice flours instead of empty refined starches.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Info Card 2: Zero Wheat Exposure */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 22 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.48 }}
                  whileHover="hover"
                  variants={{
                    hover: { y: -6, transition: { duration: 0.25, ease: 'easeOut' } },
                  }}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] bg-[#F1F6ED] border border-[#7D8C6F]/25 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      variants={{
                        hover: { rotate: 360, transition: { duration: 0.85, ease: 'easeInOut' } },
                      }}
                      className="w-9 h-9 rounded-full bg-[#7D8C6F]/20 text-[#7D8C6F] flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </motion.div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#2E1D16] mb-1">
                        Zero Wheat Exposure
                      </h4>
                      <p className="text-xs text-[#2E1D16]/75 leading-relaxed">
                        Strictly zero cross-contamination. Dedicated mixing tools, pans, and ovens guaranteed safe for severe celiacs.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/custom-cakes"
                  className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-full bg-[#C4733A] text-white font-semibold text-xs sm:text-sm hover:bg-[#AF622C] transition-all hover:scale-105 active:scale-95 shadow-md min-h-[48px] touch-manipulation text-center"
                >
                  Plan Celebration Cake
                </Link>
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#7D8C6F] hover:underline text-center sm:text-left py-2 min-h-[44px] flex items-center justify-center sm:justify-start"
                >
                  Follow our journey @kgfbakehouse →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. CUSTOM CAKES PROMO (Dark Espresso Section Contrast)
      ══════════════════════════════════════════════════════ */}
      <section
        id="custom-cakes-promo"
        className="py-12 sm:py-24 bg-[#2E1D16] text-[#FDF9F3] border-y border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4733A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#94A485]">
              Celebrations & Milestones
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#FDF9F3] mt-1 mb-2 sm:mb-3">
              Made for Your Special Moments.
            </h2>
            <p className="text-xs sm:text-sm text-[#FDF9F3]/75 leading-relaxed">
              Every birthday, wedding, and milestone deserves a stunning centerpiece. Handcrafted with organic flavors and custom themes — completely gluten-free.
            </p>
          </div>

          {/* 3 Custom Cake Cards (Soft Organic Arches) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
            {CUSTOM_CAKES_SHOWCASE.map((cake, idx) => (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-[#38241C] border border-white/10 shadow-xl flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden rounded-t-3xl sm:rounded-t-[2.5rem]">
                  <img
                    src={cake.image}
                    alt={cake.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E120D]/90 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-[#94A485] font-semibold uppercase tracking-wider mb-1">
                      {cake.flavor}
                    </div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#FDF9F3] group-hover:text-[#F3E3D3] transition-colors">
                      {cake.title}
                    </h3>
                    <p className="text-xs text-[#FDF9F3]/70 mt-1.5 leading-relaxed">
                      {cake.subtitle}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#94A485] font-semibold">100% Celiac Safe</span>
                    <span className="text-[#C4733A] font-semibold">Pre-Order 48h</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central Call to Action */}
          <div className="text-center">
            <Link
              to="/custom-cakes"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-[#C4733A] text-white font-semibold text-xs sm:text-sm hover:bg-[#AF622C] transition-all hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <span>Create Your Cake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. GF PROMISE & FAQ (Visual Flower Kitchen Image, Grain Chips & Alternating Bouncy FAQ Cards)
      ══════════════════════════════════════════════════════ */}
      <section
        id="gf-promise"
        className="py-14 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#F9F3EC] via-[#F4EDE5] to-[#EFF5EC] border-y border-[#2E1D16]/10"
      >
        {/* Faint Subtle Crumb Wallpaper Pattern Behind Everything (This Section Only) */}
        <div className="absolute inset-0 bakery-crumb-pattern opacity-60 pointer-events-none -z-0" aria-hidden="true" />

        {/* Soft Mint & Blush Glow Blobs in Corners */}
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#EAEFE6]/55 blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#F3E3D3]/60 blur-3xl pointer-events-none -z-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 1. HEADERS THAT POP */}
          <div className="text-center mb-10 sm:mb-14">
            {/* Eyebrow with ✨ twinkle animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-2"
            >
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7D8C6F]">
                Transparency & Safety
              </span>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block text-[#C4733A]"
                aria-hidden="true"
              >
                ✨
              </motion.span>
            </motion.div>

            {/* Word-by-word fade-in heading + Small Shield Badge beside it */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                }}
                className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2E1D16] leading-tight"
              >
                {['The', 'KGF', 'Gluten-Free', 'Promise'].map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1.0] },
                      },
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Small Shield Badge beside heading */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', damping: 15, stiffness: 220, delay: 0.4 }}
                className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#7D8C6F]/20 text-[#7D8C6F] border border-[#7D8C6F]/30 shadow-xs"
                title="100% Celiac Safe"
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </div>

            {/* Squiggle underline that draws itself in */}
            <div className="mx-auto mt-2 mb-3 w-48 sm:w-60 select-none" aria-hidden="true">
              <svg viewBox="0 0 240 18" fill="none" className="w-full h-auto overflow-visible">
                <motion.path
                  d="M3 11 C 45 4, 85 16, 125 10 C 165 4, 205 16, 237 10"
                  fill="transparent"
                  stroke="#7D8C6F"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.35 }}
                />
              </svg>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xs sm:text-sm text-[#2E1D16]/75 leading-relaxed max-w-xl mx-auto"
            >
              Our ingredient sourcing and cross-contamination policies are strict, tested, and uncompromising.
            </motion.p>
          </div>

          {/* 2 & 3. VISUALS + INGREDIENT TRANSPARENCY CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
            {/* Real Kitchen/Baking Photo in Flower Shape with Floating Dedicated Kitchen Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-5 relative select-none"
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto">
                {/* Mint/Blush Offset Shadow behind Flower Image */}
                <div
                  className="absolute inset-0 bg-[#DCE7D8] transition-transform duration-500 pointer-events-none rounded-full"
                  style={{
                    clipPath: 'url(#flower-scallop-clip)',
                    WebkitClipPath: 'url(#flower-scallop-clip)',
                    transform: 'rotate(5deg) scale(1.05)',
                  }}
                  aria-hidden="true"
                />

                {/* Primary Kitchen Image in Signature Flower Scallop */}
                <div
                  className="relative w-full h-full shadow-xl -rotate-2 overflow-hidden"
                  style={{
                    clipPath: 'url(#flower-scallop-clip)',
                    WebkitClipPath: 'url(#flower-scallop-clip)',
                  }}
                >
                  <img
                    src={heroBakeryImg}
                    alt="KGF Bakehouse 100% dedicated gluten-free kitchen facility"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Secondary Mini Floating Visual (Artisan Bakes in Squircle) */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -top-3 -right-2 sm:-top-2 sm:-right-3 w-20 h-20 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl shadow-lg border-2 border-white overflow-hidden z-20 rotate-6 bg-[#FCF3EB]"
                >
                  <img
                    src={heroSpreadImg}
                    alt="Fresh gluten-free breads and bakes from our oven"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating "100% Gluten-Free Dedicated Kitchen" Trust Badge Ribbon */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-3 -left-2 sm:-bottom-3 sm:left-2 bg-[#7D8C6F] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-2xl border-2 border-white text-[11px] sm:text-xs font-bold -rotate-2 flex items-center gap-1.5 z-30 cursor-default"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                  <span>100% Gluten-Free Dedicated Kitchen</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Ingredient Transparency Card with Visual Grain Chips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7"
            >
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-[2rem] bg-white/90 backdrop-blur-sm border border-[#7D8C6F]/25 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#7D8C6F]/15 text-[#7D8C6F] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#2E1D16]">
                      Ingredient Transparency & Allergen Note
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#7D8C6F] font-semibold">
                      Certified Wheat-Free Supply Chains
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#2E1D16]/80 leading-relaxed">
                  We exclusively use certified gluten-free alternative grains: Sorghum (Jowar), Finger Millet (Ragi), Almond Flour, Tapioca, and Brown Rice. All dairy butter, milk, and chocolate are sourced from certified wheat-free supply chains.
                </p>

                {/* Grain & Ingredient Chips with Pop-In Stagger */}
                <div className="pt-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#C4733A] block mb-2">
                    Clean Flours & Premium Ingredients:
                  </span>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                    }}
                    className="flex flex-wrap gap-2 sm:gap-2.5"
                  >
                    {[
                      { icon: '🌾', name: 'Sorghum (Jowar)' },
                      { icon: '🌿', name: 'Finger Millet (Ragi)' },
                      { icon: '🥜', name: 'Almond Flour' },
                      { icon: '🥔', name: 'Tapioca Starch' },
                      { icon: '🍚', name: 'Brown Rice' },
                      { icon: '🧈', name: 'Pure Dairy Butter' },
                      { icon: '🍫', name: 'Wheat-Free Chocolate' },
                    ].map((grain, idx) => (
                      <motion.div
                        key={idx}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8, y: 10 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: { type: 'spring', damping: 18, stiffness: 220 },
                          },
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF3EC] border border-[#C4733A]/20 text-[#2E1D16] text-xs font-semibold shadow-2xs hover:shadow-sm transition-all cursor-default select-none"
                      >
                        <span className="text-sm">{grain.icon}</span>
                        <span>{grain.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 4. FAQ ACCORDION CARDS (Alternating Mint / Blush / Cream / Mint-Blush with Bouncy Smooth Animation & Icons) */}
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C4733A]">
                Frequently Answered Questions
              </span>
            </div>

            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaq === idx

              // Alternating color palettes: Mint -> Blush -> Cream -> Mint/Blush
              const cardThemes = [
                {
                  cardBg: 'bg-[#F0F6EE] border-[#7D8C6F]/30 hover:border-[#7D8C6F]/50',
                  iconBadge: 'bg-[#7D8C6F]/15 text-[#7D8C6F]',
                  icon: <ShieldCheck className="w-4 h-4" />,
                },
                {
                  cardBg: 'bg-[#FCF0E6] border-[#C4733A]/25 hover:border-[#C4733A]/45',
                  iconBadge: 'bg-[#C4733A]/15 text-[#C4733A]',
                  icon: <Clock className="w-4 h-4" />,
                },
                {
                  cardBg: 'bg-[#FAF4EC] border-[#2E1D16]/12 hover:border-[#C4733A]/35',
                  iconBadge: 'bg-[#7D8C6F]/15 text-[#7D8C6F]',
                  icon: <Sprout className="w-4 h-4" />,
                },
                {
                  cardBg: 'bg-[#F2F7F0] border-[#7D8C6F]/30 hover:border-[#7D8C6F]/50',
                  iconBadge: 'bg-[#C4733A]/15 text-[#C4733A]',
                  icon: <HeartHandshake className="w-4 h-4" />,
                },
              ]

              const theme = cardThemes[idx % cardThemes.length]

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
                  className={`rounded-2xl sm:rounded-[1.6rem] border shadow-xs transition-all overflow-hidden ${theme.cardBg}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3.5 font-serif font-bold text-sm sm:text-base text-[#2E1D16] hover:text-[#C4733A] cursor-pointer min-h-[52px] touch-manipulation select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${theme.iconBadge}`}>
                        {theme.icon}
                      </div>
                      <span>{faq.q}</span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-[#C4733A]" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: {
                            height: { type: 'spring', damping: 24, stiffness: 220 },
                            opacity: { duration: 0.25 },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: { duration: 0.22, ease: 'easeInOut' },
                            opacity: { duration: 0.15 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#2E1D16]/80 leading-relaxed border-t border-[#2E1D16]/8 pl-14 sm:pl-16">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. REAL GOOGLE REVIEWS SECTION (Squircle Cards, Keyword Highlights, Twinkle & Mobile Carousel)
      ══════════════════════════════════════════════════════ */}
      <GoogleReviewsSection />
    </div>
  )
}

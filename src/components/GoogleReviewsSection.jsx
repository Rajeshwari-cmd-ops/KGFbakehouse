import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowUpRight, ShieldCheck } from 'lucide-react'

// Official Multi-Color Google "G" Icon
function GoogleGIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-label="Google Review">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

// Real Google Reviews from Official Listing (Preserved Exactly)
export const REAL_GOOGLE_REVIEWS = [
  {
    id: "g1",
    author: "Aditya Jaiswal",
    initials: "AJ",
    meta: "Local Guide • 61 reviews • 4 photos",
    rating: 5,
    text: "We ordered the brown and white gluten free bread and I must say it was very tasty and quite fresh. It was prepared fresh on order. A truly satisfying and delicious choice for anyone looking for a tasty gluten-free alternative — definitely worth trying!",
    googleMapsUrl: "https://maps.google.com/?q=Kaur%27s+Gluten+Free+Bakehouse+Whitefield+Bengaluru"
  },
  {
    id: "g2",
    author: "YogaByShi",
    initials: "YS",
    meta: "Local Guide • 17 reviews • 20 photos",
    rating: 5,
    text: "Highly recommended for those having celiac or following strict gluten free diet. I ordered the protein buns and they were really nice, grateful to have found gluten free bread options nearby. Rashi is really nice and sweet to talk to as well! I enjoyed these buns with beetroot hummus 🌿 ",
    googleMapsUrl: "https://maps.google.com/?q=Kaur%27s+Gluten+Free+Bakehouse+Whitefield+Bengaluru"
  },
  {
    id: "g3",
    author: "Sai Gouthami D.",
    initials: "SG",
    meta: "12 reviews • 3 photos",
    rating: 5,
    text: "I have tried KGF for first time and had a very good experience of tasting the guilt free gluten free food. Taste is yummy.. whomever are looking for gluten free snacks can go for it.. Thank you Rashi for preparing yummy snacks 🙏",
    googleMapsUrl: "https://maps.google.com/?q=Kaur%27s+Gluten+Free+Bakehouse+Whitefield+Bengaluru"
  },
  {
    id: "g4",
    author: "Suparna Mukherjee",
    initials: "SM",
    meta: "12 reviews",
    rating: 5,
    text: "The gluten free marble cake and veg pizza are really well made and tastes nothing different from the ones you'd get from shops that claim they sell \"premium quality\", despite no gluten being in the mix. Truly one of a kind. Highly recommend. ⭐",
    googleMapsUrl: "https://maps.google.com/?q=Kaur%27s+Gluten+Free+Bakehouse+Whitefield+Bengaluru"
  }
]

// Helper function to highlight key words in terracotta bold
function highlightKeywords(text) {
  const pattern = /(gluten[- ]free|gluten free|celiac|tasty|taste|quite fresh|fresh on order|fresh|delicious|yummy|guilt free|no gluten)/i
  const parts = text.split(/(gluten[- ]free|gluten free|celiac|tasty|taste|quite fresh|fresh on order|fresh|delicious|yummy|guilt free|no gluten)/gi)

  return parts.map((part, i) => {
    if (pattern.test(part)) {
      return (
        <strong key={i} className="text-[#C4733A] font-bold not-italic">
          {part}
        </strong>
      )
    }
    return part
  })
}

// Single Review Card Component with Squircle Shape, Decorative Quote & Hover Lift
function ReviewCard({ review, idx }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > 190
  const displayText = !expanded && isLong ? review.text.slice(0, 185) + '…' : review.text

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="relative p-6 sm:p-7 rounded-[2.2rem] bg-[#FFFDFB] border border-[#E7D2BF] shadow-[0_8px_24px_rgba(46,29,22,0.04)] hover:shadow-[0_16px_36px_rgba(196,115,58,0.12)] hover:border-[#C4733A]/40 transition-shadow duration-300 flex flex-col justify-between h-full select-none overflow-hidden group"
    >
      {/* Large Decorative Quote Mark in Blush Behind Top Corner */}
      <span
        className="absolute top-1 right-5 font-serif text-7xl sm:text-8xl text-[#F3E3D3]/70 select-none pointer-events-none leading-none -z-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        “
      </span>

      {/* Card Content Top: Avatar, Name, Metadata & Google Logo */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            {/* Google Profile Avatar */}
            <div className="w-11 h-11 rounded-full bg-[#3B2319] text-[#F3E3D3] font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm flex-shrink-0 border border-[#E7D2BF]/60">
              {review.initials}
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#2E1D16] leading-snug">
                {review.author}
              </h4>
              <p className="text-[11px] text-[#2E1D16]/60 font-medium leading-tight mt-0.5">
                {review.meta}
              </p>
            </div>
          </div>

          {/* Official Google G Logo */}
          <div className="p-1 rounded-full bg-white shadow-xs border border-[#2E1D16]/5 flex-shrink-0">
            <GoogleGIcon className="w-4 h-4" />
          </div>
        </div>

        {/* 5 Gold Stars Rating */}
        <div className="flex items-center gap-1 mb-3.5" aria-label="5 stars rating">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
          ))}
        </div>

        {/* Review Text with Scannable Terracotta Bold Keywords */}
        <p className="text-xs sm:text-[13px] text-[#2E1D16]/85 leading-relaxed italic">
          "{highlightKeywords(displayText)}"
        </p>

        {/* Read More / Show Less toggle for long reviews */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] font-bold text-[#C4733A] hover:underline mt-1.5 cursor-pointer inline-block"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Card Footer: View on Google Maps Link */}
      <div className="pt-4 mt-5 border-t border-[#2E1D16]/8 relative z-10">
        <a
          href={review.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4733A] hover:text-[#AF622C] hover:underline group/link"
        >
          <span>View on Google Maps</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  )
}

export default function GoogleReviewsSection() {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const mobileScrollRef = useRef(null)

  // Smooth slow auto-scroll for mobile carousel (pauses on touch/interaction)
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      if (window.innerWidth >= 768) return // Only on mobile
      setActiveMobileIdx((prev) => {
        const next = (prev + 1) % REAL_GOOGLE_REVIEWS.length
        if (mobileScrollRef.current) {
          const cardWidth = mobileScrollRef.current.offsetWidth * 0.85 + 16
          mobileScrollRef.current.scrollTo({
            left: next * cardWidth,
            behavior: 'smooth'
          })
        }
        return next
      })
    }, 4500)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleMobileScroll = (e) => {
    const scrollLeft = e.target.scrollLeft
    const cardWidth = e.target.offsetWidth * 0.85 + 16
    const newIdx = Math.round(scrollLeft / cardWidth)
    if (newIdx !== activeMobileIdx && newIdx >= 0 && newIdx < REAL_GOOGLE_REVIEWS.length) {
      setActiveMobileIdx(newIdx)
    }
  }

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-[#F3E3D3]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Section Header with Twinkle Animation */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7D8C6F]/15 text-[#7D8C6F] border border-[#7D8C6F]/25 text-xs font-semibold tracking-wide mb-3 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% REAL GOOGLE REVIEWS • 5.0 RATED</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2E1D16] flex items-center justify-center gap-2">
          <span>Real Reviews from Google</span>
          {/* Gentle Twinkle Animation */}
          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              rotate: [0, 8, -8, 0],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block text-[#C4733A] text-2xl sm:text-3xl select-none"
            title="Twinkle"
          >
            ✨
          </motion.span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[#2E1D16]/75 max-w-2xl mx-auto mt-2 leading-relaxed">
          Real feedback from our wonderful customers in Whitefield and across Bengaluru. Every bake is made fresh to order in our dedicated wheat-free kitchen.
        </p>
      </div>

      {/* Desktop Grid (Aligned 4-Card Equal-Height Layout) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative z-10">
        {REAL_GOOGLE_REVIEWS.map((review, idx) => (
          <div key={review.id} className="h-full">
            <ReviewCard review={review} idx={idx} />
          </div>
        ))}
      </div>

      {/* Mobile Swipeable Carousel with Auto-Scroll & Touch Pause */}
      <div
        className="md:hidden relative z-10"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-2 scroll-smooth no-scrollbar"
        >
          {REAL_GOOGLE_REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className="min-w-[85vw] max-w-[85vw] snap-center flex-shrink-0"
            >
              <ReviewCard review={review} idx={idx} />
            </div>
          ))}
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {REAL_GOOGLE_REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (mobileScrollRef.current) {
                  const cardWidth = mobileScrollRef.current.offsetWidth * 0.85 + 16
                  mobileScrollRef.current.scrollTo({
                    left: i * cardWidth,
                    behavior: 'smooth'
                  })
                  setActiveMobileIdx(i)
                }
              }}
              aria-label={`Go to review ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                activeMobileIdx === i
                  ? 'w-6 h-2 bg-[#C4733A]'
                  : 'w-2 h-2 bg-[#E7D2BF] hover:bg-[#C4733A]/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* View All Reviews on Google Maps Button (Cute Rounded Pill with Hover Lift) */}
      <div className="mt-14 text-center relative z-10">
        <a
          href="https://maps.google.com/?q=Kaur%27s+Gluten+Free+Bakehouse+Whitefield+Bengaluru"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C4733A] text-white font-semibold text-xs sm:text-sm hover:bg-[#AF622C] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group cursor-pointer"
        >
          <span>⭐ Read All Reviews on Google Maps</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../data/products.js'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2E1D16]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl bg-[#FDF9F3] rounded-3xl shadow-2xl border border-[#2E1D16]/10 overflow-hidden z-10"
        >
          <div className="p-4 border-b border-[#2E1D16]/10 flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#C4733A]" />
            <input
              type="text"
              autoFocus
              placeholder="Type to search cakes, breads, cookies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#2E1D16] placeholder-[#2E1D16]/40 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-[#2E1D16]/5 text-[#2E1D16]/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-xs text-[#2E1D16]/50">
                Start typing to search our gluten-free bakery menu...
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#2E1D16]/60">
                No bakes found matching "{query}".
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((prod) => (
                  <Link
                    key={prod.id}
                    to={`/product/${prod.id}`}
                    onClick={onClose}
                    className="p-3 rounded-2xl hover:bg-white border border-transparent hover:border-[#2E1D16]/10 transition-all flex items-center gap-3.5 group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-sm text-[#2E1D16] group-hover:text-[#C4733A] truncate">
                        {prod.name}
                      </h4>
                      <span className="text-[11px] text-[#7D8C6F] font-semibold">{prod.unit}</span>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#C4733A]">₹{prod.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

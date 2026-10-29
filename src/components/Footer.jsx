import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, MapPin, Phone, Mail, ShieldCheck, Clock } from 'lucide-react'
import { BUSINESS_INFO, CATEGORIES } from '../data/products.js'
import Logo from './Logo.jsx'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1E120D] text-[#FDF9F3] pt-12 sm:pt-20 pb-8 sm:pb-10 rounded-t-[2.5rem] sm:rounded-t-[4.5rem] border-t border-white/10 relative overflow-hidden mt-10 sm:mt-12 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C4733A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#7D8C6F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14">
          {/* Brand Info & Recreated SVG Logo (Single-color Cream on Dark Espresso) */}
          <div className="space-y-3.5 sm:space-y-4">
            <Link
              to="/"
              className="inline-block group text-[#FDF9F3] hover:text-[#F3E3D3] transition-colors py-1"
              aria-label="KGF Bakehouse Home"
            >
              <Logo className="h-10 sm:h-12 w-auto group-hover:scale-102 transition-transform" />
            </Link>

            <p className="text-xs text-[#FDF9F3]/70 leading-relaxed">
              Safe, fresh, and deeply satisfying artisan gluten-free bakes — crafted by someone living with Celiac disease for over 13 years. Because extraordinary food should never be a compromise.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7D8C6F]/20 text-[#94A485] text-xs font-medium border border-[#7D8C6F]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7D8C6F] flex-shrink-0" />
              <span>100% Dedicated Gluten-Free Facility</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="font-serif text-base sm:text-lg font-bold text-[#F3E3D3] mb-3 sm:mb-4">Quick Links</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-[#FDF9F3]/70">
              <li>
                <Link to="/" className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                  Shop Menu
                </Link>
              </li>
              <li>
                <Link to="/custom-cakes" className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                  Custom Celebration Cakes
                </Link>
              </li>
              <li>
                <a
                  href="/#story"
                  onClick={() => scrollToSection('story')}
                  className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center"
                >
                  Our Story & Celiac Journey
                </a>
              </li>
              <li>
                <a
                  href="/#gf-promise"
                  onClick={() => scrollToSection('gf-promise')}
                  className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center"
                >
                  GF Promise & Safety
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="font-serif text-base sm:text-lg font-bold text-[#F3E3D3] mb-3 sm:mb-4">Categories</h5>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-[#FDF9F3]/70">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to="/shop" className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact, Hours & Location */}
          <div className="space-y-3 sm:space-y-3.5 text-xs text-[#FDF9F3]/75">
            <h5 className="font-serif text-base sm:text-lg font-bold text-[#F3E3D3] mb-3 sm:mb-4">Bakery Hours & Location</h5>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C4733A] flex-shrink-0 mt-0.5" />
              <span>{BUSINESS_INFO.location}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#7D8C6F] flex-shrink-0" />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                {BUSINESS_INFO.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C4733A] flex-shrink-0" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#C4733A] transition-colors min-h-[38px] sm:min-h-0 flex items-center">
                {BUSINESS_INFO.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-semibold hover:underline min-h-[38px] sm:min-h-0 flex items-center"
              >
                Direct WhatsApp Pre-Orders
              </a>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-[#C4733A] flex-shrink-0 mt-0.5" />
              <span className="text-[11px] text-[#FDF9F3]/60">
                {BUSINESS_INFO.hours}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#FDF9F3]/50 text-center sm:text-left">
          <div>
            © {currentYear} {BUSINESS_INFO.fullName}. Crafted with pride in Bengaluru.
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <a
              href={BUSINESS_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#C4733A] transition-colors py-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>@kgfbakehouse</span>
            </a>
            <span className="flex items-center gap-1">
              Handcrafted with <Heart className="w-3 h-3 text-[#C4733A] fill-[#C4733A]" /> for Celiacs & Food Lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

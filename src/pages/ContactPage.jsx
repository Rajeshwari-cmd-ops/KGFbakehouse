import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import { BUSINESS_INFO } from '../data/products.js'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `Hello KGF Bakehouse! 🥖\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}\n\nThank you!`
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="w-full bg-[#FDF9F3] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#7D8C6F] mb-1">
            Get In Touch
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#2E1D16] mb-2 sm:mb-3">
            Contact KGF Bakehouse
          </h1>
          <p className="text-xs sm:text-sm text-[#2E1D16]/70 leading-relaxed">
            Have questions about custom celebration cakes, dietary allergies, or bulk orders? We'd love to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Contact Information & Map Placeholder */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#2E1D16]/10 shadow-sm space-y-5 sm:space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16]">
              Bakery Information
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#2E1D16]/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C4733A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2E1D16] font-serif text-sm">Bakery Address</strong>
                  <span>{BUSINESS_INFO.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7D8C6F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2E1D16] font-serif text-sm">Phone Support</strong>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-[#C4733A]">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C4733A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2E1D16] font-serif text-sm">Email Address</strong>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#C4733A]">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#7D8C6F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2E1D16] font-serif text-sm">Baking & Pickup Hours</strong>
                  <span className="text-xs">{BUSINESS_INFO.hours}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-2xl bg-[#EAEFE6] border border-[#7D8C6F]/20 text-xs text-[#2E1D16] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#7D8C6F]">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Fastest Response via WhatsApp</span>
              </div>
              <p className="text-[11px] text-[#2E1D16]/70 leading-relaxed">
                For urgent birthday cake enquiries or delivery updates, message Chef Jasleen directly on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-bold text-[#7D8C6F] hover:underline"
              >
                Chat Now →
              </a>
            </div>

            {/* Map Placeholder */}
            <div>
              <div className="text-xs font-bold text-[#2E1D16] mb-2">Location Map</div>
              <div className="w-full h-44 rounded-2xl bg-[#FBF4ED] border border-[#2E1D16]/10 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-8 h-8 text-[#C4733A] mb-2" />
                <span className="font-serif font-bold text-sm text-[#2E1D16]">Hoodi Circle, Whitefield</span>
                <span className="text-[11px] text-[#2E1D16]/60">Bengaluru, Karnataka 560048</span>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#2E1D16]/10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 sm:py-16">
                <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-[#25D366] mx-auto mb-3 sm:mb-4" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16] mb-2">
                  Message Sent!
                </h3>
                <p className="text-xs text-[#2E1D16]/70 max-w-sm mx-auto mb-6">
                  We've opened WhatsApp with your message pre-filled. Chef Jasleen will connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-[#C4733A] text-white text-xs font-semibold min-h-[44px] touch-manipulation"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16] mb-1 sm:mb-2">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-[#2E1D16]/70 mb-5 sm:mb-6">
                  Fill in your details below to send an instant enquiry to our bakery team.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jasleen Kaur"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs px-4 sm:px-5 py-3 sm:py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner min-h-[44px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 80738 79160"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs px-4 sm:px-5 py-3 sm:py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. jasleen@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs px-4 sm:px-5 py-3 sm:py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2E1D16]/80 mb-1">
                      How Can We Help You? *
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Tell us about custom flavor requests, delivery timing, party orders, or dietary needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs px-4 sm:px-5 py-3 sm:py-3.5 rounded-[1.5rem] border border-[#2E1D16]/15 bg-[#FDF9F3] focus:outline-none focus:border-[#C4733A] shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#2E1D16] text-white font-semibold text-xs sm:text-sm hover:bg-[#C4733A] transition-all hover:scale-102 active:scale-95 flex items-center justify-center gap-2 shadow-xl cursor-pointer min-h-[48px] touch-manipulation"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to KGF Bakehouse</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Plus, Minus, Star, ShieldCheck, ShoppingBag, MessageCircle, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { PRODUCTS, createWhatsAppOrderLink } from '../data/products.js'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0]
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)

  return (
    <div className="w-full bg-[#FDF9F3] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E1D16]/70 hover:text-[#C4733A] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bakery</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-[#2E1D16]/10 shadow-lg">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F3E3D3] shadow-md border border-[#2E1D16]/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.availability && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#7D8C6F] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                {product.availability}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-[#7D8C6F] uppercase tracking-wider">
                  {product.unit}
                </span>
                <span className="text-xs text-[#2E1D16]/40">•</span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#2E1D16]">
                  <Star className="w-3.5 h-3.5 fill-[#C4733A] text-[#C4733A]" />
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E1D16] leading-tight">
                {product.name}
              </h1>

              <div className="font-serif text-3xl font-bold text-[#C4733A] my-4">
                ₹{product.price}
              </div>

              <p className="text-sm text-[#2E1D16]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Ingredients & Allergen Transparency */}
              <div className="p-5 rounded-[2rem] bg-[#FBF4ED] border border-[#2E1D16]/10 space-y-2 mb-6">
                <div>
                  <span className="text-xs font-bold text-[#2E1D16] block mb-0.5">Ingredients:</span>
                  <p className="text-xs text-[#2E1D16]/70 leading-relaxed">{product.ingredients}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-[#7D8C6F] block mb-0.5">Allergen Information:</span>
                  <p className="text-xs text-[#7D8C6F] font-semibold">{product.allergens}</p>
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#2E1D16]/20 rounded-full bg-[#FDF9F3] px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#2E1D16]/70 hover:text-[#C4733A] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-bold text-sm text-[#2E1D16]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#2E1D16]/70 hover:text-[#C4733A] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={(e) => addToCart(product, quantity, e)}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#2E1D16] text-white font-semibold text-xs sm:text-sm hover:bg-[#C4733A] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket (₹{product.price * quantity})</span>
                </button>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="mt-4">
                <a
                  href={createWhatsAppOrderLink(product.name, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-[#25D366] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all hover:scale-105 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Direct WhatsApp Pre-Order</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2E1D16]/10 flex items-center gap-2 text-xs text-[#7D8C6F] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Baked fresh in dedicated gluten-free kitchen in Hoodi, Whitefield.</span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h3 className="font-serif text-2xl font-bold text-[#2E1D16] mb-6">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/product/${rel.id}`}
                  className="p-4 rounded-2xl bg-white border border-[#2E1D16]/10 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2E1D16] group-hover:text-[#C4733A] transition-colors">
                      {rel.name}
                    </h4>
                    <span className="font-serif font-bold text-xs text-[#C4733A]">₹{rel.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

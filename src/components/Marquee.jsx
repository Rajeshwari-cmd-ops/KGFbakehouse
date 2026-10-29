import React from 'react'
import { Sparkles } from 'lucide-react'

export default function Marquee({
  items = [
    '100% Gluten-Free',
    'Freshly Baked Daily',
    'Handcrafted with Love',
    'Dedicated Wheat-Free Kitchen',
    'Celiac Safe & Lab Tested',
    'Custom Celebration Cakes',
    'Zero Preservatives',
    'Bangalore Delivery & Self-Pickup'
  ],
  bg = 'bg-[#C4733A]',
  textColor = 'text-[#FDF9F3]'
}) {
  const tripleItems = [...items, ...items, ...items]

  return (
    <div className={`overflow-hidden py-3.5 select-none ${bg} ${textColor} border-y border-[#FAF3EB]/15`}>
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {tripleItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 text-sm font-semibold tracking-wider uppercase">
            <span>{text}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#F3E3D3] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  )
}

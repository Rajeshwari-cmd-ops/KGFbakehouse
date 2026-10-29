const fs = require('fs');

// 1. Update index.css
let css = fs.readFileSync('src/index.css', 'utf-8');

const oldMarqueeCssRegex = /\/\* Custom marquee keyframes \*\/[\s\S]*?\.animate-marquee:hover\s*\{\s*animation-duration:\s*12s;\s*\}/;

const newMarqueeCss = `/* Custom marquee keyframes — calm, gentle, slow glide (no motion sickness) */
@keyframes marquee-scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee-scroll 75s linear infinite;
  will-change: transform;
}

/* Pause on hover to let the user read comfortably */
.animate-marquee:hover {
  animation-play-state: paused;
}

.animate-marquee-slow {
  display: flex;
  width: max-content;
  animation: marquee-scroll 85s linear infinite;
  will-change: transform;
}

.animate-marquee-slow:hover {
  animation-play-state: paused;
}`;

css = css.replace(oldMarqueeCssRegex, newMarqueeCss);

// Also ensure prefers-reduced-motion stops marquee completely
const oldPrefersRegex = /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\}/;
const newPrefers = `@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .animate-marquee,
  .animate-marquee-slow {
    animation: none !important;
    transform: none !important;
  }
}`;

css = css.replace(oldPrefersRegex, newPrefers);
fs.writeFileSync('src/index.css', css, 'utf-8');
console.log('Updated src/index.css with slow marquees and reduced-motion');

// 2. Update products.js
let prodJs = fs.readFileSync('src/data/products.js', 'utf-8');

const oldTrustRegex = /export const TRUST_PILLARS = \[\s*\{[\s\S]*?\}\s*\];/;
const newTrust = `export const TRUST_PILLARS = [
  {
    icon: "WheatOff",
    title: "100% Gluten-Free Baking",
    subtitle: "Zero Wheat, Barley & Rye",
    description: "Zero wheat, barley, or rye ever enters our bakery doors. 100% dedicated celiac-safe kitchen with lab-tested ingredients."
  },
  {
    icon: "ShieldCheck",
    title: "Certified 100% Celiac Safe",
    subtitle: "Strict Kitchen Protocols",
    description: "Meticulous sanitization and dedicated equipment certified safe for severe celiacs and wheat allergies."
  },
  {
    icon: "Sprout",
    title: "Let's Address Root Cause",
    subtitle: "Gut-Friendly Ancient Grains",
    description: "Wholesome certified sorghum, ragi, and almond flours to heal and nourish your gut naturally without inflammation."
  },
  {
    icon: "Smile",
    title: "Zero Bloat, Pure Comfort",
    subtitle: "Gentle Digestion Always",
    description: "Clean artisan bakes made with real butter and zero artificial binders, leaving your tummy light and happy."
  }
];`;

prodJs = prodJs.replace(oldTrustRegex, newTrust);
fs.writeFileSync('src/data/products.js', prodJs, 'utf-8');
console.log('Updated src/data/products.js with TRUST_PILLARS');

// 3. Update HomePage.jsx
let homeJs = fs.readFileSync('src/pages/HomePage.jsx', 'utf-8');

// Ensure Sprout and Smile are imported from lucide-react
if (!homeJs.includes('Sprout')) {
  homeJs = homeJs.replace(
    '  WheatOff,',
    '  WheatOff,\n  Sprout,\n  Smile,'
  );
}

// Update FloatingBakeryTreatsMarquee to use animate-marquee-slow
homeJs = homeJs.replace(
  '<div className="flex animate-marquee gap-8 items-center cursor-pointer">',
  '<div className="flex animate-marquee-slow gap-8 items-center cursor-pointer">'
);

// Update iconMap in HomePage.jsx
homeJs = homeJs.replace(
  `  const iconMap = {
    WheatOff: WheatOff,
    Clock: Clock,
    CheckCircle: CheckCircle,
    HeartHandshake: HeartHandshake,
  }`,
  `  const iconMap = {
    WheatOff: WheatOff,
    ShieldCheck: ShieldCheck,
    Sprout: Sprout,
    Smile: Smile,
    Clock: Clock,
    CheckCircle: CheckCircle,
    HeartHandshake: HeartHandshake,
  }`
);

// Redesign 4 Trust Cards section
const oldCardsSectionRegex = /\{\/\* ══════════════════════════════════════════════════════\s*3\. TRUST STRIP[\s\S]*?<\/section>/;

const newCardsSection = `{/* ══════════════════════════════════════════════════════
          3. CUTE & CALM TRUST PILLAR CARDS (Soft Blush Squircle, Scalloped Trim & Floating Icon)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FDF9F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
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
                  className="group relative flex flex-col items-center text-center px-6 pt-10 pb-8 rounded-[2.2rem] bg-[#F3E3D3] border border-[#E7D2BF] shadow-[0_8px_24px_rgba(46,29,22,0.04)] hover:shadow-[0_14px_32px_rgba(46,29,22,0.09)] transition-all duration-300 hover:-translate-y-1.5 h-full select-none"
                >
                  {/* Cute Icon in a Circle on Top of Card (Does one soft bounce on hover) */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      variants={{
                        hover: {
                          y: [0, -6, 0],
                          transition: { duration: 0.45, ease: 'easeInOut' }
                        }
                      }}
                      className="w-14 h-14 rounded-full bg-[#FDF9F3] text-[#C4733A] border-2 border-[#E7D2BF] shadow-md flex items-center justify-center transition-colors duration-300 group-hover:border-[#C4733A]/40 group-hover:shadow-lg"
                    >
                      <IconComp className="w-6 h-6 stroke-[2.2]" />
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
      </section>`;

homeJs = homeJs.replace(oldCardsSectionRegex, newCardsSection);
fs.writeFileSync('src/pages/HomePage.jsx', homeJs, 'utf-8');
console.log('Updated src/pages/HomePage.jsx with cute calm trust cards and slow treats marquee');

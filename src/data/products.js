// KGF Bakehouse — Products & Store Data
// Photorealistic food photography imports

import heroSpreadImg from '../assets/hero_spread.jpg'
import storyBakerImg from '../assets/story_baker.jpg'
import customCake1Img from '../assets/custom_cake_1.jpg'
import customCake2Img from '../assets/custom_cake_2.jpg'
import customCake3Img from '../assets/custom_cake_3.jpg'

// Menu Item Images
import imgButterCookies from '../assets/menu/butter-cookies.jpg'
import imgRagiCookies from '../assets/menu/ragi-cookies.jpg'
import imgMuffins from '../assets/menu/muffins-6pc.jpg'
import imgCupCakes from '../assets/menu/cup-cakes-6pc.jpg'
import imgPancake from '../assets/menu/pancake-2pc.jpg'
import imgChocolateWaffle from '../assets/menu/chocolate-waffle.jpg'
import imgDonuts from '../assets/menu/donuts-6pc.jpg'
import imgTeaCake from '../assets/menu/tea-cake-300g.jpg'
import imgDryFruitTeaCake from '../assets/menu/dry-fruit-tea-cake-300g.jpg'
import imgPlainCake from '../assets/menu/plain-cake-500g.jpg'
import imgMarbleCake from '../assets/menu/marble-cake-500g.jpg'
import imgFudgeBrownie from '../assets/menu/fudge-brownie-400g.jpg'
import imgCelebrationCake from '../assets/menu/celebration-cake-500g.jpg'
import imgBurgerBuns from '../assets/menu/burger-buns-4pc.jpg'
import imgProteinFiberBuns from '../assets/menu/protein-fiber-buns-4pc.jpg'
import imgPizzaBase from '../assets/menu/pizza-base-8in.jpg'
import imgBrownBread from '../assets/menu/brown-bread-loaf.jpg'
import imgWhiteBread from '../assets/menu/white-bread-loaf.jpg'
import imgFocacciaBread from '../assets/menu/focaccia-bread-500g.jpg'
import imgSamosa from '../assets/menu/samosa-4pc.jpg'
import imgPaneerTikka from '../assets/menu/paneer-tikka-4sticks.jpg'
import imgPadThaiNoodles from '../assets/menu/pad-thai-noodles.jpg'
import imgPadThaiPasta from '../assets/menu/pad-thai-pasta.jpg'
import imgCheeseGarlicBread from '../assets/menu/cheese-garlic-bread-8in.jpg'
import imgStuffedGarlicBread from '../assets/menu/stuffed-garlic-bread-8in.jpg'
import imgMargheritaPizza from '../assets/menu/margherita-pizza-8in.jpg'
import imgVegPizza from '../assets/menu/veg-pizza-8in.jpg'
import imgPaneerPizza from '../assets/menu/paneer-pizza-8in.jpg'
import imgPlainParatha from '../assets/menu/plain-paratha-2pc.jpg'
import imgStuffParatha from '../assets/menu/stuff-paratha-2pc.jpg'
import imgPaneerParatha from '../assets/menu/paneer-paratha-2pc.jpg'
import imgMilkBurfi from '../assets/menu/milk-burfi-peda-modak-500g.jpg'
import imgBesanLaddoos from '../assets/menu/besan-coconut-laddoos-500g.jpg'
import imgChocolateBurfi from '../assets/menu/chocolate-burfi-500g.jpg'
import imgKajuBurfi from '../assets/menu/kaju-burfi-peda-500g.jpg'
import imgKajuModak from '../assets/menu/kaju-modak-500g.jpg'
import imgChocolateSyrup from '../assets/menu/chocolate-syrup-300ml.jpg'
import imgPlainChocolate from '../assets/menu/homemade-plain-chocolate-500g.jpg'
import imgDryFruitChocolate from '../assets/menu/homemade-dry-fruit-chocolate-500g.jpg'

export const BUSINESS_INFO = {
  name: "KGF Bakehouse",
  fullName: "Kaur's Gluten Free Bakehouse",
  tagline: "Thoughtfully Baked. Completely Gluten-Free.",
  headline: "Goodness in Every Bite.",
  subtext: "Safe, fresh, and deeply satisfying artisan gluten-free bakes — crafted with certified flours, real butter, and zero wheat exposure.",
  phone: "+91 80738 79160",
  whatsappNumber: "918073879160",
  email: "hello@kgfbakehouse.in",
  location: "Hoodi Circle, ITPL Main Road, Whitefield, Bengaluru, Karnataka 560048",
  hours: "Tuesday – Sunday: 9:00 AM – 8:00 PM (Freshly baked to pre-order, 24–48h notice)",
  instagram: "https://www.instagram.com/kgfbakehouse",
  website: "https://www.kgfbakehouse.in"
}

export const MENU_CATEGORIES = [
  { id: "cookies", name: "Cookies", count: 2 },
  { id: "muffins-cupcakes", name: "Muffins & Cupcakes", count: 2 },
  { id: "breakfast", name: "Breakfast", count: 2 },
  { id: "cakes", name: "Cakes", count: 7 },
  { id: "artisan-breads", name: "Artisan Breads [Gluten Free]", count: 6 },
  { id: "tasty-treats", name: "Tasty Treats [Gluten Free]", count: 12 },
  { id: "sweet-indulgences", name: "Sweet Indulgences [Gluten Free]", count: 8 },
]

export const CATEGORIES = MENU_CATEGORIES.map(c => ({
  id: c.id,
  name: c.name,
  description: `Artisan ${c.name} baked fresh to order in our dedicated gluten-free kitchen`,
  image: c.id === 'cookies' ? imgButterCookies :
         c.id === 'muffins-cupcakes' ? imgMuffins :
         c.id === 'breakfast' ? imgChocolateWaffle :
         c.id === 'cakes' ? imgMarbleCake :
         c.id === 'artisan-breads' ? imgBrownBread :
         c.id === 'tasty-treats' ? imgMargheritaPizza : imgMilkBurfi,
  itemCount: `${c.count} Bakes`
}))

export const INGREDIENTS_STRING = "Jowar, Bajra, Sorghum, Maize, Channa Dal, Urad Dal, Moong Dal, Sabudana, White Rice, Brown Rice, Milk, Sugar, Salt, Yeast, Xanthan Gum";

export const PRODUCTS = [
  // ── 1. Cookies ─────────────────────────────────────────────
  {
    id: "butter-cookies-250g",
    name: "Butter Cookies (250g)",
    category: "cookies",
    categoryName: "Cookies",
    price: 380,
    priceDisplay: "₹380",
    description: "Classic crunchy GF cookies",
    image: imgButterCookies,
    unit: "Box of 250g",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "ragi-cookies-250g",
    name: "Ragi Cookies (250g)",
    category: "cookies",
    categoryName: "Cookies",
    price: 380,
    priceDisplay: "₹380",
    description: "Healthy finger millet cookies",
    image: imgRagiCookies,
    unit: "Box of 250g",
    rating: 4.9,
    isBestseller: false,
  },

  // ── 2. Muffins & Cupcakes ───────────────────────────────────
  {
    id: "muffins-6pc",
    name: "Muffins (6 pc)",
    category: "muffins-cupcakes",
    categoryName: "Muffins & Cupcakes",
    price: 450,
    priceDisplay: "₹450",
    description: "Soft, freshly baked gluten-free muffins",
    image: imgMuffins,
    unit: "Box of 6 pc",
    rating: 4.8,
    isBestseller: true,
  },
  {
    id: "cup-cakes-6pc",
    name: "Cup Cakes (6 pc)",
    category: "muffins-cupcakes",
    categoryName: "Muffins & Cupcakes",
    price: 550,
    priceDisplay: "₹550",
    description: "Delightful frosted cupcakes",
    image: imgCupCakes,
    unit: "Box of 6 pc",
    rating: 4.9,
    isBestseller: false,
  },

  // ── 3. Breakfast ────────────────────────────────────────────
  {
    id: "pancake-2pc",
    name: "Pancake (2 pc)",
    category: "breakfast",
    categoryName: "Breakfast",
    price: 300,
    priceDisplay: "₹300",
    description: "With honey or chocolate drizzle",
    image: imgPancake,
    unit: "Stack of 2 pc",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "chocolate-waffle",
    name: "Chocolate Waffle",
    category: "breakfast",
    categoryName: "Breakfast",
    price: 300,
    priceDisplay: "₹300",
    description: "Crispy, indulgent chocolate waffle",
    image: imgChocolateWaffle,
    unit: "1 Fresh Waffle",
    rating: 4.9,
    isBestseller: true,
  },

  // ── 4. Cakes ────────────────────────────────────────────────
  {
    id: "donuts-6pc",
    name: "Donuts (6 pc)",
    category: "cakes",
    categoryName: "Cakes",
    price: 550,
    priceDisplay: "₹550",
    description: "Classic gluten-free donuts",
    image: imgDonuts,
    unit: "Box of 6 pc",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "tea-cake-300g",
    name: "Tea Cake (300g)",
    category: "cakes",
    categoryName: "Cakes",
    price: 450,
    priceDisplay: "₹450",
    description: "Available in Vanilla / Chocolate / Banana",
    image: imgTeaCake,
    unit: "300g Loaf",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "dry-fruit-tea-cake-300g",
    name: "Dry Fruit Tea Cake (300g)",
    category: "cakes",
    categoryName: "Cakes",
    price: 550,
    priceDisplay: "₹550",
    description: "Available in Vanilla / Chocolate / Banana",
    image: imgDryFruitTeaCake,
    unit: "300g Loaf",
    rating: 4.9,
    isBestseller: false,
  },
  {
    id: "plain-cake-500g",
    name: "Plain Cake (500g)",
    category: "cakes",
    categoryName: "Cakes",
    price: 700,
    priceDisplay: "₹700",
    description: "Simple, moist and delicious plain cake",
    image: imgPlainCake,
    unit: "500g Cake",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "marble-cake-500g",
    name: "Marble Cake (500g)",
    category: "cakes",
    categoryName: "Cakes",
    price: 800,
    priceDisplay: "₹800",
    description: "Beautiful swirled marble pattern",
    image: imgMarbleCake,
    unit: "500g Cake",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "fudge-brownie-400g",
    name: "Fudge Brownie (400g)",
    category: "cakes",
    categoryName: "Cakes",
    price: 800,
    priceDisplay: "₹800",
    description: "Rich, fudgy gluten-free chocolate brownie",
    image: imgFudgeBrownie,
    unit: "400g Box",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "celebration-cake-500g",
    name: "Celebration Cake (500g)",
    category: "cakes",
    categoryName: "Cakes",
    price: 1200,
    priceDisplay: "₹1200",
    description: "Fresh cream cakes for every celebration",
    image: imgCelebrationCake,
    unit: "500g Custom Cake",
    rating: 5.0,
    isBestseller: true,
  },

  // ── 5. Artisan Breads [Gluten Free] ──────────────────────────
  {
    id: "burger-buns-4pc",
    name: "Burger Buns (4 pc)",
    category: "artisan-breads",
    categoryName: "Artisan Breads [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Soft GF buns for burgers & sliders",
    image: imgBurgerBuns,
    unit: "Pack of 4 pc",
    rating: 4.7,
    isBestseller: false,
  },
  {
    id: "protein-fiber-buns-4pc",
    name: "Protein & Fiber Buns (4 pc)",
    category: "artisan-breads",
    categoryName: "Artisan Breads [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Nutritious, high-protein GF buns",
    image: imgProteinFiberBuns,
    unit: "Pack of 4 pc",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "pizza-base-8in",
    name: "Pizza Base (8 inch)",
    category: "artisan-breads",
    categoryName: "Artisan Breads [Gluten Free]",
    price: 250,
    priceDisplay: "₹250",
    description: "Ready-to-use gluten-free pizza base",
    image: imgPizzaBase,
    unit: "8-Inch Base",
    rating: 4.8,
    isBestseller: true,
  },
  {
    id: "brown-bread-loaf",
    name: "Brown Bread (575g / 700g)",
    category: "artisan-breads",
    categoryName: "Artisan Breads [Gluten Free]",
    price: 500,
    priceDisplay: "₹500 / ₹600",
    description: "Wholesome GF brown bread loaf",
    image: imgBrownBread,
    unit: "575g / 700g Loaf",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "white-bread-loaf",
    name: "White Bread (575g / 700g)",
    category: "artisan-breads",
    categoryName: "Artisan Breads [Gluten Free]",
    price: 500,
    priceDisplay: "₹500 / ₹600",
    description: "Soft, fluffy GF white bread loaf",
    image: imgWhiteBread,
    unit: "575g / 700g Loaf",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "focaccia-bread-500g",
    name: "Focaccia Bread (500g)",
    category: "artisan-breads",
    categoryName: "Artisan Breads [Gluten Free]",
    price: 600,
    priceDisplay: "₹600",
    description: "Italian-style GF focaccia with herbs & olive oil",
    image: imgFocacciaBread,
    unit: "500g Focaccia",
    rating: 5.0,
    isBestseller: true,
  },

  // ── 6. Tasty Treats [Gluten Free] ───────────────────────────
  {
    id: "samosa-4pc",
    name: "Samosa (4 pc)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Crispy, stuffed GF samosas",
    image: imgSamosa,
    unit: "Plate of 4 pc",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "paneer-tikka-4sticks",
    name: "Paneer Tikka (4 sticks)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 450,
    priceDisplay: "₹450",
    description: "Marinated, grilled paneer skewers",
    image: imgPaneerTikka,
    unit: "4 Grilled Skewers",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "pad-thai-noodles",
    name: "Pad Thai Noodles",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Flavourful GF noodles",
    image: imgPadThaiNoodles,
    unit: "1 Portion",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "pad-thai-pasta",
    name: "Pad Thai Pasta",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 450,
    priceDisplay: "₹450",
    description: "Flavourful GF pasta",
    image: imgPadThaiPasta,
    unit: "1 Portion",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "cheese-garlic-bread-8in",
    name: "Cheese Garlic Bread (8\")",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 370,
    priceDisplay: "₹370",
    description: "Garlicky, cheesy, golden perfection",
    image: imgCheeseGarlicBread,
    unit: "8-Inch Loaf",
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: "stuffed-garlic-bread-8in",
    name: "Stuffed Garlic Bread (8\")",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Filled with melty cheese & corn inside",
    image: imgStuffedGarlicBread,
    unit: "8-Inch Loaf",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "margherita-pizza-8in",
    name: "Margherita Pizza (8 inch)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Classic tomato sauce, mozzarella & fresh basil on GF crust",
    image: imgMargheritaPizza,
    unit: "8-Inch Pizza",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "veg-pizza-8in",
    name: "Veg Pizza (8 inch)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 450,
    priceDisplay: "₹450",
    description: "Onion, Capsicum, corn toppings on GF crust",
    image: imgVegPizza,
    unit: "8-Inch Pizza",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "paneer-pizza-8in",
    name: "Paneer Pizza (8 inch)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 500,
    priceDisplay: "₹500",
    description: "Paneer & Onion toppings on GF crust",
    image: imgPaneerPizza,
    unit: "8-Inch Pizza",
    rating: 4.9,
    isBestseller: false,
  },
  {
    id: "plain-paratha-2pc",
    name: "Plain Paratha (2 pcs)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 350,
    priceDisplay: "₹350",
    description: "Soft, gluten-free flatbread",
    image: imgPlainParatha,
    unit: "Set of 2 pcs",
    rating: 4.7,
    isBestseller: false,
  },
  {
    id: "stuff-paratha-2pc",
    name: "Stuff Paratha (2 pcs)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 400,
    priceDisplay: "₹400",
    description: "Aloo / Gobi / Mooli",
    image: imgStuffParatha,
    unit: "Set of 2 pcs",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "paneer-paratha-2pc",
    name: "Paneer Paratha (2 pcs)",
    category: "tasty-treats",
    categoryName: "Tasty Treats [Gluten Free]",
    price: 500,
    priceDisplay: "₹500",
    description: "Stuffed with spiced paneer",
    image: imgPaneerParatha,
    unit: "Set of 2 pcs",
    rating: 4.9,
    isBestseller: true,
  },

  // ── 7. Sweet Indulgences [Gluten Free] ───────────────────────
  {
    id: "milk-burfi-peda-modak-500g",
    name: "Milk Burfi / Peda / Modak (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 600,
    priceDisplay: "₹600",
    description: "Classic sweets crafted with Mawa (Khoya)",
    image: imgMilkBurfi,
    unit: "500g Box",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "besan-coconut-laddoos-500g",
    name: "Besan or Coconut Laddoos (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 600,
    priceDisplay: "₹600",
    description: "Traditional festive favorites",
    image: imgBesanLaddoos,
    unit: "500g Box",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "chocolate-burfi-500g",
    name: "Chocolate Burfi (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 600,
    priceDisplay: "₹600",
    description: "Fudgy chocolate twist on a classic",
    image: imgChocolateBurfi,
    unit: "500g Box",
    rating: 4.9,
    isBestseller: false,
  },
  {
    id: "kaju-burfi-peda-500g",
    name: "Kaju Burfi / Peda (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 850,
    priceDisplay: "₹850",
    description: "Silky smooth cashew delicacy",
    image: imgKajuBurfi,
    unit: "500g Box",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "kaju-modak-500g",
    name: "Kaju Modak (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 850,
    priceDisplay: "₹850",
    description: "Cashew-based festive delicacy",
    image: imgKajuModak,
    unit: "500g Box",
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: "chocolate-syrup-300ml",
    name: "Chocolate Syrup (300ml)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 360,
    priceDisplay: "₹360",
    description: "Rich homemade chocolate sauce",
    image: imgChocolateSyrup,
    unit: "300ml Jar",
    rating: 4.8,
    isBestseller: false,
  },
  {
    id: "homemade-plain-chocolate-500g",
    name: "Homemade Plain Chocolate (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 600,
    priceDisplay: "₹600",
    description: "Pure, smooth homemade chocolate",
    image: imgPlainChocolate,
    unit: "500g Box",
    rating: 4.9,
    isBestseller: false,
  },
  {
    id: "homemade-dry-fruit-chocolate-500g",
    name: "Homemade Dry Fruit Chocolate (500g)",
    category: "sweet-indulgences",
    categoryName: "Sweet Indulgences [Gluten Free]",
    price: 750,
    priceDisplay: "₹750",
    description: "Loaded with premium dry fruits",
    image: imgDryFruitChocolate,
    unit: "500g Box",
    rating: 5.0,
    isBestseller: true,
  },
]

export const TRUST_PILLARS = [
  {
    icon: "Sprout",
    title: "Let's Address Root Cause",
    description: "Wholesome certified sorghum, ragi, and almond flours to heal and nourish your gut naturally without inflammation."
  },
  {
    icon: "ShieldCheck",
    title: "Certified 100% Celiac Safe",
    description: "Meticulous sanitization and dedicated equipment certified safe for severe celiacs and wheat allergies."
  },
  {
    icon: "Smile",
    title: "Zero Bloat, Happy Gut",
    description: "Clean artisan bakes made with real butter and zero artificial binders, leaving your tummy light and energized."
  },
  {
    icon: "WheatOff",
    title: "100% Dedicated Gluten-Free",
    description: "Zero wheat, barley, or rye ever enters our bakery doors. 100% dedicated celiac-safe kitchen with lab-tested ingredients."
  }
]

export const CUSTOM_CAKES_SHOWCASE = [
  {
    id: "c1",
    title: "Tiered Ivory Botanical Cake",
    subtitle: "Textured ivory buttercream with edible fresh botanicals and ripe figs",
    image: customCake1Img,
    flavor: "Vanilla Berry & White Chocolate"
  },
  {
    id: "c2",
    title: "Belgian Chocolate Ganache Drip",
    subtitle: "Multi-layer chocolate sponge crowned with glossy drip, blackberries and gold leaf",
    image: customCake2Img,
    flavor: "Dark Chocolate Fudge"
  },
  {
    id: "c3",
    title: "Blush Meadow Pistachio Cake",
    subtitle: "Gentle blush and sage textured buttercream with roasted crushed pistachios",
    image: customCake3Img,
    flavor: "Rose Pistachio & Cardamom"
  }
]

export const FAQ_ITEMS = [
  {
    q: "How strictly is cross-contamination prevented in your kitchen?",
    a: "We operate a 100% dedicated gluten-free kitchen. No wheat, rye, or barley flours ever enter our facility. All mixing bowls, pans, silicon tools, and ovens are used exclusively for certified gluten-free ingredients, guaranteeing safety for individuals with severe Celiac disease."
  },
  {
    q: "How far in advance should I place my pre-order?",
    a: "Because our bakery relies on fresh small-batch baking without artificial stabilizers, we require 24 hours advance notice for standard breads, cookies, and tea loaves, and 48 hours for custom celebration cakes."
  },
  {
    q: "Do you offer eggless or refined sugar-free variations?",
    a: "Yes! Many of our bakes (including our artisan breads, pizzas, and select cookies) are naturally egg-free. For custom celebration cakes, please let us know during your WhatsApp enquiry and we will happily customize."
  },
  {
    q: "Where do you deliver and do you offer self-pickup?",
    a: "We are located at Hoodi Circle, ITPL Main Road, Whitefield, Bengaluru. Self-pickup is welcome, and we also arrange direct doorstep courier delivery across Bengaluru."
  }
]

export const SAMPLE_REVIEWS = [
  {
    id: "r1",
    author: "Ananya R.",
    badge: "Sample review",
    role: "Verified Celiac Customer • Whitefield",
    text: "Living with Celiac for 8 years in Bangalore, finding KGF was a revelation. The Belgian chocolate cake was so moist and rich that my guests couldn't believe it was gluten-free. Zero reactions, absolute bliss!",
    rating: 5
  },
  {
    id: "r2",
    author: "Vikram & Deepa S.",
    badge: "Sample review",
    role: "Custom Birthday Cake • Indiranagar",
    text: "The custom tiered celebration cake made our daughter's birthday unforgettable. The piped floral details were exquisite and booking via WhatsApp was so personal and effortless.",
    rating: 5
  },
  {
    id: "r3",
    author: "Pooja K.",
    badge: "Sample review",
    role: "Weekly Subscriber • HSR Layout",
    text: "The multigrain bread slices like a dream and toasts with that authentic crunch without falling apart. And the butter cookies are our evening tea essential. Exceptional craft!",
    rating: 5
  }
]

export const INSTAGRAM_GRID = [
  { id: "ig1", image: heroSpreadImg, caption: "Morning bake fresh from the oven" },
  { id: "ig2", image: customCake1Img, caption: "Custom 2-tier wedding milestone" },
  { id: "ig3", image: imgBrownBread, caption: "Seeded sourdough crust texture" },
  { id: "ig4", image: imgFudgeBrownie, caption: "Fudgy sea salt dark chocolate" },
  { id: "ig5", image: customCake2Img, caption: "Dark chocolate berry ganache drip" },
  { id: "ig6", image: imgButterCookies, caption: "Golden shortbread tea time" },
  { id: "ig7", image: imgCupCakes, caption: "Velvety blush buttercream swirls" },
  { id: "ig8", image: customCake3Img, caption: "Blush & pistachio celebration" },
  { id: "ig9", image: storyBakerImg, caption: "Crafted with passion in Whitefield" }
]

// WhatsApp Message Generator
export const createWhatsAppOrderLink = (productName, quantity = 1, extraNotes = '') => {
  const text = `Hello KGF Bakehouse! 🥖\n\nI would like to place an order from your website:\n• Item: ${productName}\n• Quantity: ${quantity}\n${extraNotes ? `• Notes: ${extraNotes}\n` : ''}\nPlease let me know availability and delivery time for Whitefield/Bengaluru. Thank you!`
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export const createCustomCakeWhatsAppLink = (details) => {
  const text = `Hello KGF Bakehouse! 🎂\n\nI would like to enquire about a Custom Celebration Cake:\n• Name: ${details.name || 'Customer'}\n• Occasion: ${details.occasion || 'Birthday'}\n• Target Date: ${details.date || 'Upcoming'}\n• Weight/Size: ${details.size || '1 kg'}\n• Flavor: ${details.flavor || 'Belgian Chocolate Ganache'}\n• Custom Message/Notes: ${details.message || 'Custom Design'}\n\nPlease share price estimate and availability. Thank you!`
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`
}

const fs = require('fs');

let content = fs.readFileSync('src/pages/HomePage.jsx', 'utf-8');

// 1. Update image imports to the exact sourdough, chocolate cake, and cupcake
content = content.replace(
  "import loafImg from '../assets/menu/brown-bread-loaf.jpg'",
  "import loafImg from '../assets/prod_multigrain_bread.jpg'"
);
content = content.replace(
  "import customCake1Img from '../assets/custom_cake_1.jpg'",
  "import customCake1Img from '../assets/custom_cake_2.jpg'"
);
content = content.replace(
  "import imgMuffins from '../assets/menu/muffins-6pc.jpg'",
  "import imgMuffins from '../assets/prod_cupcake.jpg'"
);

// 2. Expand FlourDustParticles
const oldParticlesRegex = /const particles = \[\s*\{ id: 1[\s\S]*?\{ id: 18[\s\S]*?\}\s*\];/;
const newParticles = `const particles = [
    { id: 1, top: '4%', left: '8%', delay: '0s', duration: '7.5s', size: 'w-2 h-2', bg: 'bg-white/75' },
    { id: 2, top: '15%', left: '22%', delay: '1.5s', duration: '9s', size: 'w-1.5 h-1.5', bg: 'bg-white/65' },
    { id: 3, top: '5%', left: '42%', delay: '3.2s', duration: '8s', size: 'w-2.5 h-2.5', bg: 'bg-white/80' },
    { id: 4, top: '22%', left: '62%', delay: '0.8s', duration: '10s', size: 'w-2 h-2', bg: 'bg-white/70' },
    { id: 5, top: '35%', left: '12%', delay: '2.2s', duration: '7s', size: 'w-1.5 h-1.5', bg: 'bg-white/65' },
    { id: 6, top: '12%', left: '80%', delay: '4s', duration: '8.5s', size: 'w-2 h-2', bg: 'bg-white/75' },
    { id: 7, top: '45%', left: '50%', delay: '1.8s', duration: '9.5s', size: 'w-2.5 h-2.5', bg: 'bg-white/80' },
    { id: 8, top: '28%', left: '32%', delay: '3.5s', duration: '6.8s', size: 'w-1.5 h-1.5', bg: 'bg-white/65' },
    { id: 9, top: '38%', left: '92%', delay: '1s', duration: '8.2s', size: 'w-2 h-2', bg: 'bg-white/70' },
    { id: 10, top: '55%', left: '18%', delay: '4.2s', duration: '9.2s', size: 'w-2 h-2', bg: 'bg-white/65' },
    { id: 11, top: '2%', left: '28%', delay: '2.5s', duration: '7.2s', size: 'w-2.5 h-2.5', bg: 'bg-white/80' },
    { id: 12, top: '48%', left: '72%', delay: '0.5s', duration: '10.5s', size: 'w-1.5 h-1.5', bg: 'bg-white/65' },
    { id: 13, top: '62%', left: '38%', delay: '3s', duration: '8.8s', size: 'w-2 h-2', bg: 'bg-white/75' },
    { id: 14, top: '18%', left: '52%', delay: '4.8s', duration: '7.8s', size: 'w-1.5 h-1.5', bg: 'bg-white/65' },
    { id: 15, top: '68%', left: '6%', delay: '1.2s', duration: '9s', size: 'w-2.5 h-2.5', bg: 'bg-white/80' },
    { id: 16, top: '32%', left: '24%', delay: '3.8s', duration: '8.4s', size: 'w-1.5 h-1.5', bg: 'bg-white/70' },
    { id: 17, top: '72%', left: '84%', delay: '2.6s', duration: '9s', size: 'w-2.5 h-2.5', bg: 'bg-white/65' },
    { id: 18, top: '50%', left: '94%', delay: '4.5s', duration: '7.5s', size: 'w-1.5 h-1.5', bg: 'bg-white/70' },
    { id: 19, top: '8%', left: '70%', delay: '1.1s', duration: '8.5s', size: 'w-2 h-2', bg: 'bg-white/75' },
    { id: 20, top: '25%', left: '88%', delay: '2.9s', duration: '9.8s', size: 'w-1.5 h-1.5', bg: 'bg-white/60' },
    { id: 21, top: '65%', left: '60%', delay: '3.7s', duration: '8.2s', size: 'w-2 h-2', bg: 'bg-white/70' },
    { id: 22, top: '42%', left: '4%', delay: '0.3s', duration: '7.6s', size: 'w-2 h-2', bg: 'bg-white/75' },
  ];`;

content = content.replace(oldParticlesRegex, newParticles);

fs.writeFileSync('src/pages/HomePage.jsx', content, 'utf-8');
console.log('HomePage.jsx successfully updated');

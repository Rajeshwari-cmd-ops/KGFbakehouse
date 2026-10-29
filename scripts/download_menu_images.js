import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuDir = path.join(__dirname, '..', 'src', 'assets', 'menu');
if (!fs.existsSync(menuDir)) {
  fs.mkdirSync(menuDir, { recursive: true });
}

// Map each product to a tailored, photorealistic Unsplash food photo
const IMAGES = {
  'butter-cookies': 'photo-1499636136210-6f4ee915583e', // butter cookies
  'ragi-cookies': 'photo-1558961363-fa8fdf82db35', // rustic wholesome cookies
  'muffins-6pc': 'photo-1586985289688-ca3cf47d3e6e', // blueberry muffins
  'cup-cakes-6pc': 'photo-1576618148400-f54bed99fcfd', // frosted cupcakes
  'pancake-2pc': 'photo-1528207776546-365bb710ee93', // fluffy pancakes with honey
  'chocolate-waffle': 'photo-1562376552-0d160a2f238d', // waffle with chocolate sauce
  'donuts-6pc': 'photo-1527515637462-cff94eecc1ac', // glazed donuts
  'tea-cake-300g': 'photo-1534432182912-63863115e106', // sliced golden tea cake
  'dry-fruit-tea-cake-300g': 'photo-1509440159596-0249088772ff', // dry fruit loaf
  'plain-cake-500g': 'photo-1578985545062-69928b1d9587', // moist vanilla cake
  'marble-cake-500g': 'photo-1606890737304-57a1ca8a5b62', // marble cake
  'fudge-brownie-400g': 'photo-1606313564200-e75d5e30476c', // fudge brownie
  'celebration-cake-500g': 'photo-1535141192574-5d4897c13136', // celebration cake
  'burger-buns-4pc': 'photo-1568901346375-23c9450c58cd', // glossy burger buns
  'protein-fiber-buns-4pc': 'photo-1589367920969-ab8e050bbb04', // seeded buns
  'pizza-base-8in': 'photo-1513104890138-7c749659a591', // pizza base crust
  'brown-bread-loaf': 'photo-1509440159596-0249088772ff', // brown bread loaf
  'white-bread-loaf': 'photo-1586444248902-2f64eddc13df', // white bread loaf
  'focaccia-bread-500g': 'photo-1627308595229-7830a5c91f9f', // rosemary focaccia
  'samosa-4pc': 'photo-1601050690597-df0568f70950', // crispy samosas
  'paneer-tikka-4sticks': 'photo-1567188040759-fb8a883dc6d8', // paneer tikka skewers
  'pad-thai-noodles': 'photo-1559847844-5315695dadae', // pad thai noodles
  'pad-thai-pasta': 'photo-1621996346565-e3d5d6281094', // creamy pasta
  'cheese-garlic-bread-8in': 'photo-1573140247632-f8fd74997d5c', // cheese garlic bread
  'stuffed-garlic-bread-8in': 'photo-1619895092538-128341789043', // stuffed garlic bread
  'margherita-pizza-8in': 'photo-1604382354936-07c5d9983bd3', // margherita pizza
  'veg-pizza-8in': 'photo-1565299624946-b28f40a0ae38', // veg pizza
  'paneer-pizza-8in': 'photo-1593560708920-61dd98c46a4e', // paneer pizza
  'plain-paratha-2pc': 'photo-1626777552726-4a6b54c97e46', // paratha flatbread
  'stuff-paratha-2pc': 'photo-1601050690597-df0568f70950', // stuffed paratha
  'paneer-paratha-2pc': 'photo-1567188040759-fb8a883dc6d8', // paneer paratha
  'milk-burfi-peda-modak-500g': 'photo-1599488615731-7e5c2823ff28', // milk burfi & peda
  'besan-coconut-laddoos-500g': 'photo-1605197148564-9273cba39d52', // round golden laddoos
  'chocolate-burfi-500g': 'photo-1582293041079-7814c2f12063', // chocolate burfi fudge
  'kaju-burfi-peda-500g': 'photo-1599488615731-7e5c2823ff28', // kaju katli
  'kaju-modak-500g': 'photo-1605197148564-9273cba39d52', // modak sweet dumplings
  'chocolate-syrup-300ml': 'photo-1541781774459-bb2af2f05b55', // chocolate syrup drip
  'homemade-plain-chocolate-500g': 'photo-1549007994-cb92caebd54b', // plain chocolate slabs
  'homemade-dry-fruit-chocolate-500g': 'photo-1548907040-4baa42d10919', // dry fruit chocolate bark
};

function downloadImage(photoId, filename) {
  return new Promise((resolve) => {
    const dest = path.join(menuDir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log(`[EXISTS] ${filename}`);
      return resolve(true);
    }

    const url = `https://images.unsplash.com/${photoId}?w=600&auto=format&fit=crop&q=85`;
    const file = fs.createWriteStream(dest);

    const handleReq = (targetUrl) => {
      https.get(targetUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return handleReq(res.headers.location);
        }
        if (res.statusCode !== 200) {
          console.error(`Failed ${filename}: HTTP ${res.statusCode}`);
          file.close();
          fs.unlinkSync(dest);
          return resolve(false);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`[DOWNLOADED] ${filename} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${filename}:`, err.message);
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve(false);
      });
    };

    handleReq(url);
  });
}

async function run() {
  console.log(`Starting download for ${Object.keys(IMAGES).length} menu images...`);
  for (const [key, photoId] of Object.entries(IMAGES)) {
    const filename = `${key}.jpg`;
    await downloadImage(photoId, filename);
  }
  console.log('All menu image downloads finished!');
}

run();

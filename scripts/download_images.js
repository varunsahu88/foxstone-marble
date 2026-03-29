import fs from 'fs';
import https from 'https';
import path from 'path';

const dir = 'public/assets/marbles';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  // Italian Classics
  { name: 'italian-classic-1.jpg', url: 'https://img.freepik.com/free-photo/close-up-white-marble-texture-background_53876-63512.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'italian-classic-2.jpg', url: 'https://img.freepik.com/free-photo/close-up-white-marble-textured-wall_53876-139849.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'italian-classic-3.jpg', url: 'https://img.freepik.com/free-photo/elegant-white-marble-texture-with-grey-veins_84443-73029.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'italian-classic-4.jpg', url: 'https://images.unsplash.com/photo-1659462391060-f9808509ca6a?q=80&w=2000' },
  { name: 'italian-classic-5.jpg', url: 'https://images.unsplash.com/photo-1590674678370-3b050ff06e35?q=80&w=2000' },

  // Exotic Brazilian
  { name: 'brazilian-exotic-1.jpg', url: 'https://img.freepik.com/free-photo/blue-gold-marble-textured-background_53876-101595.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'brazilian-exotic-2.jpg', url: 'https://img.freepik.com/free-vector/acid-marble-background_23-2148680161.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'brazilian-exotic-3.jpg', url: 'https://img.freepik.com/free-photo/blue-gold-marble-textured-background_53876-128500.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'brazilian-exotic-4.jpg', url: 'https://images.unsplash.com/photo-1603739592262-e66a6708e141?q=80&w=2000' },
  { name: 'brazilian-exotic-5.jpg', url: 'https://images.unsplash.com/photo-1719107647328-dd2134da4fa7?q=80&w=2000' },

  // Onyx & Translucent
  { name: 'onyx-translucent-1.jpg', url: 'https://img.freepik.com/premium-photo/onyx-marble-multicolored-vines-glass-effect-texture_1072903-5294.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'onyx-translucent-2.jpg', url: 'https://img.freepik.com/premium-photo/marble-onyx-light-grey-texture-background_464314-14286.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'onyx-translucent-3.jpg', url: 'https://img.freepik.com/premium-photo/onyx-marble-multicolored-vines-glass-effect-texture_1072903-4926.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'onyx-translucent-4.jpg', url: 'https://images.unsplash.com/photo-1643021055848-ef357056c330?q=80&w=2000' },
  { name: 'onyx-translucent-5.jpg', url: 'https://images.unsplash.com/photo-1766340407202-e9d45826c59b?q=80&w=2000' },

  // Earthy Tones
  { name: 'earthy-tone-1.jpg', url: 'https://img.freepik.com/free-photo/grungy-beige-marble-textured-background_53876-124564.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'earthy-tone-2.jpg', url: 'https://img.freepik.com/free-photo/peach-marble-texture_1194-7172.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'earthy-tone-3.jpg', url: 'https://img.freepik.com/free-photo/rustic-beige-concrete-textured-background_53876-101716.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'earthy-tone-4.jpg', url: 'https://images.unsplash.com/photo-1576444399940-00aa3823ec33?q=80&w=2000' },
  { name: 'earthy-tone-5.jpg', url: 'https://images.unsplash.com/photo-157644439221-3958742d174b?q=80&w=2000' },

  // Dark Luxury
  { name: 'dark-luxury-1.jpg', url: 'https://img.freepik.com/premium-photo/black-marble-natural-pattern-background-abstract-natural-marble-black-gold_1185936-1372.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'dark-luxury-2.jpg', url: 'https://img.freepik.com/free-photo/close-up-black-marble-textured-background_53876-63511.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'dark-luxury-3.jpg', url: 'https://img.freepik.com/free-photo/black-marbled-surface_53876-90798.jpg?semt=ais_hybrid&w=740&q=80' },
  { name: 'dark-luxury-4.jpg', url: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=2000' },
  { name: 'dark-luxury-5.jpg', url: 'https://images.unsplash.com/photo-1549411422-92262149463e?q=80&w=2000' },
  
  // Green / Verde (Extra)
  { name: 'verde-green-1.jpg', url: 'https://images.unsplash.com/photo-1594917631359-56608930438d?q=80&w=2000' },
  { name: 'verde-green-2.jpg', url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2000' },
  { name: 'verde-green-3.jpg', url: 'https://images.unsplash.com/photo-1615529162924-f74d32402208?q=80&w=2000' },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
  console.log('Starting download...');
  for (const img of images) {
    const dest = path.join(dir, img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, dest);
    } catch (err) {
      console.error(`Failed to download ${img.name}: ${err.message}`);
    }
  }
  console.log('Download complete.');
}

main();

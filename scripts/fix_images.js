import fs from 'fs';
import https from 'https';
import path from 'path';

const dir = 'public/assets/marbles';

const images = [
  { name: 'dark-luxury-5.jpg', url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000' },
  { name: 'earthy-tone-4.jpg', url: 'https://images.unsplash.com/photo-1616362258782-7511b61686ea?q=80&w=2000&auto=format&fit=crop' },
  { name: 'earthy-tone-5.jpg', url: 'https://images.unsplash.com/photo-1608501902687-d3beed3ca1f3?q=80&w=2000&auto=format&fit=crop' },
  { name: 'verde-green-1.jpg', url: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=1000' },
  { name: 'verde-green-3.jpg', url: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?auto=format&fit=crop&q=80&w=1000' },
  // Also replacing brazilian-exotic-2 just to be safe as it was small
  { name: 'brazilian-exotic-2.jpg', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 400) {
        reject(new Error(`Status ${response.statusCode}`));
        return;
      }
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
  console.log('Fixing broken images...');
  for (const img of images) {
    const dest = path.join(dir, img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, dest);
    } catch (err) {
      console.error(`Failed to download ${img.name}: ${err.message}`);
    }
  }
  console.log('Fix complete.');
}

main();

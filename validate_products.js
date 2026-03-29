import { products } from './src/data/products';

try {
  console.log(`Checking ${products.length} products...`);
  products.forEach((p, i) => {
    if (!p.id) throw new Error(`Product at index ${i} has no id`);
    if (!p.name) throw new Error(`Product ${p.id} has no name`);
    if (!p.price) throw new Error(`Product ${p.id} has no price`);
    if (!p.cat) throw new Error(`Product ${p.id} has no cat`);
    if (!p.image) throw new Error(`Product ${p.id} has no image`);
    if (!p.origin) throw new Error(`Product ${p.id} has no origin`);
    if (!p.finishes || !Array.isArray(p.finishes)) throw new Error(`Product ${p.id} has no finishes array`);
    if (!p.usages || !Array.isArray(p.usages)) throw new Error(`Product ${p.id} has no usages array`);
  });
  console.log('All products are valid!');
} catch (err) {
  console.error('Validation failed:', err.message);
  process.exit(1);
}

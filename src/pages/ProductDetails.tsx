import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, Truck, Gem, CheckCircle2, CreditCard } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { products } from '../data/products';
import { SlideReveal, ParallaxImage } from '../components/Animations';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/dashboard');
  };

  // Related: same category, exclude current product
  const sameCollection = products.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  
  // Cross-category picks: different category, shuffled
  const otherPicks = products.filter(p => p.cat !== product.cat).sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <PageWrapper itemKey={`product-${id}`}>
      <div className="pt-20 md:pt-28 pb-12 px-4 md:px-8 xl:px-12 max-w-[1400px] mx-auto min-h-screen">
        <Link to="/shop">
          <NeuButton variant="secondary" className="mb-6 md:mb-8 flex items-center gap-2 px-5 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary rounded-full">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Gallery
          </NeuButton>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Image */}
          <motion.div 
            layoutId={`product-image-${id}`}
            className="w-full lg:sticky lg:top-32 lg:w-1/2"
          >
            <NeuCard className="p-2 md:p-4 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-neu border border-primary/5 bg-bg-base">
               <ParallaxImage src={product.image} alt={product.name} className="w-full aspect-video md:aspect-[4/3] rounded-2xl md:rounded-[2rem] shadow-neu-pressed" />
            </NeuCard>
            
            <div className="grid grid-cols-4 gap-2 md:gap-3 mt-4 md:mt-6 px-1 md:px-2">
               {[1,2,3,4].map(i => (
                 <NeuCard key={i} className="p-1 md:p-1.5 rounded-lg md:rounded-xl group cursor-pointer hover:shadow-neu-pressed transition-all bg-bg-base border border-primary/5">
                    <img src={product.image} className="w-full aspect-square object-cover rounded-md md:rounded-lg opacity-40 group-hover:opacity-100 transition-opacity" />
                 </NeuCard>
               ))}
            </div>
          </motion.div>

          {/* Info */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-4">
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[9px] opacity-60"
              >
                {product.cat} COLLECTION
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold font-rubik leading-[1.1] tracking-tighter uppercase"
              >
                {product.name}
              </motion.h1>
              <div className="flex items-baseline gap-3">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-black text-primary tracking-tight"
                >
                  {product.price}
                </motion.p>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest italic opacity-60">Inclusive of Taxes</span>
              </div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-text-main/80 leading-relaxed font-nunito italic"
            >
              Exquisite {product.name} slab, hand-picked for its deep, lush veining. This piece belongs to our exclusive {product.cat} collection, representing the intersection of earthly raw beauty and artisanal perfection.
            </motion.p>

            <div className="grid grid-cols-2 gap-4 md:gap-6 py-4 md:py-8 border-y border-primary/10">
               {[
                 { label: 'Origin', value: product.origin || 'International' },
                 { label: 'Finishes', value: (product.finishes || []).join(', ') || 'Standard' },
                 { label: 'Thickness', value: '2cm / 3cm' },
                 { label: 'Usage', value: (product.usages || []).slice(0, 2).join(', ') || 'General' }
               ].map((spec, i) => (
                 <div key={i} className="space-y-0.5 md:space-y-1">
                    <p className="text-[8px] md:text-[9px] font-black text-primary/40 uppercase tracking-widest leading-none">{spec.label}</p>
                    <p className="text-xs md:text-sm font-bold text-text-main leading-tight">{spec.value}</p>
                 </div>
               ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
               <NeuButton 
                onClick={handleAddToCart}
                className={`${added ? 'bg-emerald-600' : 'bg-primary'} text-white flex-1 py-4 md:py-4 px-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 rounded-full shadow-lg h-14 md:h-16 transition-all`}
               >
                 {added ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                 {added ? 'Selected' : 'Add to Selection'}
               </NeuButton>
               <NeuButton 
                 onClick={handleBuyNow}
                 variant="white"
                 className="flex-1 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs tracking-[0.2em] h-14 md:h-16"
                >
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5" /> BUY NOW
                </NeuButton>
               <NeuButton variant="icon" className="w-14 h-14 md:w-16 md:h-16 bg-white/40 shadow-neu border border-primary/5 flex items-center justify-center rounded-full self-center sm:self-auto shrink-0">
                 <Gem className="w-5 h-5 text-primary" />
               </NeuButton>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-6 font-bold text-text-main/80">
              <div className="flex items-center gap-2 p-3 bg-bg-base rounded-xl border border-primary/5 shadow-neu-sm">
                <Shield className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[10px] leading-tight">Certified<br /><span className="text-[7px] text-slate-400 font-black tracking-widest uppercase">Quarry Direct</span></p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/30 rounded-xl border border-primary/5 shadow-neu-pressed">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <p className="text-[10px] leading-tight">Delivery<br /><span className="text-[7px] text-primary/40 font-black tracking-widest uppercase">Premium Logistics</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* From the Same Collection */}
        {sameCollection.length > 0 && (
          <section className="mt-24">
            <div className="mb-10">
              <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] mb-1">From the Same Quarry</p>
              <h2 className="text-2xl font-bold font-rubik tracking-tight text-text-main">More in {product.cat}</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {sameCollection.map((p, i) => (
                <SlideReveal key={p.id} direction="up" delay={i * 0.1}>
                  <Link to={`/product/${p.id}`}>
                    <motion.div whileHover={{ y: -6 }} className="group">
                      <NeuCard className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-bg-base border border-primary/5 space-y-2 md:space-y-3 h-full">
                        <div className="aspect-square rounded-lg md:rounded-xl overflow-hidden shadow-neu-pressed">
                          <ParallaxImage src={p.image} alt={p.name} className="w-full h-full" />
                        </div>
                        <div className="px-0.5 md:px-1 space-y-1">
                          <h3 className="text-[10px] md:text-sm font-bold font-rubik line-clamp-1 group-hover:text-primary transition-colors text-text-main">{p.name}</h3>
                          <p className="text-[10px] md:text-xs font-black text-primary">{p.price}</p>
                        </div>
                      </NeuCard>
                    </motion.div>
                  </Link>
                </SlideReveal>
              ))}
            </div>
          </section>
        )}

        {/* You May Also Love */}
        {otherPicks.length > 0 && (
          <section className="mt-20 pb-8">
            <div className="mb-10">
              <p className="text-[9px] font-black text-primary/40 uppercase tracking-[0.3em] mb-1">Curator's Recommendation</p>
              <h2 className="text-2xl font-bold font-rubik tracking-tight text-text-main">You May Also Love</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {otherPicks.map((p, i) => (
                <SlideReveal key={p.id} direction="up" delay={i * 0.05}>
                  <Link to={`/product/${p.id}`}>
                    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="group">
                      <NeuCard className="p-3 rounded-2xl bg-bg-base border border-primary/5 space-y-2">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-neu-pressed">
                          <ParallaxImage src={p.image} alt={p.name} className="w-full h-full" />
                        </div>
                        <div className="px-1">
                          <p className="text-[8px] font-black text-primary/30 uppercase tracking-widest">{p.cat}</p>
                          <h3 className="text-xs font-bold font-rubik line-clamp-1 group-hover:text-primary transition-colors text-text-main">{p.name}</h3>
                          <p className="text-xs font-black text-primary">{p.price}</p>
                        </div>
                      </NeuCard>
                    </motion.div>
                  </Link>
                </SlideReveal>
              ))}
            </div>
          </section>
        )}

      </div>
    </PageWrapper>
  );
};

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Mountain, ShieldCheck, PackageCheck, Palette } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { NeuButton } from '../components/NeuButton';
import { NeuCard } from '../components/NeuCard';
import { products } from '../data/products';
import { HeroParallax } from '../effects/HeroParallax';

import { ParallaxImage, SlideReveal } from '../components/Animations';

export const Home = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [direction, setDirection] = useState(0);

   const sliderItems = [
      { id: 1, title: "Discover the Elegance\nof Natural Marble", subtitle: "Explore our exquisite collection of premium Italian and global marbles for luxurious spaces.", image: "/assets/marbles/dark-luxury-2.jpg", cat: "Luxe Noir" },
      { id: 2, title: "Timeless Brazilian\nExotic Textures", subtitle: "Unique patterns that bring nature's wild elegance directly to your living interiors.", image: "/assets/marbles/brazilian-exotic-1.jpg", cat: "Brazilian Exotic" },
      { id: 3, title: "Modern Onyx\nLuminous Clarity", subtitle: "Translucent wonders that dance with light, creating an atmosphere of pure luxury.", image: "/assets/marbles/onyx-translucent-3.jpg", cat: "Modern Onyx" },
      { id: 4, title: "Earth & Rust\nRaw Warmth", subtitle: "Warm, earthy tones that ground your interiors with organic sophistication.", image: "/assets/marbles/earthy-tone-2.jpg", cat: "Earth & Rust" },
      { id: 5, title: "Midnight Galaxy\nDark Luxury", subtitle: "Deep, dramatic veining that transforms any surface into a work of art.", image: "/assets/marbles/dark-luxury-3.jpg", cat: "Luxe Noir" },
      { id: 6, title: "Emerald Forest\nVerde Green", subtitle: "Lush green marble with deep veining inspired by ancient forests.", image: "/assets/marbles/verde-green-2.jpg", cat: "Verde Green" },
      { id: 7, title: "Tiger Eye Onyx\nNature's Jewel", subtitle: "Rare onyx with mesmerizing bands of gold and amber tones.", image: "/assets/marbles/onyx-translucent-2.jpg", cat: "Modern Onyx" },
      { id: 8, title: "Fusion Wow\nBrazilian Marvel", subtitle: "A breathtaking fusion of colors found deep within Brazilian quarries.", image: "/assets/marbles/brazilian-exotic-2.jpg", cat: "Brazilian Exotic" },
      { id: 9, title: "Bronze Amani\nEarth Origins", subtitle: "Rich bronze veining with warm undertones for timeless elegance.", image: "/assets/marbles/earthy-tone-4.jpg", cat: "Earth & Rust" },
      { id: 10, title: "Obsidian Shadow\nAbsolute Dark", subtitle: "Pure darkness with subtle silver veins — the ultimate luxury statement.", image: "/assets/marbles/dark-luxury-4.jpg", cat: "Luxe Noir" },
      { id: 11, title: "Amazonite Crystal\nPrecious Stone", subtitle: "Exotic crystal formations that bring the beauty of the Amazon into your home.", image: "/assets/marbles/brazilian-exotic-3.jpg", cat: "Brazilian Exotic" },
      { id: 12, title: "Pink Cloud\nTranslucent Beauty", subtitle: "Ethereal translucent marble with soft pink and amber hues.", image: "/assets/marbles/onyx-translucent-4.jpg", cat: "Modern Onyx" },
      { id: 13, title: "Rustic Sienna\nTimeless Earth", subtitle: "Deep sienna tones with natural rustic character for bold interiors.", image: "/assets/marbles/earthy-tone-5.jpg", cat: "Earth & Rust" },
      { id: 14, title: "Black Ice\nDramatic Noir", subtitle: "Jet black marble with icy white veining for the most dramatic spaces.", image: "/assets/marbles/dark-luxury-5.jpg", cat: "Luxe Noir" },
      { id: 15, title: "Luminoso Gold\nBrazilian Treasure", subtitle: "Shimmering golden tones sourced from the heart of Brazil.", image: "/assets/marbles/brazilian-exotic-4.jpg", cat: "Brazilian Exotic" },
   ];

   const nextSlide = () => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
   };
   const prevSlide = () => {
      setDirection(-1);
      setCurrentSlide((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
   };

   useEffect(() => {
      const timer = setInterval(nextSlide, 6000);
      return () => clearInterval(timer);
   }, [currentSlide]);

   const greenMarbles = products.filter(p => p.cat === 'Verde Green');

   const slideVariants = {
      enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0.5, scale: 0.95 }),
      center: { x: 0, opacity: 1, scale: 1 },
      exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0.5, scale: 0.95 }),
   };

   return (
      <PageWrapper itemKey="home">
      <div className="pt-20 md:pt-24 px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto space-y-12 md:space-y-24">            {/* === HERO SLIDER === */}
            <HeroParallax>
              <section className="relative group">
                 <div className="absolute -left-12 2xl:-left-16 top-1/2 -translate-y-1/2 hidden xl:block z-20">
                    <NeuButton variant="icon" className="w-14 h-14 bg-white/60 hover:scale-110 active:scale-95 translate-x-4 group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100" onClick={prevSlide}>
                       <ChevronLeft className="w-8 h-8 text-primary" />
                    </NeuButton>
                 </div>

                 <div className="flex items-center gap-4 xl:gap-6">
                    <div className="hidden 2xl:block w-40 shrink-0 opacity-40 scale-90 overflow-hidden rounded-[3rem] shadow-neu-sm border border-white/20 aspect-[3/5] relative">
                       <AnimatePresence initial={false} custom={direction}>
                          <motion.img
                             key={`peek-left-${currentSlide}`}
                             src={sliderItems[(currentSlide - 1 + sliderItems.length) % sliderItems.length].image}
                             initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
                             transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                             className="absolute inset-0 w-full h-full object-cover"
                          />
                       </AnimatePresence>
                    </div>

                    <div className="flex-1">
                       <div className="relative aspect-square sm:aspect-video max-h-[700px] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-neu border border-primary/5">
                          <AnimatePresence initial={false} custom={direction} mode="popLayout">
                             <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                   x: { type: "tween", duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                                   opacity: { duration: 0.7, ease: "easeInOut" },
                                   scale: { duration: 0.9, ease: "easeOut" }
                                }}
                                className="absolute inset-0"
                             >
                                <img src={sliderItems[currentSlide].image} className="w-full h-full object-cover brightness-75 transition-transform duration-[10000ms]" alt="Hero Slide" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-12 bg-gradient-to-b from-black/20 via-black/10 to-black/40">
                                   <div className="space-y-3 md:space-y-6">
                                      <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} className="w-8 md:w-16 h-[1px] bg-white/50 mx-auto" />
                                      <motion.p initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }} className="text-[7px] md:text-[10px] font-light text-white/70 uppercase tracking-[0.4em] md:tracking-[0.6em] border border-white/20 px-3 md:px-6 py-1 md:py-1.5 rounded-full inline-block backdrop-blur-sm">
                                         {sliderItems[currentSlide].cat}
                                      </motion.p>
                                      <div className="space-y-1.5 md:space-y-2">
                                         {sliderItems[currentSlide].title.split('\n').map((line, idx) => (
                                            <motion.h1
                                               key={`${currentSlide}-${idx}`}
                                               initial={{ y: 60 + idx * 20, opacity: 0, filter: 'blur(10px)' }}
                                               animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                               transition={{ delay: 0.6 + idx * 0.2, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                                               className={`${idx === 0
                                                  ? 'text-lg sm:text-2xl md:text-5xl xl:text-6xl font-extralight tracking-wide text-white/90'
                                                  : 'text-2xl sm:text-3xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white'
                                                  } font-rubik leading-[1.1] md:leading-[1.15] drop-shadow-[0_4px_30_rgba(0,0,0,0.3)]`}
                                            >
                                               {line}
                                            </motion.h1>
                                         ))}
                                      </div>
                                      <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 1, delay: 1.1, ease: "easeOut" }} className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
                                      <motion.p initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 1.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }} className="text-white/60 font-light max-w-[240px] md:max-w-xl text-[10px] md:text-base lg:text-lg leading-relaxed italic tracking-wide">
                                         {sliderItems[currentSlide].subtitle}
                                      </motion.p>
                                   </div>
                                </div>
                             </motion.div>
                          </AnimatePresence>
                       </div>

                        <div className="flex flex-col items-center mt-6 gap-6">
                           <Link to="/shop" className="z-20">
                              <NeuButton variant="accent" className="px-14 py-6 text-[11px] font-black tracking-[0.3em] shadow-2xl">
                                 EXPLORE THE GALLERY
                              </NeuButton>
                           </Link>

                          <div className="flex justify-center gap-2.5">
                             {sliderItems.map((_, i) => (
                                <button
                                   key={i}
                                   onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }}
                                   className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-primary shadow-md' : 'w-1.5 bg-primary/20 hover:bg-primary/40'}`}
                                />
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="hidden 2xl:block w-40 shrink-0 opacity-40 scale-90 overflow-hidden rounded-[3rem] shadow-neu-sm border border-white/10 aspect-[3/5] relative">
                       <AnimatePresence initial={false} custom={direction}>
                          <motion.img
                             key={`peek-right-${currentSlide}`}
                             src={sliderItems[(currentSlide + 1) % sliderItems.length].image}
                             initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
                             transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                             className="absolute inset-0 w-full h-full object-cover"
                          />
                       </AnimatePresence>
                    </div>
                 </div>

                 <div className="absolute -right-12 2xl:-right-16 top-1/2 -translate-y-1/2 hidden xl:block z-20">
                    <NeuButton variant="icon" className="w-14 h-14 bg-white/60 hover:scale-110 active:scale-95 -translate-x-4 group-hover:translate-x-0 transition-all opacity-0 group-hover:opacity-100" onClick={nextSlide}>
                       <ChevronRight className="w-8 h-8 text-primary" />
                    </NeuButton>
                 </div>
              </section>
            </HeroParallax>

            {/* === OUR TOP SELLERS === */}
            <section>
               <div className="flex justify-between items-end mb-10 md:mb-12">
                   <div>
                      <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-2">Architectural Selection</p>
                      <h2 className="text-2xl md:text-5xl font-rubik tracking-tighter uppercase leading-[1.05]"><span className="font-extralight opacity-60">The World's</span> <br className="md:hidden" /><span className="font-bold">Top Sellers</span></h2>
                   </div>
               </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-12 max-w-[1400px] mx-auto">
              {greenMarbles.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <SlideReveal direction="up" delay={i * 0.1}>
                    <NeuCard interactive className="p-3 md:p-6 rounded-xl md:rounded-[2.5rem] bg-bg-base text-center space-y-3 md:space-y-6 border border-primary/5 shadow-neu hover:shadow-neu-pressed transition-all">
                      <div className="aspect-square md:aspect-[4/3] rounded-xl md:rounded-3xl overflow-hidden shadow-neu-pressed">
                         <ParallaxImage src={p.image} alt={p.name} className="w-full h-full" />
                      </div>
                      <div className="space-y-2">
                         <p className="text-[10px] md:text-sm font-black text-primary/40 uppercase tracking-[0.3em] font-rubik">{p.cat}</p>
                         <h3 className="text-sm md:text-2xl font-bold font-rubik tracking-tight leading-tight">{p.name}</h3>
                         <p className="text-[9px] md:text-sm text-text-main/70 font-medium">Ultra-premium collection for architectural excellence.</p>
                      </div>
                       <NeuButton variant="secondary" className="px-8 py-3 text-[9px] font-black tracking-widest uppercase">
                          View Slab
                       </NeuButton>
                    </NeuCard>
                  </SlideReveal>
                </Link>
              ))}
           </div>
            </section>

            {/* === SHOWROOM GALLERY WALL === */}
            <section>
               <div className="text-center mb-10 md:mb-16">
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.2 }} className="w-16 md:w-24 h-[1px] bg-accent/40 mx-auto mb-4 md:mb-8" />
                   <p className="text-[9px] md:text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-2 md:mb-4 italic opacity-80">The Curator's Showroom</p>
                   <h2 className="text-3xl md:text-5xl font-rubik tracking-tighter uppercase leading-[1.05]"><span className="font-extralight opacity-60 italic">A Journey Through</span> <br className="md:hidden" /><span className="font-bold">Nature's Art</span></h2>
               </div>
                 <div className="grid grid-cols-2 md:grid-cols-24 gap-2 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">
                   {/* Featured Large - Ultra Bento */}
                   <div className="md:col-span-12 md:row-span-2">
                    <Link to={`/product/ln1`} className="h-full block">
                       <SlideReveal direction="left" className="h-full">
                          <NeuCard className="h-full p-1.5 md:p-2.5 rounded-2xl md:rounded-[2.5rem] group overflow-hidden bg-bg-base/50 backdrop-blur-sm border border-white/20">
                             <div className="w-full h-full relative rounded-xl md:rounded-[1.8rem] overflow-hidden shadow-neu-pressed">
                                <ParallaxImage src="/assets/marbles/dark-luxury-1.jpg" alt="Nero Marquina" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute top-4 left-4">
                                   <div className="inline-block px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                      <p className="text-white/80 text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-black">Signature</p>
                                   </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 translate-y-0 sm:translate-y-6 opacity-100 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                   <h3 className="text-white font-serif italic text-xl md:text-3xl mb-1">Nero Marquina</h3>
                                   <p className="text-white/60 text-[9px] md:text-xs">Premium Spanish obsidian marble.</p>
                                </div>
                             </div>
                          </NeuCard>
                       </SlideReveal>
                    </Link>
                   </div>

                   {/* Secondary Items Ultra-Dense Staggered */}
                   {[
                      { img: '/assets/marbles/brazilian-exotic-3.jpg', name: 'Amazonite', id: 'be3', col: 'md:col-span-6', row: 'md:row-span-1' },
                      { img: '/assets/marbles/onyx-translucent-1.jpg', name: 'Honey Onyx', id: 'mo1', col: 'md:col-span-6', row: 'md:row-span-1' },
                      { img: '/assets/marbles/earthy-tone-3.jpg', name: 'Crema Marfil', id: 'er3', col: 'md:col-span-6', row: 'md:row-span-1' },
                      { img: '/assets/marbles/brazilian-exotic-2.jpg', name: 'Fusion Wow', id: 'be2', col: 'md:col-span-6', row: 'md:row-span-1' },
                      { img: '/assets/marbles/verde-green-1.jpg', name: 'Rainforest', id: 'vg1', col: 'md:col-span-5', row: 'md:row-span-1' },
                      { img: '/assets/marbles/italian-classic-1.jpg', name: 'Carrara', id: 'ic1', col: 'md:col-span-7', row: 'md:row-span-1' },
                      { img: '/assets/marbles/onyx-translucent-2.jpg', name: 'Tiger Eye', id: 'mo2', col: 'md:col-span-4', row: 'md:row-span-1' },
                      { img: '/assets/marbles/verde-green-2.jpg', name: 'Emerald', id: 'vg2', col: 'md:col-span-8', row: 'md:row-span-1' },
                      { img: '/assets/marbles/dark-luxury-3.jpg', name: 'Black Ice', id: 'ln3', col: 'md:col-span-5', row: 'md:row-span-1' },
                      { img: '/assets/marbles/brazilian-exotic-4.jpg', name: 'Luminoso', id: 'be4', col: 'md:col-span-7', row: 'md:row-span-1' },
                      { img: '/assets/marbles/onyx-translucent-3.jpg', name: 'Modern Onyx', id: 'mo3', col: 'md:col-span-6', row: 'md:row-span-1' },
                      { img: '/assets/marbles/earthy-tone-4.jpg', name: 'Bronze Amani', id: 'er4', col: 'md:col-span-6', row: 'md:row-span-1' },
                   ].map((item, i) => (
                      <div key={i} className={`${item.col} ${item.row}`}>
                        <Link to={`/product/${item.id}`} className="h-full block">
                            <SlideReveal direction="up" delay={i * 0.08} className="h-full">
                               <NeuCard className="h-full p-1.5 md:p-2 rounded-xl md:rounded-[1.4rem] group overflow-hidden bg-bg-base/50 backdrop-blur-sm border border-white/10">
                                  <div className="w-full h-full relative rounded-lg md:rounded-[1.1rem] overflow-hidden shadow-neu-pressed">
                                     <ParallaxImage src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]" />
                                     <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <p className="text-white font-bold text-[8px] md:text-xs font-rubik leading-tight line-clamp-1">{item.name}</p>
                                        <div className="h-[1px] w-0 group-hover:w-full bg-cta/60 transition-all duration-500 mt-1" />
                                     </div>
                                  </div>
                               </NeuCard>
                            </SlideReveal>
                        </Link>
                      </div>
                   ))}
                </div>



            </section>

            {/* === CINEMATIC SPOTLIGHT === */}
            <section>
               <div className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden relative">
                  <SlideReveal direction="up" className="aspect-video md:aspect-[21/9] w-full relative">
                     <ParallaxImage src="/assets/marbles/dark-luxury-2.jpg" alt="Spotlight" className="w-full h-full brightness-50 md:brightness-50" />
                  </SlideReveal>
                  <div className="absolute inset-0 flex items-center">
                     <div className="px-6 md:px-16 max-w-3xl space-y-3 md:space-y-6">
                        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-8 md:w-16 h-[1px] bg-white/40 origin-left" />
                        <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[7px] md:text-[10px] text-white/60 uppercase tracking-[0.4em] md:tracking-[0.5em] font-light">Signature Collection</motion.p>
                        <motion.h2 initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className="text-2xl md:text-6xl font-rubik text-white leading-[1.1]">
                           <span className="font-extralight text-xl md:text-5xl">The Art of</span><br />
                           <span className="font-bold">Dark Luxury</span>
                        </motion.h2>
                        <motion.p initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-white/50 text-[10px] md:text-sm leading-relaxed font-light max-w-[200px] md:max-w-lg italic">
                           Our Luxe Noir collection features the world's most dramatic marbles.
                        </motion.p>
                        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
                           <Link to="/shop">
                              <button className="px-5 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm">
                                 Explore Collection
                              </button>
                           </Link>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </section>

            {/* === BROWSE BY CATEGORY === */}
            <section>
               <div className="flex justify-between items-end mb-12">
                  <div>
                     <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-2">Browse Collections</p>
                     <h2 className="text-2xl font-bold font-rubik tracking-tight uppercase">Shop by Category</h2>
                  </div>
                  <Link to="/shop" className="text-[10px] md:text-xs font-black text-primary uppercase tracking-widest hover:underline">View All →</Link>
               </div>
                 <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-8">
                   {[
                      { name: 'Italian Classico', image: '/assets/marbles/italian-classic-1.jpg', count: 5 },
                      { name: 'Brazilian Exotic', image: '/assets/marbles/brazilian-exotic-1.jpg', count: 5 },
                      { name: 'Modern Onyx', image: '/assets/marbles/onyx-translucent-1.jpg', count: 5 },
                      { name: 'Earth & Rust', image: '/assets/marbles/earthy-tone-1.jpg', count: 5 },
                      { name: 'Luxe Noir', image: '/assets/marbles/dark-luxury-1.jpg', count: 5 },
                      { name: 'Verde Green', image: '/assets/marbles/verde-green-1.jpg', count: 3 },
                   ].map((cat, i) => (
                      <Link key={cat.name} to="/shop">
                         <SlideReveal direction="up" delay={i * 0.1}>
                            <motion.div 
                               whileHover={{ y: -12, scale: 1.05 }}
                               transition={{ type: "spring", stiffness: 300, damping: 20 }}
                               className="group"
                            >
                               <NeuCard className="aspect-[4/5] rounded-3xl p-1.5 md:p-2.5 bg-bg-base/40 backdrop-blur-sm border border-white/20 hover:shadow-neu-pressed transition-all overflow-hidden relative">
                                  <div className="w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-neu-pressed relative">
                                     <ParallaxImage src={cat.image} alt={cat.name} className="w-full h-full brightness-90 group-hover:brightness-110 transition-all duration-500" />
                                     
                                     {/* Glassmorphic Label */}
                                     <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 p-3 md:p-4 bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-[1.5rem] border border-white/20 shadow-xl group-hover:bg-white/20 transition-all duration-500">
                                        <h3 className="text-white font-bold text-[9px] md:text-sm font-rubik tracking-tight leading-none mb-1">{cat.name}</h3>
                                        <div className="flex justify-between items-center">
                                           <p className="text-white/50 text-[7px] md:text-[9px] uppercase tracking-widest font-black leading-none">{cat.count} Varieties</p>
                                           <div className="w-4 h-4 md:w-6 md:h-6 bg-cta/40 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-cta/80 transition-colors">
                                              <ChevronRight className="w-2 md:w-4 h-2 md:h-4 text-white" />
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </NeuCard>
                            </motion.div>
                         </SlideReveal>
                      </Link>
                   ))}
                </div>
            </section>

            {/* === THE ROXSTONE EXPERIENCE === */}
            <section>
               <div className="text-center mb-10 md:mb-16">
                  <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-2">The Roxstone Promise</p>
                  <h2 className="text-2xl md:text-3xl font-rubik tracking-tight uppercase"><span className="font-extralight">Why Architects</span> <span className="font-bold">Trust Us</span></h2>
               </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {[
                     { icon: Mountain, title: 'Quarry Direct', desc: 'Sourced from the world\'s finest quarries — Italy, Brazil, Turkey, and India.' },
                     { icon: ShieldCheck, title: 'Quality Certified', desc: 'Every slab graded for density, porosity, and veining consistency.' },
                     { icon: PackageCheck, title: 'White-Glove Delivery', desc: 'Climate-controlled transport with custom crating worldwide.' },
                     { icon: Palette, title: 'Design Studio', desc: 'Free consultation with our in-house marble design experts.' },
                  ].map((feature, i) => (
                     <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                        <NeuCard className="p-8 rounded-[2rem] bg-bg-base text-center space-y-4 border border-primary/5 h-full">
                           <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto shadow-neu-sm border border-primary/10">
                              <feature.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                           </div>
                           <h3 className="text-lg font-bold font-rubik">{feature.title}</h3>
                           <p className="text-xs text-text-main/70 leading-relaxed">{feature.desc}</p>
                        </NeuCard>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* === CURATOR'S FAVORITES - EDITORIAL GALLERY === */}
            <section className="space-y-4 md:space-y-8">
                <div className="text-center mb-8 md:mb-10">
                   <p className="text-[9px] md:text-[10px] font-black text-primary/40 uppercase tracking-[0.4em] mb-2 md:mb-3">Hand Selected</p>
                   <h2 className="text-3xl md:text-4xl font-rubik tracking-tight"><span className="font-extralight">Curator's</span> <span className="font-bold">Favorites</span></h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[150px]">
                   {/* Featured Editorial Piece */}
                   <div className="col-span-2 md:col-span-4 lg:col-span-8 row-span-2">
                     <Link to="/product/be1" className="h-full block">
                        <SlideReveal direction="left" className="h-full">
                           <div className="rounded-2xl md:rounded-[2.5rem] h-full overflow-hidden relative group shadow-neu-sm border border-primary/5">
                              <ParallaxImage src="/assets/marbles/brazilian-exotic-1.jpg" alt="Azul Macaubas" className="w-full h-full brightness-90 group-hover:brightness-100 transition-all" />
                              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                 <p className="text-[7px] md:text-[9px] text-white/50 uppercase tracking-[0.4em] font-light mb-1">Brazilian Exotic</p>
                                 <p className="text-sm md:text-2xl font-rubik text-white font-bold">Azul Macaubas</p>
                              </div>
                           </div>
                        </SlideReveal>
                     </Link>
                   </div>

                   {/* Secondary Favorites - Tightly Packed */}
                   {[
                      { img: '/assets/marbles/onyx-translucent-3.jpg', name: 'Emerald Onyx', id: 'mo3', span: 'col-span-1 md:col-span-2 lg:col-span-4 row-span-1' },
                      { img: '/assets/marbles/earthy-tone-5.jpg', name: 'Rustic Sienna', id: 'er5', span: 'col-span-1 md:col-span-2 lg:col-span-4 row-span-1' },
                      { img: '/assets/marbles/dark-luxury-3.jpg', name: 'Midnight Galaxy', id: 'ln3', span: 'col-span-1 md:col-span-2 lg:col-span-4 row-span-1' },
                      { img: '/assets/marbles/brazilian-exotic-4.jpg', name: 'Luminoso Gold', id: 'be4', span: 'col-span-2 md:col-span-3 lg:col-span-6 row-span-1' },
                      { img: '/assets/marbles/onyx-translucent-2.jpg', name: 'Tiger Eye Onyx', id: 'mo2', span: 'col-span-2 md:col-span-3 lg:col-span-6 row-span-1' },
                   ].map((item, i) => (
                      <div key={i} className={`${item.span}`}>
                         <Link to={`/product/${item.id}`} className="h-full block">
                            <SlideReveal direction="up" delay={i * 0.1} className="h-full">
                               <div className="rounded-xl md:rounded-2xl h-full overflow-hidden relative group shadow-neu-sm border border-primary/5">
                                  <ParallaxImage src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                     <p className="text-white font-rubik font-bold text-[8px] md:text-sm">{item.name}</p>
                                  </div>
                               </div>
                            </SlideReveal>
                         </Link>
                      </div>
                   ))}
                </div>
             </section>

            {/* === TESTIMONIALS === */}
            <section>
               <div className="text-center mb-10 md:mb-16">
                  <p className="text-[9px] md:text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-2">Client Stories</p>
                  <h2 className="text-2xl md:text-3xl font-rubik tracking-tight"><span className="font-extralight">What Our Clients</span> <span className="font-bold">Say</span></h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                  {[
                     { name: 'Priya Sharma', role: 'Interior Designer, Mumbai', text: '"Roxstone transformed our entire project. The Calacatta Borghini they sourced was absolutely perfect — museum quality."' },
                     { name: 'Marco Rossi', role: 'Architect, Milan', text: '"Working with Roxstone is like having a personal curator. Their Brazilian Exotic collection is unlike anything I\'ve seen."' },
                     { name: 'Sarah Chen', role: 'Homeowner, Singapore', text: '"From selection to installation, Roxstone made the entire process seamless. Our Nero Marquina kitchen island is stunning."' },
                  ].map((review, i) => (
                     <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                        <NeuCard className="p-6 md:p-8 rounded-[2rem] bg-bg-base space-y-4 md:space-y-5 border border-primary/5 h-full">
                           <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map(j => <span key={j} className="text-primary text-[10px] md:text-sm">★</span>)}
                           </div>
                           <p className="text-xs md:text-sm text-text-main/80 leading-relaxed italic">{review.text}</p>
                           <div className="pt-4 border-t border-primary/5">
                              <p className="text-xs md:text-sm font-bold font-rubik">{review.name}</p>
                              <p className="text-[8px] md:text-[10px] text-text-main/40 font-black uppercase tracking-widest">{review.role}</p>
                           </div>
                        </NeuCard>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* === STATS BAR === */}
            <section>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 border-y border-primary/5">
                  {[
                     { number: '500+', label: 'Marble Varieties' },
                     { number: '12', label: 'Global Quarries' },
                     { number: '2,000+', label: 'Projects Completed' },
                     { number: '98%', label: 'Client Satisfaction' },
                  ].map((stat, i) => (
                     <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center py-4 md:py-10">
                        <p className="text-2xl md:text-4xl font-black font-rubik text-primary mb-1 md:mb-2">{stat.number}</p>
                        <p className="text-[7px] md:text-[10px] font-black text-text-main/40 uppercase tracking-[0.2em]">{stat.label}</p>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* === CTA BANNER === */}
            <section className="pb-8">
               <SlideReveal direction="up" duration={1} className="w-full">
                  <NeuCard className="p-1.5 md:p-3 rounded-[2.5rem] md:rounded-[4rem] bg-bg-base overflow-hidden relative group shadow-2xl border border-primary/5">
                      <div className="relative aspect-[21/9] md:h-[450px] w-full rounded-[2rem] md:rounded-[3.2rem] overflow-hidden">
                        {/* Dynamic Cinematic Background */}
                        <div className="absolute inset-x-0 inset-y-0 z-0">
                           <ParallaxImage 
                             src="/assets/marbles/dark-luxury-4.jpg" 
                             alt="Luxury Background" 
                             className="w-full h-full brightness-[0.3] md:brightness-[0.4] scale-105 group-hover:scale-110 transition-transform duration-[10000ms]" 
                           />
                           <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-black/60" />
                        </div>
                        
                        {/* Content Overlay */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 md:p-12 space-y-4 md:space-y-8">
                           <div className="space-y-2 md:space-y-4 max-w-4xl">
                              <motion.div 
                                initial={{ scaleX: 0 }} 
                                whileInView={{ scaleX: 1 }} 
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="w-12 md:w-20 h-[2px] bg-white/30 mx-auto" 
                              />
                              <p className="text-[8px] md:text-[10px] font-black text-accent uppercase tracking-[0.6em] italic">Private Showroom Experience</p>
                              
                              <h2 className="text-3xl md:text-7xl font-rubik text-white tracking-tighter leading-[0.95] text-balance">
                                 <span className="font-extralight opacity-80 italic">Ready to</span> <br className="md:hidden" />
                                 <span className="font-bold relative inline-block">
                                    Transform Your Space
                                 </span>
                              </h2>
                              
                              <p className="text-[10px] md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-light italic">
                                 Unlock exclusive access to our hand-curated collection of Earth's rarest natural stones.
                              </p>
                           </div>
                           
                           <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 w-full sm:w-auto">
                              <Link to="/shop" className="w-full sm:w-auto">
                                 <NeuButton className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-6 text-[10px] font-black tracking-widest bg-white text-primary hover:scale-[1.02] shadow-2xl">
                                    ENTER GALLERY
                                 </NeuButton>
                              </Link>
                              <button className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-6 text-[10px] font-black tracking-widest text-white border border-white/20 hover:bg-white/10 backdrop-blur-md transition-all rounded-full">
                                 BOOK CONSULTATION
                              </button>
                           </div>
                        </div>
                      </div>
                   </NeuCard>
               </SlideReveal>
            </section>

         </div>
      </PageWrapper>
   );
};

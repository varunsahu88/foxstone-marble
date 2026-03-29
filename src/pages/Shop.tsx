import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ShoppingCart, Search, ArrowRight, PackageOpen } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { FilterSidebar, type ActiveFilters } from '../components/FilterSidebar';
import { products } from '../data/products';
import { SlideReveal, ParallaxImage } from '../components/Animations';

// Location to Country Mapping
const locationMap: Record<string, string> = {
  'milan': 'Italy', 'carrara': 'Italy', 'rome': 'Italy', 'florence': 'Italy', 'venice': 'Italy',
  'rio': 'Brazil', 'sao paulo': 'Brazil', 'vitoria': 'Brazil',
  'jaipur': 'India', 'udaipur': 'India', 'rajasthan': 'India', 'kishangarh': 'India', 'makrana': 'India',
  'madrid': 'Spain', 'barcelona': 'Spain', 'alicante': 'Spain',
  'istanbul': 'Turkey', 'afyon': 'Turkey',
  'cairo': 'Egypt',
  'mexico city': 'Mexico'
};

export const Shop = () => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('rarity');
  const [filters, setFilters] = useState<ActiveFilters>({
    categories: [],
    finishes: [],
    usages: [],
    priceRange: [5000, 60000]
  });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search Logic
      const query = searchQuery.toLowerCase();
      const mappedCountry = locationMap[query];
      
      const matchesSearch = !searchQuery || 
        p.name.toLowerCase().includes(query) || 
        p.cat.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query) ||
        (mappedCountry && p.origin.toLowerCase() === mappedCountry.toLowerCase());

      // Filter Logic
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(p.cat);
      const matchesFinish = filters.finishes.length === 0 || p.finishes.some(f => filters.finishes.includes(f));
      const matchesUsage = filters.usages.length === 0 || p.usages.some(u => filters.usages.includes(u));
      
      // Safe price parsing
      const getNumericPrice = (pStr: string) => {
        if (!pStr) return 0;
        const cleaned = pStr.replace(/[^\d]/g, '');
        return cleaned ? parseInt(cleaned) : 0;
      };

      const price = getNumericPrice(p.price);
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesFinish && matchesUsage && matchesPrice;
    }).sort((a, b) => {
      const getNumericPrice = (pStr: string) => {
        if (!pStr) return 0;
        const cleaned = pStr.replace(/[^\d]/g, '');
        return cleaned ? parseInt(cleaned) : 0;
      };

      const priceA = getNumericPrice(a.price);
      const priceB = getNumericPrice(b.price);

      if (sortOrder === 'low-high') return priceA - priceB;
      if (sortOrder === 'high-low') return priceB - priceA;
      return 0; // Default Rarity/Original Sort
    });
  }, [searchQuery, filters, sortOrder]);

  return (
    <PageWrapper itemKey="shop">
      <div className="pt-28 md:pt-40 pb-16 px-4 md:px-8 xl:px-12 max-w-[1700px] mx-auto min-h-screen">
        
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
          <SlideReveal direction="left">
            <div>
              <h1 className="text-4xl md:text-7xl font-black text-primary mb-4 md:mb-6 tracking-tight">Stone Gallery</h1>
              <p className="text-primary/40 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Curated Forest Jade Selection</p>
            </div>
          </SlideReveal>
          
          <SlideReveal direction="right" delay={0.2}>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-80 xl:w-96">
                <Search className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-primary/40 w-3.5 h-3.5 md:w-4 md:h-4" />
                <input 
                  type="text" 
                  placeholder="Find your texture..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-base/60 backdrop-blur-md shadow-neu-pressed rounded-full py-3.5 md:py-4 pl-12 md:pl-14 pr-4 border border-white/20 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-black text-[9px] md:text-[10px] uppercase tracking-widest text-primary placeholder:text-primary/20"
                />
              </div>
              <NeuButton 
                variant="icon" 
                className="md:hidden w-11 h-11 shrink-0 bg-white/60 backdrop-blur-md"
                onClick={() => setShowMobileFilter(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </NeuButton>
            </div>
          </SlideReveal>
        </div>

        <div className="flex gap-8 xl:gap-12 2xl:gap-16 relative flex-col md:flex-row">
          {/* Desktop Filter */}
          <aside className="hidden md:block w-64 lg:w-72 xl:w-80 shrink-0">
            <SlideReveal direction="left" delay={0.2}>
              <FilterSidebar activeFilters={filters} onFilterChange={setFilters} />
            </SlideReveal>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
             <SlideReveal direction="down" delay={0.4}>
              <div className="flex justify-between items-center mb-6 md:mb-10 bg-white/30 backdrop-blur-md p-3 md:p-4 px-5 md:px-8 rounded-2xl md:rounded-3xl shadow-neu-sm border border-white/40">
                <p className="text-slate-500 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em]">{filteredProducts.length} Results</p>
                <div className="flex items-center gap-2 md:gap-3">
                  <select 
                     value={sortOrder}
                     onChange={(e) => setSortOrder(e.target.value)}
                     className="bg-transparent font-black text-primary outline-none cursor-pointer text-[8px] md:text-[10px] uppercase tracking-widest appearance-none pr-3"
                  >
                    <option value="rarity">Featured</option>
                    <option value="low-high">Price ↑</option>
                    <option value="high-low">Price ↓</option>
                  </select>
                </div>
              </div>
             </SlideReveal>

             {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-8 xl:gap-10"
                >
                  {filteredProducts.map((p, i) => (
                    <SlideReveal key={p.id} direction="up" delay={i * 0.05} duration={0.8}>
                       <Link to={`/product/${p.id}`}>
                         <NeuCard interactive className="group p-3 md:p-5 flex flex-col h-full bg-bg-base/40 backdrop-blur-md border border-primary/10 rounded-2xl md:rounded-[3rem]">
                            <motion.div 
                              layoutId={`product-image-${p.id}`}
                              className="aspect-[1/1.1] md:aspect-square rounded-xl md:rounded-[2.5rem] overflow-hidden mb-2 md:mb-6 shadow-neu-pressed relative"
                            >
                               <ParallaxImage src={p.image} alt={p.name} className="w-full h-full group-hover:scale-110 transition-transform duration-1000" />
                               <div className="absolute top-2 right-2 md:top-4 md:right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                  <NeuButton variant="icon" className="w-7 h-7 md:w-11 md:h-11 bg-white/90 shadow-md">
                                    <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                                  </NeuButton>
                               </div>
                               <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                                 <span className="bg-white/80 backdrop-blur-md px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[6px] md:text-[8px] font-black uppercase tracking-widest text-primary shadow-sm border border-white/20">
                                   {p.origin}
                                 </span>
                               </div>
                            </motion.div>
                            <div className="px-1 md:px-2 space-y-1 md:space-y-2 flex-1">
                               <p className="text-[7px] md:text-[9px] font-black text-primary/40 uppercase tracking-[0.2em]">{p.cat}</p>
                               <h3 className="text-xs md:text-xl font-bold font-rubik text-text-main group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                               <div className="flex flex-wrap gap-1 md:gap-2 pt-1 md:pt-2">
                                 {p.finishes.slice(0, 1).map(f => (
                                   <span key={f} className="text-[5px] md:text-[7px] font-black uppercase tracking-tighter text-slate-400 border border-slate-200 px-1 py-0.5 rounded-sm">{f}</span>
                                 ))}
                               </div>
                            </div>
                            <div className="mt-2 md:mt-8 pt-2 md:pt-6 border-t border-slate-200/50 flex items-center justify-between px-0.5 md:px-2">
                               <span className="text-sm md:text-lg font-black text-primary tracking-tight">{p.price}</span>
                               <NeuButton variant="icon" className="w-6 h-6 md:w-8 md:h-8 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all bg-primary/10">
                                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                               </NeuButton>
                            </div>
                         </NeuCard>
                       </Link>
                    </SlideReveal>
                  ))}
                </motion.div>
             ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 md:py-32 space-y-4 md:space-y-6"
                >
                  <div className="p-6 md:p-8 bg-white/30 rounded-full shadow-neu-sm border border-white/40">
                    <PackageOpen className="w-12 h-12 md:w-16 md:h-16 text-primary/20" />
                  </div>
                  <div className="text-center space-y-1 md:space-y-2 px-6">
                    <h3 className="text-xl md:text-2xl font-bold text-text-main">No Treasures Found</h3>
                    <p className="text-slate-500 text-xs md:text-sm max-w-xs mx-auto">Try adjusting your filters or search query to find the perfect stone.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        categories: [],
                        finishes: [],
                        usages: [],
                        priceRange: [5000, 60000]
                      });
                    }}
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all"
                  >
                    Reset All Discovery
                  </button>
                </motion.div>
             )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilter && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilter(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-xl z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-bg-base z-[101] p-6 md:p-8 shadow-2xl flex flex-col border-l border-white/20"
            >
              <div className="flex-1 overflow-y-auto pr-1">
                <FilterSidebar 
                  activeFilters={filters} 
                  onFilterChange={setFilters} 
                  onClose={() => setShowMobileFilter(false)} 
                />
              </div>
              <div className="pt-6 mt-4 border-t border-primary/10">
                <NeuButton 
                  className="w-full h-12 rounded-full font-black text-[10px] uppercase tracking-widest shadow-neu"
                  onClick={() => setShowMobileFilter(false)}
                >
                  Confirm Selection
                </NeuButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

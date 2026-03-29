import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, Search, User, Mountain, X, ArrowRight } from 'lucide-react';
import { NeuButton } from './NeuButton';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
  ];

  const menuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    open: { opacity: 1, scale: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          paddingTop: isScrolled ? '10px' : '15px',
          paddingBottom: isScrolled ? '10px' : '15px',
          width: isScrolled ? 'clamp(320px, 92%, 1200px)' : 'clamp(320px, 96%, 1400px)',
        }}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 ease-[0.25, 0.1, 0.25, 1]
          ${isScrolled 
            ? 'bg-bg-base/80 backdrop-blur-2xl shadow-2xl border-white/50 border rounded-full mt-4' 
            : 'bg-transparent mt-0'
          }`}
      >
        <div className="w-full flex items-center justify-between px-5 md:px-10 lg:px-14">
          <Link to="/" className="text-xl font-bold font-rubik text-primary tracking-tighter flex items-center gap-2 md:gap-3 group shrink-0">
             <motion.div 
               whileHover={{ scale: 1.1, rotate: 15 }}
               transition={{ type: 'spring', stiffness: 300, damping: 15 }}
               className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary/10 shadow-neu-sm flex items-center justify-center border border-primary/20 group-hover:bg-primary/20"
             >
               <Mountain className="w-4 h-4 md:w-5 md:h-5 text-primary" />
             </motion.div>
             <div className="flex flex-col -space-y-1">
               <span className="text-base md:text-lg font-black tracking-widest uppercase text-text-main">ROXSTONE</span>
               <span className="text-[7px] md:text-[8px] font-black uppercase text-primary/40 tracking-[0.4em]">The Marble Gallery</span>
             </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 xl:px-6 py-2.5 font-bold text-[9px] xl:text-[10px] tracking-[0.2em] transition-all uppercase rounded-full shrink-0 ${
                  location.pathname === link.path ? 'text-primary' : 'text-text-main/60 hover:text-primary'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {(hoveredLink === link.name || location.pathname === link.path) && (
                  <motion.div 
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-primary/5 rounded-full border border-primary/10 shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5 md:gap-4">
            <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm shadow-neu-pressed rounded-full px-4 xl:px-5 py-2 border border-white/20 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
               <input type="text" placeholder="FIND TEXTURE..." className="bg-transparent border-none outline-none text-[8px] xl:text-[9px] w-24 xl:w-32 font-black tracking-widest text-text-main placeholder:text-text-main/30" />
               <Search className="w-4 h-4 text-text-main/40 group-hover:text-primary transition-colors" />
            </div>
            
            <div className="flex items-center gap-2 border-l border-primary/10 pl-2.5 md:pl-4">
              {/* Mobile Collection Shortcut */}
              <Link to="/shop" className="lg:hidden">
                <NeuButton className="px-3 py-2 text-[8px] font-black uppercase tracking-widest bg-primary/10 border border-primary/20 text-primary">
                  COLLECTION
                </NeuButton>
              </Link>

              <Link to="/dashboard" className="hidden sm:block">
                <NeuButton variant="icon" className="w-10 h-10 md:w-11 md:h-11 bg-white/10 hover:bg-white/20 border-white/10">
                  <User className="w-4 h-4 text-text-main" />
                </NeuButton>
              </Link>
              <Link to="/dashboard">
                <NeuButton variant="icon" className="w-10 h-10 md:w-11 md:h-11 relative group bg-primary/5 hover:bg-primary/10 border border-primary/10">
                  <ShoppingCart className="w-4 h-4 group-hover:text-primary transition-colors text-text-main" />
                  {cart.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg border-2 border-bg-base"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </NeuButton>
              </Link>
               <div className="lg:hidden">
                <NeuButton 
                  variant="icon" 
                  className={`w-10 h-10 transition-all ${isMenuOpen ? 'bg-primary text-white shadow-neu-pressed' : 'bg-white border border-primary/10 shadow-neu'}`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-text-main" />}
                </NeuButton>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-bg-base/95 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-10"
          >
             <motion.div
               variants={menuVariants}
               initial="closed"
               animate="open"
               exit="closed"
               className="space-y-6"
             >
               <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em] mb-4">Navigations</p>
               {navLinks.map((link) => (
                 <motion.div key={link.name} variants={itemVariants}>
                    <Link 
                      to={link.path}
                      className={`flex items-center justify-between text-2xl font-bold font-rubik tracking-tight ${
                        location.pathname === link.path ? 'text-primary' : 'text-slate-400'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className={`w-6 h-6 ${location.pathname === link.path ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                 </motion.div>
               ))}
               
               <div className="pt-10 space-y-8">
                  <motion.div variants={itemVariants} className="space-y-4">
                     <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em]">Search Gallery</p>
                     <div className="relative group">
                        <input 
                          type="text" 
                          placeholder="Search textures..." 
                          className="w-full bg-bg-base shadow-neu-pressed rounded-2xl py-4 px-6 outline-none text-xs font-bold text-primary border border-white/50" 
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                     </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                     <Link to="/dashboard" className="w-full">
                        <NeuButton className="w-full py-4 text-[10px] font-black tracking-widest">
                          DASHBOARD
                        </NeuButton>
                     </Link>
                     <NeuButton className="w-full py-4 text-[10px] font-black tracking-widest" variant="secondary">
                        SUPPORT
                     </NeuButton>
                  </motion.div>
               </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="mt-auto pb-10 text-center"
             >
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">Verified Luxury Selection</p>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

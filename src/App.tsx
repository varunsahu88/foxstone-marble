import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState, createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Dashboard } from './pages/Dashboard';
import { CartProvider } from './context/CartContext';

// Create a context to share the Lenis instance
const LenisContext = createContext<Lenis | null>(null);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const lenis = useContext(LenisContext);

  useEffect(() => {
    // ONLY scroll to top on PUSH navigation (new page)
    // Don't scroll on POP (back/forward) to preserve browser restoration
    if (navType !== 'POP') {
       if (lenis) {
          lenis.scrollTo(0, { immediate: true });
       } else {
          window.scrollTo(0, 0);
       }
    }
  }, [pathname, navType, lenis]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <LenisContext.Provider value={lenis}>
          <ScrollToTop />
          <div className="min-h-screen bg-bg-base text-text-main flex flex-col font-nunito overflow-x-hidden selection:bg-primary/20 transition-all duration-300">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
          </div>
        </LenisContext.Provider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

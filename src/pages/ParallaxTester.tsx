import { FigmaParallaxGroup, FigmaParallaxLayer } from '../components/FigmaParallax';
import { PageWrapper } from '../components/PageWrapper';

export const ParallaxTester = () => {
  return (
    <PageWrapper itemKey="parallax-tester">
      <div className="pt-24 px-8 max-w-[1400px] mx-auto space-y-48 pb-96">
        
        {/* Section 1: Editorial 3D Depth */}
        <div className="text-center mb-24">
          <h1 className="text-6xl font-black font-rubik tracking-tighter">Figma-Style<br/>3D Parallax</h1>
          <p className="text-primary/60 uppercase tracking-widest mt-4">Layered Depth • 60fps Smoothness</p>
        </div>

        <FigmaParallaxGroup height="min-h-[700px] md:min-h-[800px]" className="rounded-3xl border border-white/20 shadow-neu">
          {/* Background Layer (0.3x) */}
          <FigmaParallaxLayer speed="bg" zIndex={1}>
            <div 
              className="w-full h-[140%] -top-[20%] bg-cover bg-center brightness-50"
              style={{ backgroundImage: 'url(/assets/marbles/dark-luxury-1.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-base/20 to-bg-base" />
          </FigmaParallaxLayer>

          {/* Middle Layer (0.6x) */}
          <FigmaParallaxLayer speed="mid" zIndex={2} className="flex items-center justify-around pointer-events-none">
            <div className="w-64 h-64 rounded-full bg-cta/20 blur-3xl" />
            <div className="w-96 h-96 rounded-full bg-primary/10 blur-3xl translate-y-32" />
          </FigmaParallaxLayer>

          {/* Foreground Layer (1.0x) */}
          <FigmaParallaxLayer speed="fore" zIndex={3} className="flex flex-col items-center justify-center text-center p-12">
            <div className="p-8 md:p-16 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold text-white font-rubik leading-tight mb-6">
                Floating Elements<br/><span className="italic font-light">In Digital Space</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Experience architectural luxury with depth. Our textures move independently to create a museum-like immersion.
              </p>
              <button className="bg-white text-primary px-12 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all">
                Enter The Void
              </button>
            </div>
          </FigmaParallaxLayer>
        </FigmaParallaxGroup>

        {/* Section 2: Texture Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
                <h3 className="text-4xl font-bold font-rubik">Granular Detail</h3>
                <p className="text-slate-500 leading-relaxed text-lg">
                    Each layer moves in sync with your intent, revealing the intricate veining of natural stone that usually remains hidden in static designs.
                </p>
            </div>
            
            <FigmaParallaxGroup height="h-[500px]" className="rounded-2xl border border-black/5">
                <FigmaParallaxLayer speed="bg" zIndex={1}>
                    <img src="/assets/marbles/brazilian-exotic-3.jpg" className="w-full h-[120%] object-cover -top-[10%]" alt="Bg" />
                </FigmaParallaxLayer>
                <FigmaParallaxLayer speed="mid" zIndex={2} offset={150}>
                    <div className="w-48 h-48 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl absolute top-12 left-12 flex items-center justify-center p-6 shadow-xl">
                        <p className="text-primary font-black text-center text-xs tracking-widest">LAYERED PRECISION</p>
                    </div>
                </FigmaParallaxLayer>
                <FigmaParallaxLayer speed="fore" zIndex={3}>
                    {/* Empty to show 1x scroll */}
                </FigmaParallaxLayer>
            </FigmaParallaxGroup>
        </div>

      </div>
    </PageWrapper>
  );
};

import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Camera, MessageCircle, Globe, ArrowRight } from 'lucide-react';
import { NeuButton } from './NeuButton';
import { SlideReveal } from './Animations';

export const Footer = () => {
  return (
    <footer className="bg-bg-base/60 pt-24 pb-12 px-6 border-t border-white/40 backdrop-blur-md relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[95rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        
        {/* Brand Info */}
        <SlideReveal direction="up" delay={0.1}>
          <div className="space-y-8">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-2xl bg-primary/10 shadow-neu-sm flex items-center justify-center border border-primary/20">
                 <span className="text-primary text-sm font-black">R</span>
               </div>
               <h2 className="text-3xl font-black font-rubik text-primary tracking-tighter">ROXSTONE</h2>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
              "Bringing the timeless soul of the earth into the heart of your home."
            </p>
            <div className="flex gap-4">
              {['Camera', 'MessageCircle', 'Globe'].map((iconName, i) => {
                const Icon = iconName === 'Camera' ? Camera : iconName === 'MessageCircle' ? MessageCircle : Globe;
                return (
                  <NeuButton key={i} variant="icon" className="w-12 h-12 p-0 text-slate-400 hover:text-primary hover:scale-110 transition-all bg-white/40 backdrop-blur-sm">
                    <Icon className="w-5 h-5" />
                  </NeuButton>
                );
              })}
            </div>
          </div>
        </SlideReveal>

        {/* Quick Links */}
        <SlideReveal direction="up" delay={0.2}>
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Quick Links</h3>
            <ul className="space-y-4 text-slate-600 font-bold text-sm">
              {['Home', 'Collection', 'Services', 'About Us'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-primary transition-all hover:translate-x-1 inline-block pb-1 border-b border-transparent hover:border-primary/20">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SlideReveal>

        {/* Contact Info */}
        <SlideReveal direction="up" delay={0.3}>
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Contact Us</h3>
            <ul className="space-y-5 text-slate-600 font-bold text-sm">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="pt-2 hover:text-primary transition-colors">123 Jade Gardens, Verona, Italy</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="hover:text-primary transition-colors text-primary font-black">+1 (800) 555-JADE</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="hover:text-primary transition-colors">curator@roxstone.com</span>
              </li>
            </ul>
          </div>
        </SlideReveal>

        {/* Newsletter */}
        <SlideReveal direction="up" delay={0.4}>
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Newsletter</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed opacity-80">Join our curator's list for exclusive access to the rarest quarries.</p>
            <div className="space-y-4">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Your email address" 
                  className="w-full bg-bg-base/40 backdrop-blur-sm shadow-neu-pressed rounded-[2rem] py-5 px-8 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold border border-white/20 group-hover:border-primary/10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <NeuButton variant="icon" className="w-10 h-10 bg-primary text-white hover:scale-110 active:scale-95 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </NeuButton>
                </div>
              </div>
              <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest px-4">
                By subscribing, you agree to our <span className="text-primary/60">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </SlideReveal>

      </div>
      
      {/* Footer Bottom */}
      <SlideReveal direction="up" delay={0.6}>
        <div className="max-w-[95rem] mx-auto mt-24 pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <p>© 2026 ROXSTONE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-primary transition-all hover:scale-105">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-all hover:scale-105">Terms of Service</Link>
          </div>
        </div>
      </SlideReveal>
    </footer>
  );
};

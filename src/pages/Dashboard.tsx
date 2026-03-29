import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  CreditCard, 
  ShoppingCart, 
  History, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  ArrowRight,
  Wallet,
  ShieldCheck,
  Gem,
  Mountain,
  Sparkles,
  Truck
} from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { SlideReveal } from '../components/Animations';
import { useCart } from '../context/CartContext';

type Tab = 'overview' | 'cart' | 'payment' | 'orders';

export const Dashboard = () => {
  const { cart, orders, removeFromCart, updateQty, checkout } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isPaid, setIsPaid] = useState(false);

  const totalAmount = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    return acc + (price * item.qty);
  }, 0);

  const stats = [
    { label: 'Total Investment', value: `₹${(totalAmount * 1.5).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Active Orders', value: orders.length.toString(), icon: Package, color: 'text-primary' },
    { label: 'Pending Slabs', value: cart.length.toString(), icon: Clock, color: 'text-amber-600' },
    { label: 'Loyalty Points', value: '2,450', icon: Gem, color: 'text-indigo-600' },
  ];

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <PageWrapper itemKey="dashboard">
      <div className="pt-28 md:pt-32 pb-20 px-4 md:px-8 xl:px-12 max-w-[1600px] mx-auto min-h-screen">
        <SlideReveal direction="down" duration={0.8}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl md:text-4xl xl:text-5xl font-rubik font-black text-primary tracking-tight">User Dashboard</h1>
              <p className="text-text-main/70 font-medium mt-1 text-xs md:text-base">Manage residency projects and marble acquisitions.</p>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl md:rounded-2xl shadow-neu-sm border border-white/10 w-full md:w-fit justify-center backdrop-blur-md">
              {(['overview', 'cart', 'orders'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-primary text-bg-base shadow-lg' : 'text-text-main/40 hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </SlideReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6 md:space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6 md:space-y-8"
                >
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {stats.map((stat, i) => (
                      <SlideReveal key={i} direction="up" delay={i * 0.1}>
                        <NeuCard className="p-4 md:p-5 text-center group hover:scale-[1.02] transition-transform h-full">
                          <stat.icon className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 md:mb-3 ${stat.color}`} />
                          <p className="text-xl md:text-2xl font-black text-primary">{stat.value}</p>
                          <p className="text-[7px] md:text-[9px] font-bold text-text-main/40 uppercase tracking-tighter mt-0.5 md:mt-1">{stat.label}</p>
                        </NeuCard>
                      </SlideReveal>
                    ))}
                  </div>

                  <NeuCard className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
                      <h3 className="text-lg md:text-xl font-bold font-rubik text-primary">Active Order Tracking</h3>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full">In Transit</span>
                    </div>
                    
                    <div className="relative pt-8 md:pt-10 pb-4">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 rounded-full overflow-hidden shadow-neu-pressed">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '65%' }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="h-full bg-primary shadow-[0_0_15px_rgba(27,94,32,0.5)]" 
                        />
                      </div>
                      <div className="flex justify-between mt-6">
                        {[
                          { label: 'Source', icon: Mountain, done: true },
                          { label: 'Polish', icon: Sparkles, done: true },
                          { label: 'Cargo', icon: Package, done: true },
                          { label: 'Transit', icon: Truck, done: false },
                          { label: 'Done', icon: CheckCircle2, done: false }
                        ].map((step, i) => (
                          <div key={i} className="flex flex-col items-center gap-1.5 md:gap-2">
                             <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-neu-sm border ${i <= 2 ? 'bg-primary text-white border-primary' : 'bg-white text-slate-300 border-white/50'}`}>
                               <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                             </div>
                             <span className={`text-[6px] md:text-[8px] font-black uppercase tracking-widest ${i <= 2 ? 'text-primary' : 'text-slate-400'}`}>{step.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NeuCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <NeuCard className="p-5 md:p-6">
                       <h3 className="text-base md:text-lg font-bold font-rubik text-primary mb-4 flex items-center gap-2">
                         <History className="w-4 h-4" /> Recent Activity
                       </h3>
                       <div className="space-y-3 md:space-y-4">
                         {[
                           { action: 'Slab Reserved', item: 'Carrara Pure White', time: '2h ago' },
                           { action: 'Payment Success', item: 'Invoice #8842', time: '1d ago' },
                           { action: 'Sample Sent', item: 'Emerald Onyx', time: '3d ago' }
                         ].map((item, i) => (
                           <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors gap-3">
                              <div className="min-w-0">
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-wider text-primary truncate">{item.action}</p>
                                <p className="text-xs font-bold text-text-main/70 truncate">{item.item}</p>
                              </div>
                              <p className="text-[8px] md:text-[9px] font-medium text-text-main/40 whitespace-nowrap">{item.time}</p>
                           </div>
                         ))}
                       </div>
                    </NeuCard>
                    <NeuCard className="p-5 md:p-6 bg-primary/[0.03]">
                       <h3 className="text-base md:text-lg font-bold font-rubik text-primary mb-4">Account Tier</h3>
                       <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-primary shadow-lg flex items-center justify-center border-2 md:border-4 border-white shrink-0">
                             <Gem className="w-6 h-6 md:w-8 md:h-8 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-lg md:text-xl font-black text-white truncate">Platinum</p>
                            <p className="text-[8px] md:text-xs text-slate-500 truncate">Exotic Collection Access</p>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[8px] md:text-[10px] font-bold text-slate-500 uppercase">
                            <span>To Diamond</span>
                            <span>82%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/50 rounded-full overflow-hidden shadow-neu-pressed">
                             <div className="h-full bg-indigo-500 w-[82%]" />
                          </div>
                       </div>
                    </NeuCard>
                  </div>
                </motion.div>
              )}              {activeTab === 'cart' && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                     <h2 className="text-xl md:text-2xl font-black text-primary font-rubik">Your Selection</h2>
                     <span className="text-text-main/50 text-xs md:text-sm font-bold">{cart.length} Items</span>
                  </div>
                  
                  {cart.length > 0 ? (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <NeuCard key={item.id} className="p-4 flex flex-row items-center gap-4 md:gap-6 group">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden shadow-neu-pressed shrink-0">
                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base md:text-lg font-black text-text-main truncate">{item.name}</h4>
                            <p className="text-[10px] md:text-xs text-primary font-bold">{item.cat}</p>
                            <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
                               <div className="flex items-center bg-white/50 rounded-lg border border-white/50 px-1.5 md:px-2 py-0.5 md:py-1 shadow-neu-sm">
                                  <button onClick={() => updateQty(item.id, -1)} className="w-5 h-5 md:w-6 md:h-6 rounded bg-primary/10 text-primary flex items-center justify-center font-black text-[10px]">-</button>
                                  <span className="mx-2 md:mx-3 text-[10px] md:text-xs font-black">{item.qty}</span>
                                  <button onClick={() => updateQty(item.id, 1)} className="w-5 h-5 md:w-6 md:h-6 rounded bg-primary/10 text-primary flex items-center justify-center font-black text-[10px]">+</button>
                               </div>
                               <button onClick={() => handleRemove(item.id)} className="text-rose-500 hover:text-rose-600 transition-colors p-1">
                                 <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                               </button>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                             <p className="text-base md:text-xl font-rubik font-black text-primary">{item.price}</p>
                             <p className="text-[7px] md:text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">INR</p>
                          </div>
                        </NeuCard>
                      ))}
                    </div>
                  ) : (
                    <NeuCard className="p-12 md:p-20 text-center">
                       <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mx-auto mb-4" />
                       <h4 className="text-lg md:text-xl font-bold text-slate-400">Cart is empty</h4>
                       <NeuButton onClick={() => setActiveTab('overview')} className="mt-6 px-6 py-3 text-[10px]">Explore Gallery</NeuButton>
                    </NeuCard>
                  )}
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl md:text-2xl font-black text-primary font-rubik">Purchase History</h2>
                  <div className="space-y-3 md:space-y-4">
                    {orders.length > 0 ? orders.map((order, i) => (
                      <NeuCard key={i} className="p-4 md:p-5 flex items-center justify-between hover:bg-white/30 transition-colors cursor-pointer group gap-4">
                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                           <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-neu-sm flex items-center justify-center border border-white/50 text-slate-400 group-hover:text-primary shrink-0">
                             <Package className="w-5 h-5 md:w-6 md:h-6" />
                           </div>
                           <div className="min-w-0">
                              <p className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-widest truncate">{order.id}</p>
                              <p className="text-[8px] md:text-[10px] text-slate-400 font-bold truncate">{order.date} • {order.items.length} Items</p>
                           </div>
                        </div>
                        <div className="text-right flex items-center gap-4 md:gap-8 shrink-0">
                           <div>
                              <p className="text-base md:text-lg font-black text-primary">₹{(order.total * 1.18 + 12500).toLocaleString()}</p>
                              <span className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-widest">{order.status}</span>
                           </div>
                           <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </NeuCard>
                    )) : (
                      <div className="p-12 text-center text-slate-400 font-bold italic">No purchase history found.</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

           {/* Sidebar Area - Summary & Payment */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <SlideReveal direction="right" delay={0.3}>
              <NeuCard className="p-6 md:p-8 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <h3 className="text-lg md:text-xl font-bold font-rubik text-primary mb-5 md:mb-6">Investment Summary</h3>
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex justify-between text-xs md:text-sm font-medium text-text-main/60">
                     <span>Subtotal</span>
                     <span className="text-text-main font-bold">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm font-medium text-text-main/60">
                     <span>Logistics</span>
                     <span className="text-text-main font-bold">₹12,500</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm font-medium text-text-main/60">
                     <span>GST (18%)</span>
                     <span className="text-text-main font-bold">₹{Math.round(totalAmount * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-white/10 shadow-neu-pressed my-3 md:my-4" />
                  <div className="flex justify-between text-lg md:text-xl font-black text-primary">
                     <span>Grand Total</span>
                     <span>₹{Math.round(totalAmount * 1.18 + 12500).toLocaleString()}</span>
                  </div>
                </div>

                {activeTab === 'cart' ? (
                  <div className="space-y-4">
                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 mt-0.5 shrink-0" />
                      <div>
                          <p className="text-[9px] md:text-[10px] font-black text-indigo-900 uppercase tracking-widest">Secure Handover</p>
                          <p className="text-[8px] md:text-[10px] text-indigo-700 mt-1">Slabs will be marked for extraction immediately after payment.</p>
                      </div>
                    </div>
                    <NeuButton onClick={() => setActiveTab('payment')} variant="white" className="w-full h-14 md:h-16 flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-xs font-black tracking-widest">
                      <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-cta" /> PROCEED TO PAYMENT
                    </NeuButton>
                  </div>
                ) : activeTab === 'payment' ? (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="space-y-5 md:space-y-6"
                   >
                      <div className="relative h-44 sm:h-48 w-full rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-800 p-5 md:p-6 text-white shadow-2xl overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-white/5 rounded-full -mr-16 md:-mr-20 -mt-16 md:-mt-20 blur-3xl group-hover:bg-white/10 transition-colors" />
                         <div className="flex justify-between items-start mb-6 md:mb-8">
                            <Wallet className="w-8 h-8 md:w-10 md:h-10 text-white/30" />
                            <div className="flex gap-1">
                               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-rose-500/80" />
                               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-amber-500/80 -ml-3 md:-ml-4" />
                            </div>
                         </div>
                         <p className="text-base md:text-lg tracking-[0.2em] font-medium mb-3 md:mb-4">**** **** **** 8842</p>
                         <div className="flex justify-between items-end">
                            <div>
                               <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-white/40">Card Holder</p>
                               <p className="text-[10px] md:text-xs font-bold font-rubik uppercase">Varun Bhardwaj</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-white/40">Expiry</p>
                               <p className="text-[10px] md:text-xs font-bold tracking-widest">12 / 28</p>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                         <div className="space-y-1 md:space-y-2">
                            <label className="text-[8px] md:text-[10px] uppercase font-black tracking-widest text-slate-400 pl-1">Card Number</label>
                            <input type="text" value="4412 8823 1022 8842" readOnly className="w-full bg-white/40 border border-white/50 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-700 shadow-neu-pressed outline-none focus:border-primary/30 transition-all font-rubik" />
                         </div>
                         <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1 md:space-y-2">
                               <label className="text-[8px] md:text-[10px] uppercase font-black tracking-widest text-slate-400 pl-1">CVV</label>
                               <input type="password" value="884" readOnly className="w-full bg-white/40 border border-white/50 rounded-xl px-4 py-3 text-xs md:text-sm font-bold text-slate-700 shadow-neu-pressed outline-none focus:border-primary/30 transition-all font-rubik" />
                            </div>
                            <div className="space-y-2 flex flex-col justify-end">
                                <NeuButton 
                                   onClick={() => {
                                     setIsPaid(true);
                                     checkout();
                                     setTimeout(() => {
                                       setIsPaid(false);
                                       setActiveTab('orders');
                                     }, 2000);
                                   }} 
                                   variant="white"
                                   className="w-full h-11 md:h-12 text-[10px] uppercase font-black tracking-widest"
                                   disabled={cart.length === 0}
                                >
                                  {isPaid ? 'PAYMENT SUCCESSFUL' : 'CONFIRM ACQUISITION'}
                                </NeuButton>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/30 border border-white/40">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-emerald-700 truncate">Portfolio Value</p>
                        <p className="text-[8px] md:text-xs text-slate-500 font-bold truncate">+12.4% Since Extraction</p>
                      </div>
                    </div>
                    <NeuButton onClick={() => setActiveTab('cart')} className="w-full py-4 text-[9px] md:text-[10px] font-black tracking-[0.2em]">VIEW CART DETAILS</NeuButton>
                  </div>
                )}
              </NeuCard>
            </SlideReveal>

            <div className="p-1 text-center">
              <p className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-widest italic opacity-60">Verified Luxury Partner • SSL SECURE</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// Remove duplicate local SVG components and use lucide-react standard icons throughout

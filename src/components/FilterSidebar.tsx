import { Filter, X } from 'lucide-react';
import { NeuCard } from './NeuCard';

export interface ActiveFilters {
  categories: string[];
  finishes: string[];
  usages: string[];
  priceRange: [number, number];
}

interface FilterSidebarProps {
  onClose?: () => void;
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
}

export const FilterSidebar = ({ onClose, activeFilters, onFilterChange }: FilterSidebarProps) => {
  const sections = [
    { 
      title: 'Collections', 
      key: 'categories' as const,
      options: ['Italian Classico', 'Brazilian Exotic', 'Modern Onyx', 'Earth & Rust', 'Luxe Noir', 'Verde Green'] 
    },
    { 
      title: 'Finish', 
      key: 'finishes' as const,
      options: ['Polished', 'Honed', 'Leathered', 'Brushed', 'Backlit'] 
    },
    { 
      title: 'Usage', 
      key: 'usages' as const,
      options: ['Flooring', 'Wall Panels', 'Countertops', 'Decorative Art'] 
    },
  ];

  const handleToggle = (key: keyof Omit<ActiveFilters, 'priceRange'>, option: string) => {
    const current = activeFilters[key];
    const next = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    
    onFilterChange({ ...activeFilters, [key]: next });
  };

  const handleClear = () => {
    onFilterChange({
      categories: [],
      finishes: [],
      usages: [],
      priceRange: [5000, 60000]
    });
  };

  return (
    <NeuCard className="h-fit sticky top-28 w-full p-5 lg:p-6 overflow-y-auto max-h-[calc(100vh-8rem)] bg-bg-base">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl font-bold font-rubik flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters
        </h2>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-2 text-text-main/50">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="font-bold text-text-main border-b border-primary/20 pb-2 uppercase text-[10px] tracking-widest">{section.title}</h3>
            <div className="space-y-3">
              {section.options.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group text-sm">
                  <div className="relative w-5 h-5 shrink-0">
                    <input 
                      type="checkbox" 
                      className="peer absolute opacity-0 cursor-pointer w-full h-full z-10" 
                      checked={activeFilters[section.key].includes(option)}
                      onChange={() => handleToggle(section.key, option)}
                    />
                    <div className="absolute inset-0 bg-white/10 border-2 border-primary/30 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all" />
                    <div className="absolute inset-1 bg-white scale-0 peer-checked:scale-100 transition-transform rounded-sm" />
                  </div>
                  <span className={`transition-colors truncate ${activeFilters[section.key].includes(option) ? 'text-primary font-bold' : 'text-text-main/60 group-hover:text-primary'}`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="font-bold text-text-main border-b border-primary/20 pb-2 uppercase text-[10px] tracking-widest">Price / sqft</h3>
          <div className="px-2 pt-6">
            <div className="h-2 w-full bg-white/10 rounded-full relative shadow-neu-pressed">
              <div className="absolute h-full w-full bg-primary/20 rounded-full" />
              <div 
                className="absolute h-full bg-primary rounded-full transition-all" 
                style={{ 
                  left: `${((activeFilters.priceRange[0] - 5000) / 55000) * 100}%`,
                  right: `${100 - ((activeFilters.priceRange[1] - 5000) / 55000) * 100}%` 
                }} 
              />
              {/* Note: In a real app we'd use a range slider library, but for this demo I've logic-linked the visuals to the props */}
              <div 
                className="absolute w-5 h-5 bg-bg-base shadow-neu-sm rounded-full -top-1.5 cursor-grab active:cursor-grabbing border border-white/50 transition-all ml-[-10px]" 
                style={{ left: `${((activeFilters.priceRange[0] - 5000) / 55000) * 100}%` }}
              />
              <div 
                className="absolute w-5 h-5 bg-bg-base shadow-neu-sm rounded-full -top-1.5 cursor-grab active:cursor-grabbing border border-white/50 transition-all ml-[-10px]" 
                style={{ left: `${((activeFilters.priceRange[1] - 5000) / 55000) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-text-main/50 font-black uppercase tracking-widest">
              <span>₹{activeFilters.priceRange[0].toLocaleString()}</span>
              <span>₹{activeFilters.priceRange[1].toLocaleString()}+</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleClear}
          className="w-full py-2 text-[10px] text-primary font-black uppercase tracking-widest hover:underline transition-all"
        >
          Clear All Filters
        </button>
      </div>
    </NeuCard>
  );
};

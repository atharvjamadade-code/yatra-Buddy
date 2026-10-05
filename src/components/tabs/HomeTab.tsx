import React from 'react';
import { 
  FileCheck2, Languages, ShieldCheck, PhoneCall, 
  Search, ExternalLink, ArrowRight, ShieldAlert,
  Droplets, Car, Cpu, Sparkles
} from 'lucide-react';
import { TabType, CountryOrigin } from '../../types';

interface HomeTabProps {
  onNavigateTab: (tab: TabType, extraSubTab?: string) => void;
  selectedCountry: CountryOrigin;
  onOpenOriginModal: () => void;
  onAskBuddyQuestion: (query: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ 
  onNavigateTab, 
  selectedCountry, 
  onOpenOriginModal,
  onAskBuddyQuestion
}) => {
  return (
    <div className="flex-1 pb-16 space-y-4 px-3 sm:px-5 pt-3">
      {/* Offline Status Pill & Embassy Lockup */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-stone-850 border border-stone-700/80 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-mono font-medium text-[11px] tracking-wide">
            OFFLINE MODE ACTIVE
          </span>
          <span className="text-stone-500">·</span>
          <span className="text-stone-400 text-[11px] hidden sm:inline">0 KB Network Needed</span>
        </div>

        <button
          onClick={onOpenOriginModal}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-750 text-stone-300 hover:text-amber-300 border border-stone-750 transition-colors cursor-pointer text-[11px]"
          title="Change Country of Origin & Embassy"
        >
          <span>{selectedCountry.flag}</span>
          <span className="font-semibold text-stone-200 truncate max-w-[85px] sm:max-w-[120px]">
            {selectedCountry.code}
          </span>
        </button>
      </div>

      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-850 to-stone-900 border border-amber-900/40 p-4 sm:p-5 shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to India · स्वागतम्</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-amber-100 tracking-wide">
            Yatra Buddy
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-md leading-relaxed">
            Your trusted offline guide for foreign travellers in India. Solve language hurdles, avoid overcharging scams, and access emergency helplines without cellular data.
          </p>

          {/* Ask Your Buddy Interactive Search Trigger Bar */}
          <div 
            onClick={() => onNavigateTab('buddy')}
            className="mt-4 flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-amber-800/60 hover:border-amber-500/80 transition-all cursor-pointer shadow-inner group"
          >
            <div className="flex items-center gap-2.5 text-stone-400 group-hover:text-stone-200">
              <Search className="w-4 h-4 text-amber-400" />
              <span className="text-xs">Ask your buddy anything (scams, visas, taxis)...</span>
            </div>
            <span className="text-[11px] font-mono text-stone-400 group-hover:text-amber-400 transition-colors">
              Chat ➔
            </span>
          </div>
        </div>
      </div>

      {/* Quick Tiles Grid (The 4 Core Pillars) */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
            Quick Travel Tools
          </span>
          <span className="text-[11px] text-stone-500">100% On-Device</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Tile 1: Visa Guide */}
          <button
            onClick={() => onNavigateTab('guides', 'visa')}
            className="p-3.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-500/60 text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-100 group-hover:text-blue-300 transition-colors">
                Visa & FRRO
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                Checklist, 180-day stay rules & official portals
              </p>
            </div>
          </button>

          {/* Tile 2: Phrasebook */}
          <button
            onClick={() => onNavigateTab('guides', 'phrases')}
            className="p-3.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-500/60 text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                Phrasebook
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                Hindi, Tamil & Bengali with large text cards
              </p>
            </div>
          </button>

          {/* Tile 3: Scam Shield */}
          <button
            onClick={() => onNavigateTab('guides', 'scams')}
            className="p-3.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700/80 hover:border-amber-500/60 text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
                Scam Shield
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                Closed hotel tricks, fake bureaus & remedies
              </p>
            </div>
          </button>

          {/* Tile 4: Emergency SOS */}
          <button
            onClick={() => onNavigateTab('sos')}
            className="p-3.5 rounded-xl bg-rose-950/30 hover:bg-rose-950/50 border border-rose-900/60 hover:border-rose-500 text-left transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-rose-200 group-hover:text-rose-100 transition-colors">
                Emergency & SOS
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                112 dialer, Hindi help card & Embassy lines
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Foreign Traveller Survival Essentials */}
      <div className="rounded-xl bg-stone-850 border border-stone-700/70 p-4 space-y-3">
        <h3 className="text-xs font-semibold text-stone-200 uppercase tracking-wider">
          First-Time Visitor Survival Rules
        </h3>

        <div className="space-y-2 text-xs">
          <div 
            onClick={() => onAskBuddyQuestion('drinking water tap food filter')}
            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
          >
            <Droplets className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-200 block">Water & Delhi Belly Safety</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Always check unbroken seals on bottled water (Bisleri/Kinley). Never drink tap water or ice in roadside stalls.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onAskBuddyQuestion('auto rickshaw meter fare uber ola')}
            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
          >
            <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-200 block">Taxis & Auto-Rickshaw Fares</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Always say &quot;Meter se chaliye&quot; or use pre-paid police booths at airports. Avoid hailing cabs from aggressive touts.
              </p>
            </div>
          </div>

          <div 
            onClick={() => onAskBuddyQuestion('sim card data airtel jio verification')}
            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-900/70 border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-200 block">Tourist SIM Card & UPI</span>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Buy Airtel/Jio at international airport arrivals with passport + visa. Ask about &quot;UPI One World&quot; for scan-to-pay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Diplomatic Mission Card Preview */}
      <div className="rounded-xl bg-stone-850 border border-stone-700/70 p-3.5 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{selectedCountry.flag}</span>
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-mono block">Linked Consular Mission</span>
            <span className="font-semibold text-stone-200 line-clamp-1">{selectedCountry.embassyName}</span>
            <span className="text-[11px] font-mono text-rose-400 font-medium">SOS: {selectedCountry.emergencyPhone24_7}</span>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('sos')}
          className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-amber-300 rounded-lg border border-stone-700 text-xs font-medium transition-colors cursor-pointer shrink-0"
        >
          View SOS
        </button>
      </div>

      {/* Official Legal Disclaimer */}
      <p className="text-[10px] text-stone-500 text-center leading-relaxed px-4">
        Disclaimer: Yatra Buddy provides informative offline guidance, not legal advice. Always confirm visa, paperwork and safety rules on official Indian Government portals.
      </p>
    </div>
  );
};

import React from 'react';
import { Smartphone, Monitor, ShieldAlert, WifiOff, Compass, Globe } from 'lucide-react';
import { YATRAS } from '../../data/yatrasData';
import { TabType, CountryOrigin } from '../../types';

interface HeaderProps {
  activeYatraId: string;
  onSelectYatra: (id: string) => void;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
  onGoToSos: () => void;
  activeTab: TabType;
  selectedCountry: CountryOrigin;
  onOpenOriginModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeYatraId,
  onSelectYatra,
  isPhoneFrame,
  onToggleFrame,
  onGoToSos,
  selectedCountry,
  onOpenOriginModal,
}) => {
  const currentYatra = YATRAS.find(y => y.id === activeYatraId) || YATRAS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-900/20">
            <Compass className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <div className="text-base font-bold font-cinzel tracking-wider text-amber-100 flex items-center gap-1.5">
              Yatra Buddy
            </div>
            <div className="text-[11px] text-stone-400 font-sans hidden sm:block">
              Offline Himalayan Pilgrim Companion
            </div>
          </div>
        </div>

        {/* Zone 2: Yatra Selector & Offline Status Indicator */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-0.5">
          <div className="relative shrink-0">
            <select
              value={activeYatraId}
              onChange={(e) => onSelectYatra(e.target.value)}
              className="bg-stone-800 hover:bg-stone-750 text-amber-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded-lg border border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer transition-colors"
            >
              {YATRAS.map((y) => (
                <option key={y.id} value={y.id} className="bg-stone-900 text-stone-100">
                  {y.name} ({y.hindiName})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400/90 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-900/50">
            <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] tracking-wide">100% ON-DEVICE OFFLINE</span>
          </div>
        </div>

        {/* Zone 3: Actions (Country Flag, Frame Toggle & Fast SOS) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenOriginModal}
            title={`Traveling from: ${selectedCountry.name}. Tap to change embassy & origin.`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-200 hover:text-amber-300 bg-stone-800 hover:bg-stone-750 rounded-lg border border-stone-700 transition-colors cursor-pointer"
          >
            <span className="text-sm leading-none">{selectedCountry.flag}</span>
            <span className="font-mono text-[11px] hidden sm:inline">{selectedCountry.code}</span>
          </button>

          <button
            onClick={onToggleFrame}
            title={isPhoneFrame ? "Switch to Expanded View" : "Switch to Android Mobile Frame"}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-stone-100 bg-stone-800 hover:bg-stone-700 rounded-lg border border-stone-700 transition-colors cursor-pointer"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-stone-300" />
                <span className="hidden sm:inline">Expanded View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-stone-300" />
                <span className="hidden sm:inline">Android Frame</span>
              </>
            )}
          </button>

          <button
            onClick={onGoToSos}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-600 active:scale-95 rounded-lg shadow-sm shadow-rose-950 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};

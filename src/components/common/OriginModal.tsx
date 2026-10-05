import React, { useState } from 'react';
import { Globe2, Search, Check, ShieldCheck, Building2 } from 'lucide-react';
import { COUNTRIES_LIST, getEmbassyByCode } from '../../data/embassyData';
import { CountryOrigin } from '../../types';

interface OriginModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountryCode: string;
  onSelectCountry: (country: CountryOrigin, idNumber?: string) => void;
}

export const OriginModal: React.FC<OriginModalProps> = ({
  isOpen,
  onClose,
  selectedCountryCode,
  onSelectCountry,
}) => {
  const [search, setSearch] = useState('');
  const [activeCode, setActiveCode] = useState(selectedCountryCode || 'IN');
  const [docNumber, setDocNumber] = useState('');

  if (!isOpen) return null;

  const filteredCountries = COUNTRIES_LIST.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEmbassy = getEmbassyByCode(activeCode);

  const handleConfirm = () => {
    onSelectCountry(selectedEmbassy, docNumber.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 select-none">
      <div className="w-full max-w-md bg-stone-900 rounded-3xl border border-stone-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-b from-stone-800 to-stone-850 p-5 border-b border-stone-700/80 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block">
                Pilgrim Registration
              </span>
              <h2 className="text-lg font-bold text-amber-100 font-cinzel">
                Where are you traveling from?
              </h2>
            </div>
          </div>
          <p className="text-xs text-stone-300 mt-2 leading-relaxed">
            Yatra Buddy links your country&apos;s diplomatic embassy in New Delhi (or State Resident Cell) for 24/7 offline consular rescue and emergency backup.
          </p>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-stone-800 bg-stone-850">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your country (e.g. India, United States, Nepal...)"
              className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-750 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Country Selection List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 max-h-60 sm:max-h-72">
          {filteredCountries.map((c) => {
            const isSelected = activeCode === c.code;
            return (
              <div
                key={c.code}
                onClick={() => setActiveCode(c.code)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-600/80 text-amber-100 shadow-sm'
                    : 'bg-stone-850/60 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-stone-100">{c.name}</span>
                      {c.isDomestic && (
                        <span className="text-[10px] text-emerald-400 font-medium">· National</span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-400 block line-clamp-1">
                      {c.embassyName}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-stone-700" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Embassy Preview Card */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 space-y-2">
          <div className="flex items-start gap-2 text-xs">
            <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wide block">
                Linked Emergency Mission:
              </span>
              <span className="text-xs font-semibold text-stone-200 block">
                {selectedEmbassy.embassyName}
              </span>
              <span className="text-[11px] font-mono text-rose-400 font-medium block mt-0.5">
                24/7 Consular SOS: {selectedEmbassy.emergencyPhone24_7}
              </span>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-stone-400 block mb-1">
              Passport No. / National ID (Optional for ICE Card):
            </label>
            <input
              type="text"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              placeholder="e.g. Passport or Aadhaar number"
              className="w-full px-3 py-1.5 bg-stone-900 border border-stone-750 rounded-lg text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div className="pt-1 flex gap-2">
            <button
              onClick={handleConfirm}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Confirm & Enter Yatra Buddy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

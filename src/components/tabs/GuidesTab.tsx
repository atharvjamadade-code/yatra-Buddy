import React, { useState } from 'react';
import { 
  FileCheck2, Languages, ShieldCheck, ExternalLink, 
  CheckCircle2, Circle, AlertTriangle, Volume2, 
  Maximize2, X, ChevronRight, Info
} from 'lucide-react';
import { PHRASEBOOK_DATA, Phrase } from '../../data/phrasebookData';
import { SCAMS_DATA, ScamShieldItem } from '../../data/scamsData';
import { speakTextOffline } from '../../utils/audioSynthesizer';

const VISA_CHECKLIST_INITIAL = [
  { id: 'v1', text: 'Passport with at least 6 months validity & 2 blank pages', essential: true, checked: true },
  { id: 'v2', text: 'Physical printed copy of Electronic Travel Authorization (ETA)', essential: true, checked: true },
  { id: 'v3', text: 'Confirmed return flight ticket or onward journey booking', essential: true, checked: true },
  { id: 'v4', text: 'Hotel accommodation confirmation with address (for Form C)', essential: true, checked: false },
  { id: 'v5', text: 'FRRO Registration check (mandatory ONLY if continuous stay >180 days)', essential: false, checked: false },
  { id: 'v6', text: 'International travel medical insurance policy printout', essential: false, checked: true }
];

export const GuidesTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'visa' | 'phrases' | 'scams'>('visa');
  const [selectedLanguage, setSelectedLanguage] = useState<'hindi' | 'tamil' | 'bengali'>('hindi');
  const [activePhraseModal, setActivePhraseModal] = useState<Phrase | null>(null);

  const [visaChecklist, setVisaChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('yatra_visa_checklist');
      return saved ? JSON.parse(saved) : VISA_CHECKLIST_INITIAL;
    } catch {
      return VISA_CHECKLIST_INITIAL;
    }
  });

  const toggleVisaItem = (id: string) => {
    const updated = visaChecklist.map((item: typeof VISA_CHECKLIST_INITIAL[0]) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setVisaChecklist(updated);
    try {
      localStorage.setItem('yatra_visa_checklist', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSpeakPhrase = (text: string) => {
    speakTextOffline(text);
  };

  return (
    <div className="flex-1 pb-16 space-y-4 px-3 sm:px-5 pt-3">
      {/* 3-Tab Segmented Selector */}
      <div className="flex items-center p-1 bg-stone-850 rounded-2xl border border-stone-750 text-xs shadow-sm">
        <button
          onClick={() => setSubTab('visa')}
          className={`flex-1 py-2 px-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === 'visa'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-stone-100'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Visa & FRRO</span>
        </button>

        <button
          onClick={() => setSubTab('phrases')}
          className={`flex-1 py-2 px-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === 'phrases'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-stone-100'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Phrasebook</span>
        </button>

        <button
          onClick={() => setSubTab('scams')}
          className={`flex-1 py-2 px-2 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === 'scams'
              ? 'bg-amber-500 text-stone-950 shadow-md'
              : 'text-stone-300 hover:text-stone-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Scam Shield</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: VISA & FRRO GUIDE                                 */}
      {/* ======================================================== */}
      {subTab === 'visa' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Header Card */}
          <div className="rounded-2xl bg-stone-850 border border-stone-700/80 p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-amber-100 font-cinzel">
                e-Visa & FRRO Entry Guide
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                Official Portals
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Step-by-step paperwork checklist for foreign passport holders arriving in India.
            </p>
          </div>

          {/* Tickable Checklist */}
          <div className="rounded-2xl bg-stone-850 border border-stone-750 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Arrival Document Checklist
              </span>
              <span className="text-xs font-mono text-amber-400">
                {visaChecklist.filter((v: typeof VISA_CHECKLIST_INITIAL[0]) => v.checked).length}/{visaChecklist.length} Checked
              </span>
            </div>

            <div className="space-y-2">
              {visaChecklist.map((item: typeof VISA_CHECKLIST_INITIAL[0]) => (
                <div
                  key={item.id}
                  onClick={() => toggleVisaItem(item.id)}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-900/70 border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors"
                >
                  <button className="mt-0.5 text-stone-400">
                    {item.checked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-600" />
                    )}
                  </button>
                  <div className="flex-1">
                    <span className={`text-xs ${item.checked ? 'line-through text-stone-500' : 'text-stone-200 font-medium'}`}>
                      {item.text}
                    </span>
                    {item.essential && (
                      <span className="text-[10px] text-amber-400/90 font-mono block mt-0.5">
                        · Mandatory at Immigration
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FRRO 180-Day Rule Clarification Box */}
          <div className="rounded-xl bg-stone-900 p-3.5 border border-amber-900/40 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>FRRO Registration Rule Explained:</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-relaxed">
              If your tourist visa is for continuous stay of less than 180 days, you do <strong>not</strong> need to register with the FRRO police. Registration is only required if your continuous stay in India exceeds 180 days or if your visa has a special condition stamped on it.
            </p>
          </div>

          {/* Official Portal Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block px-1">
              Official Government Portals:
            </span>

            <a
              href="https://indianvisaonline.gov.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-stone-200 transition-colors group cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold block text-stone-100 group-hover:text-amber-300">
                  Official e-Visa Portal (Bureau of Immigration)
                </span>
                <span className="text-[11px] text-stone-400">Apply for Tourist, Business & Conference e-Visas</span>
              </div>
              <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
            </a>

            <a
              href="https://indianfrro.gov.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-stone-200 transition-colors group cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold block text-stone-100 group-hover:text-amber-300">
                  Official e-FRRO Portal (Foreigners Regional Registration)
                </span>
                <span className="text-[11px] text-stone-400">Visa extensions, registration & Form C compliance</span>
              </div>
              <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
            </a>
          </div>

          {/* Legal Disclaimer */}
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
            <span className="font-semibold text-stone-300">Disclaimer: </span>
            This app provides general informative guidance, not legal or immigration advice. Visa policies and entry regulations are subject to change by the Ministry of Home Affairs.
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PHRASEBOOK                                       */}
      {/* ======================================================== */}
      {subTab === 'phrases' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Language Selector */}
          <div className="flex items-center justify-between gap-2 p-1.5 bg-stone-850 rounded-xl border border-stone-750 text-xs">
            <span className="text-[11px] font-mono text-stone-400 pl-2">Language:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'hindi', label: 'Hindi (North)', script: 'हिन्दी' },
                { id: 'tamil', label: 'Tamil (South)', script: 'தமிழ்' },
                { id: 'bengali', label: 'Bengali (East)', script: 'বাংলা' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id as typeof selectedLanguage)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-xs ${
                    selectedLanguage === lang.id
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-300 hover:text-stone-100 border border-stone-800'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>Essential Tourist Phrases</span>
            <span className="text-amber-400 text-[11px]">Tap to enlarge for driver</span>
          </div>

          {/* Phrases List */}
          <div className="space-y-2.5">
            {PHRASEBOOK_DATA.map((p) => {
              const langData = p[selectedLanguage];
              return (
                <div
                  key={p.id}
                  onClick={() => setActivePhraseModal(p)}
                  className="p-3.5 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 hover:border-amber-600/60 transition-all cursor-pointer space-y-1.5 shadow-sm group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-stone-100">
                      {p.english}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakPhrase(langData.romanized);
                      }}
                      className="p-1 rounded text-stone-400 hover:text-amber-300 hover:bg-stone-700/60 shrink-0"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-amber-300 font-mono">
                      &quot;{langData.romanized}&quot;
                    </span>
                    <span className="text-xs text-stone-400">
                      {langData.native}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
                    <span className="truncate">{p.audioGuideNote}</span>
                    <span className="text-amber-400/80 flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <span>Enlarge</span>
                      <Maximize2 className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Large Flashcard Modal for Driver / Local */}
          {activePhraseModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 select-none animate-fadeIn">
              <div className="w-full max-w-sm bg-stone-900 rounded-3xl border-2 border-amber-500 p-6 shadow-2xl space-y-6 text-center relative">
                <button
                  onClick={() => setActivePhraseModal(null)}
                  className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-100 text-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Hold Up Phone to Driver / Local
                </div>

                {/* Giant Native Script */}
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3">
                  <div className="text-3xl font-extrabold text-amber-200 leading-tight">
                    {activePhraseModal[selectedLanguage].native}
                  </div>
                  <div className="text-xl font-bold font-mono text-stone-100">
                    &quot;{activePhraseModal[selectedLanguage].romanized}&quot;
                  </div>
                </div>

                {/* English Meaning */}
                <div className="text-sm text-stone-300">
                  Meaning: <span className="font-semibold text-white">{activePhraseModal.english}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSpeakPhrase(activePhraseModal[selectedLanguage].romanized)}
                    className="flex-1 py-3 bg-stone-800 hover:bg-stone-750 text-stone-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer border border-stone-700"
                  >
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Pronounce Aloud</span>
                  </button>

                  <button
                    onClick={() => setActivePhraseModal(null)}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: SCAM SHIELD                                      */}
      {/* ======================================================== */}
      {subTab === 'scams' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="rounded-2xl bg-stone-850 border border-stone-700/80 p-4 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-amber-100 font-cinzel">
                Scam Shield & Tourist Traps
              </h2>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/60">
                Field Tested
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Real tricks commonly targeted at first-time visitors in Delhi, Agra, Jaipur, and Varanasi, with proven remedies.
            </p>
          </div>

          {/* Scams Accordion List */}
          <div className="space-y-3">
            {SCAMS_DATA.map((scam) => (
              <div
                key={scam.id}
                className="rounded-2xl bg-stone-850 border border-stone-750 p-4 space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-100">
                      {scam.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-stone-400 mt-0.5">
                      <span>Cities:</span>
                      {scam.cities.map((c, i) => (
                        <span key={i} className="text-stone-300">
                          {i > 0 && <span className="text-stone-600 mr-1.5">·</span>}
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ${
                    scam.severity === 'High'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {scam.severity} Risk
                  </span>
                </div>

                {/* The Hook & Reality */}
                <div className="space-y-2 text-xs">
                  <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-amber-400 font-semibold block text-[11px] mb-0.5">
                      The Hook (What they say):
                    </span>
                    <p className="text-stone-300 leading-relaxed italic">
                      &ldquo;{scam.theHook}&rdquo;
                    </p>
                  </div>

                  <div className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-rose-400 font-semibold block text-[11px] mb-0.5">
                      The Reality (What is happening):
                    </span>
                    <p className="text-stone-300 leading-relaxed">
                      {scam.theReality}
                    </p>
                  </div>
                </div>

                {/* What to do & Red Flags */}
                <div className="pt-2 border-t border-stone-800 space-y-2 text-xs">
                  <span className="font-semibold text-emerald-400 block text-[11px]">
                    Golden Rules What to Do:
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-stone-300">
                    {scam.whatToDo.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">✔</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-rose-950/20 p-2 rounded-lg border border-rose-900/40 text-[11px] text-rose-300">
                    <span className="font-semibold">Red Flag: </span>
                    {scam.redFlags.join(' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

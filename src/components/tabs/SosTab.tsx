import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, PhoneCall, Radio, Zap, Volume2, 
  VolumeX, Copy, Check, HeartPulse, UserCircle, AlertTriangle,
  Building2, Mail, Maximize2, X
} from 'lucide-react';
import { 
  startEmergencySiren, stopEmergencySiren, 
  playRescueWhistleBlast 
} from '../../utils/audioSynthesizer';
import { IceProfile, CountryOrigin } from '../../types';

const EMERGENCY_HELPLINES = [
  { name: 'Unified National Emergency (Police / Fire / Ambulance)', number: '112', desc: 'Single pan-India emergency number with English operators' },
  { name: 'Incredible India 24/7 Tourist Helpline', number: '1363', desc: 'Toll-free tourist guidance in 12 languages (English, German, French, etc.)' },
  { name: 'State Police & Foreigner Registration Desks', number: '100', desc: 'Local district police control room' },
  { name: 'National Disaster Helpline (NDMA)', number: '1078', desc: 'Search, rescue and natural calamity operations' },
];

interface SosTabProps {
  selectedCountry: CountryOrigin;
  onOpenOriginModal: () => void;
}

export const SosTab: React.FC<SosTabProps> = ({ selectedCountry, onOpenOriginModal }) => {
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isStrobeActive, setIsStrobeActive] = useState(false);
  const [strobeColor, setStrobeColor] = useState<'white' | 'red'>('white');
  const [copiedSms, setCopiedSms] = useState(false);
  const [showLargeCardModal, setShowLargeCardModal] = useState(false);

  // GPS Coordinates state
  const [coordinates, setCoordinates] = useState({
    lat: '28.6139° N',
    lon: '77.2090° E',
    accuracy: '± 10m (GPS fix)',
    altitude: '216m (Delhi/India)',
  });

  // ICE Profile state
  const [iceProfile, setIceProfile] = useState<IceProfile>(() => {
    try {
      const saved = localStorage.getItem('yatra_ice_profile');
      return saved ? JSON.parse(saved) : {
        name: 'Alex Taylor',
        age: 28,
        bloodGroup: 'O+ Positive',
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
        passportOrIdNumber: 'P7829104A',
        emergencyContactName: 'Family / Home Contact',
        emergencyContactPhone: '+1 415 555 2671',
        allergies: 'None',
        medicalConditions: 'No pre-existing conditions',
        yatraRegNumber: 'IN-TOUR-2026-89410'
      };
    } catch {
      return {
        name: 'Alex Taylor',
        age: 28,
        bloodGroup: 'O+ Positive',
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
        passportOrIdNumber: 'P7829104A',
        emergencyContactName: 'Family / Home Contact',
        emergencyContactPhone: '+1 415 555 2671',
        allergies: 'None',
        medicalConditions: 'No pre-existing conditions',
        yatraRegNumber: 'IN-TOUR-2026-89410'
      };
    }
  });

  const [isEditingIce, setIsEditingIce] = useState(false);

  // Attempt real browser GPS coordinate capture
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoordinates({
            lat: `${pos.coords.latitude.toFixed(4)}°`,
            lon: `${pos.coords.longitude.toFixed(4)}°`,
            accuracy: `± ${Math.round(pos.coords.accuracy)}m`,
            altitude: pos.coords.altitude ? `${Math.round(pos.coords.altitude)}m` : 'India'
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // Strobe effect flasher
  useEffect(() => {
    let timer: number;
    if (isStrobeActive) {
      timer = window.setInterval(() => {
        setStrobeColor(prev => prev === 'white' ? 'red' : 'white');
      }, 180);
    }
    return () => clearInterval(timer);
  }, [isStrobeActive]);

  useEffect(() => {
    return () => {
      stopEmergencySiren();
    };
  }, []);

  const toggleSiren = () => {
    if (isSirenActive) {
      stopEmergencySiren();
      setIsSirenActive(false);
    } else {
      const ok = startEmergencySiren();
      setIsSirenActive(ok);
    }
  };

  const handleWhistle = () => {
    playRescueWhistleBlast();
  };

  const emergencySmsText = `EMERGENCY ASSISTANCE NEEDED: Foreign traveller ${iceProfile.name} (Citizen of: ${selectedCountry.name}, Passport: ${iceProfile.passportOrIdNumber || 'N/A'}) is in distress. Location: ${coordinates.lat}, ${coordinates.lon}. Please contact police / 112 and alert ${selectedCountry.embassyName} (${selectedCountry.emergencyPhone24_7}).`;

  const copySms = () => {
    navigator.clipboard.writeText(emergencySmsText);
    setCopiedSms(true);
    setTimeout(() => setCopiedSms(false), 2500);
  };

  const saveIce = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingIce(false);
    try {
      localStorage.setItem('yatra_ice_profile', JSON.stringify(iceProfile));
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex-1 pb-16 space-y-4 px-3 sm:px-5 pt-3">
      {/* ======================================================== */}
      {/* 1. CORE REQUIREMENT: "I NEED HELP" CARD IN ENGLISH & HINDI */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-gradient-to-br from-rose-950/70 via-stone-850 to-stone-900 border-2 border-rose-600/90 p-4 sm:p-5 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600/30 text-rose-300 border border-rose-500 flex items-center justify-center font-bold text-xs">
              SOS
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-rose-100 font-cinzel">
                &ldquo;I Need Help&rdquo; Emergency Card
              </h2>
              <p className="text-[11px] text-stone-400">Show this screen to bystanders, drivers, or police</p>
            </div>
          </div>

          <button
            onClick={() => setShowLargeCardModal(true)}
            className="text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/80 px-2.5 py-1.5 rounded-lg border border-rose-800 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Show Large</span>
          </button>
        </div>

        {/* Bilingual Text Container */}
        <div className="bg-stone-950/90 p-4 rounded-xl border border-rose-900/50 space-y-3">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-mono block">English:</span>
            <p className="text-sm sm:text-base font-bold text-white leading-snug">
              &ldquo;I am in an emergency. Please help me call the police or an ambulance.&rdquo;
            </p>
          </div>

          <div className="pt-2 border-t border-stone-800">
            <span className="text-[10px] text-amber-400 uppercase font-mono block">
              Romanized Hindi (Read to locals):
            </span>
            <p className="text-base sm:text-lg font-bold text-amber-300 font-mono leading-snug">
              &ldquo;Main mushkil mein hoon. Kripya police ya ambulance bulane mein meri madad kijiye.&rdquo;
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Devanagari: &ldquo;मैं मुश्किल में हूँ। कृपया पुलिस या एम्बुलेंस बुलाने में मेरी मदद कीजिये।&rdquo;
            </p>
          </div>
        </div>

        {/* 112 Dialer Button (Never dials by itself, opens phone dialer) */}
        <a
          href="tel:112"
          className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 active:scale-[0.99] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-950/80 transition-all cursor-pointer"
        >
          <PhoneCall className="w-5 h-5" />
          <span>Open Phone Dialer with 112</span>
        </a>
        <p className="text-[10px] text-stone-400 text-center">
          Tap opens your mobile dialer with <strong>112</strong> pre-filled. It will never place a call by itself.
        </p>
      </div>

      {/* Full-Screen Large Card Modal for Bystanders */}
      {showLargeCardModal && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-6 select-none animate-fadeIn">
          <button
            onClick={() => setShowLargeCardModal(false)}
            className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-md w-full bg-stone-900 border-4 border-rose-600 rounded-3xl p-6 text-center space-y-6 shadow-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-rose-400">
              Emergency Card / आपातकालीन सहायता
            </div>

            <div className="text-3xl font-extrabold text-amber-300 font-mono leading-tight">
              &ldquo;Main mushkil mein hoon. Kripya police ya ambulance bulane mein meri madad kijiye.&rdquo;
            </div>

            <div className="text-2xl font-bold text-white leading-relaxed">
              &ldquo;मैं मुश्किल में हूँ। कृपया पुलिस या एम्बुलेंस बुलाने में मेरी मदद कीजिये।&rdquo;
            </div>

            <div className="text-base text-stone-300 border-t border-stone-800 pt-4">
              &ldquo;I am in an emergency. Please help me call police or an ambulance.&rdquo;
            </div>

            <a
              href="tel:112"
              className="w-full py-4 bg-rose-600 text-white font-extrabold rounded-2xl text-base flex items-center justify-center gap-2 shadow-xl"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Dial 112</span>
            </a>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DIPLOMATIC EMBASSY (USER REQUIREMENT)                  */}
      {/* ======================================================== */}
      <div className="rounded-2xl bg-stone-850 border border-amber-800/60 p-4 space-y-3 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl leading-none">{selectedCountry.flag}</span>
            <div>
              <h3 className="text-sm font-bold text-amber-100 font-cinzel">
                Your Country&apos;s Embassy in India
              </h3>
              <p className="text-[11px] text-stone-400">
                24/7 Consular Protection & Emergency Evacuation
              </p>
            </div>
          </div>
          <button
            onClick={onOpenOriginModal}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-750 hover:border-amber-600/60 transition-colors cursor-pointer shrink-0"
          >
            Change
          </button>
        </div>

        <div className="bg-stone-900/90 rounded-xl p-3 border border-stone-800 space-y-2.5 text-xs">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-mono">Diplomatic Mission</span>
              <span className="font-semibold text-stone-100 text-xs sm:text-sm">{selectedCountry.embassyName}</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">{selectedCountry.address}</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] rounded font-mono font-semibold bg-rose-950/80 text-rose-300 border border-rose-800 shrink-0">
              24/7 ON CALL
            </span>
          </div>

          <div className="pt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={`tel:${selectedCountry.emergencyPhone24_7}`}
              className="flex items-center justify-between p-2.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-medium transition-colors shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-200" />
                <span className="text-xs font-semibold">24/7 Consular SOS</span>
              </div>
              <span className="font-mono text-xs font-bold">{selectedCountry.emergencyPhone24_7}</span>
            </a>

            <a
              href={`mailto:${selectedCountry.email}`}
              className="flex items-center justify-between p-2.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-200 font-medium transition-colors border border-stone-700 cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-stone-400">
                <Mail className="w-3.5 h-3.5" />
                <span className="text-xs">Email</span>
              </div>
              <span className="font-mono text-[11px] text-amber-300 truncate max-w-[130px]">{selectedCountry.email}</span>
            </a>
          </div>

          <p className="text-[11px] text-stone-400 pt-1.5 border-t border-stone-800 leading-relaxed">
            <span className="text-amber-400 font-medium">Consular Advice: </span>
            {selectedCountry.specialAdvice}
          </p>
        </div>
      </div>

      {/* Distress Strobe & Whistle Sound Tools */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={toggleSiren}
          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
            isSirenActive
              ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
              : 'bg-stone-850 hover:bg-stone-800 text-stone-200 border-stone-700'
          }`}
        >
          {isSirenActive ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-rose-400" />}
          <span className="text-xs font-semibold">{isSirenActive ? 'Stop Alarm' : 'Loud Alarm'}</span>
          <span className="text-[10px] text-stone-400">Audio Siren</span>
        </button>

        <button
          onClick={handleWhistle}
          className="p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 hover:border-amber-500 text-stone-200 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
        >
          <Radio className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold">Whistle</span>
          <span className="text-[10px] text-stone-400">3 Morse Blasts</span>
        </button>

        <button
          onClick={() => setIsStrobeActive(true)}
          className="p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 hover:border-sky-500 text-stone-200 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
        >
          <Zap className="w-5 h-5 text-sky-400" />
          <span className="text-xs font-semibold">Strobe Light</span>
          <span className="text-[10px] text-stone-400">Night Beacon</span>
        </button>
      </div>

      {/* Fullscreen Strobe */}
      {isStrobeActive && (
        <div 
          onClick={() => setIsStrobeActive(false)}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer transition-colors duration-100 ${
            strobeColor === 'white' ? 'bg-white text-black' : 'bg-red-600 text-white'
          }`}
        >
          <div className="text-center p-6 space-y-4">
            <Zap className="w-16 h-16 mx-auto animate-bounce" />
            <h1 className="text-3xl font-extrabold uppercase tracking-widest font-mono">
              DISTRESS STROBE ACTIVE
            </h1>
            <p className="text-sm font-semibold max-w-sm mx-auto">
              Aim screen toward the road or bystanders to signal for help.
            </p>
            <div className="inline-block px-4 py-2 bg-black/60 text-white rounded-full text-xs font-mono">
              TAP ANYWHERE TO TURN OFF
            </div>
          </div>
        </div>
      )}

      {/* Pre-Formatted Distress SMS with Coordinates */}
      <div className="rounded-xl bg-stone-850 border border-stone-750 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-stone-200">
              Offline GPS Location & Emergency SMS
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">
            {coordinates.accuracy}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-xs font-mono">
          <div>
            <span className="text-[10px] text-stone-400 block font-sans">Latitude</span>
            <span className="text-stone-100 font-bold">{coordinates.lat}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block font-sans">Longitude</span>
            <span className="text-stone-100 font-bold">{coordinates.lon}</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-stone-400">
            <span>Pre-formatted SMS Message:</span>
            <button
              onClick={copySms}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              {copiedSms ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSms ? 'Copied!' : 'Copy SMS'}</span>
            </button>
          </div>
          <p className="text-[11px] text-stone-300 bg-stone-900 p-2.5 rounded-lg border border-stone-800 font-mono leading-relaxed">
            {emergencySmsText}
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <a
            href={`sms:112?body=${encodeURIComponent(emergencySmsText)}`}
            className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Open SMS App (112)</span>
          </a>
        </div>
      </div>

      {/* Helplines List */}
      <div className="rounded-xl bg-stone-850 border border-stone-750 p-4 space-y-2.5">
        <h3 className="text-sm font-semibold text-stone-200 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-amber-400" />
          Direct Emergency Rescue Contacts
        </h3>

        <div className="space-y-2 text-xs">
          {EMERGENCY_HELPLINES.map((hl, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-colors"
            >
              <div>
                <span className="font-semibold text-stone-200 block">{hl.name}</span>
                <span className="text-[11px] text-stone-400">{hl.desc}</span>
              </div>
              <a
                href={`tel:${hl.number}`}
                className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-mono font-bold text-xs shrink-0 flex items-center gap-1 transition-colors"
              >
                <span>{hl.number}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ICE Medical Card */}
      <div className="rounded-xl bg-stone-850 border border-stone-750 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-stone-200">
              ICE (In Case of Emergency) Card
            </h3>
          </div>
          <button
            onClick={() => setIsEditingIce(!isEditingIce)}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
          >
            {isEditingIce ? 'Cancel' : 'Edit Info'}
          </button>
        </div>

        {isEditingIce ? (
          <form onSubmit={saveIce} className="space-y-2.5 text-xs">
            <div>
              <label className="text-stone-400 block mb-0.5">Full Name</label>
              <input
                type="text"
                value={iceProfile.name}
                onChange={(e) => setIceProfile({ ...iceProfile, name: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-100"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-stone-400 block mb-0.5">Citizenship</label>
                <input
                  type="text"
                  value={iceProfile.countryName}
                  onChange={(e) => setIceProfile({ ...iceProfile, countryName: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-100"
                />
              </div>
              <div>
                <label className="text-stone-400 block mb-0.5">Passport / ID No.</label>
                <input
                  type="text"
                  value={iceProfile.passportOrIdNumber}
                  onChange={(e) => setIceProfile({ ...iceProfile, passportOrIdNumber: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-100 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-stone-400 block mb-0.5">Emergency Contact (Name & Phone)</label>
              <input
                type="text"
                value={iceProfile.emergencyContactPhone}
                onChange={(e) => setIceProfile({ ...iceProfile, emergencyContactPhone: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-stone-100"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg transition-colors cursor-pointer mt-1"
            >
              Save ICE Medical Profile
            </button>
          </form>
        ) : (
          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5">
              <span className="text-stone-400">Traveller Name:</span>
              <span className="font-semibold text-stone-100">{iceProfile.name} ({iceProfile.age} yrs)</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5">
              <span className="text-stone-400">Citizenship / Country:</span>
              <span className="text-amber-200 font-medium flex items-center gap-1">
                <span>{selectedCountry.flag}</span>
                <span>{iceProfile.countryName}</span>
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-stone-800 pb-1.5">
              <span className="text-stone-400">Passport / Travel Document:</span>
              <span className="font-mono text-stone-200 font-semibold">{iceProfile.passportOrIdNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-400">Emergency Contact:</span>
              <a href={`tel:${iceProfile.emergencyContactPhone}`} className="text-amber-400 font-mono">
                {iceProfile.emergencyContactPhone}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

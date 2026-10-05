import React, { useState } from 'react';
import { 
  Users, ThumbsUp, MapPin, Clock, Plus, AlertCircle, 
  Send, Radio, Shield, CheckCircle2, Info
} from 'lucide-react';

interface TravellerTip {
  id: string;
  author: string;
  nationality: string;
  location: string;
  category: 'scams' | 'transport' | 'food' | 'sim';
  timeAgo: string;
  message: string;
  upvotes: number;
  hasUpvoted: boolean;
  isLocalUser?: boolean;
}

const INITIAL_TRAVELLER_TIPS: TravellerTip[] = [
  {
    id: 'tip-1',
    author: 'Sarah Jenkins',
    nationality: '🇬🇧 UK',
    location: 'Delhi Airport (T3 Arrival)',
    category: 'transport',
    timeAgo: '2 hours ago',
    message: 'Do not follow guys inside the terminal shouting "Uber" or "Prepaid Taxi". Walk all the way outside to Pillar 10 for the official Delhi Traffic Police prepaid booth, or take the Airport Express Metro straight to New Delhi station for ₹60.',
    upvotes: 84,
    hasUpvoted: false
  },
  {
    id: 'tip-2',
    author: 'Markus Lindqvist',
    nationality: '🇩🇪 Germany',
    location: 'New Delhi Railway Station',
    category: 'scams',
    timeAgo: '5 hours ago',
    message: 'Touts tried telling me the station was closed for a VIP visit. Walked right past them to the 1st floor International Tourist Bureau and bought my foreign tourist quota ticket to Agra in 15 minutes at standard government rates!',
    upvotes: 112,
    hasUpvoted: true
  },
  {
    id: 'tip-3',
    author: 'Elena Rostova',
    nationality: '🇨🇦 Canada',
    location: 'Connaught Place, Delhi',
    category: 'sim',
    timeAgo: 'Yesterday',
    message: 'Airtel store at the airport took 3 hours to activate. Make sure to dial 59059 from your phone once you see the network bars; it prompts for the last 4 digits of your passport to finish verification.',
    upvotes: 56,
    hasUpvoted: false
  },
  {
    id: 'tip-4',
    author: 'David Chen',
    nationality: '🇦🇺 Australia',
    location: 'Varanasi Ghats',
    category: 'food',
    timeAgo: '2 days ago',
    message: 'Always carry a sleeve of ORS sachets in your daypack. When ordering lassi, make sure they open bottled water in front of you if making it diluted. Blue Lassi shop near Manikarnika is fantastic and safe.',
    upvotes: 93,
    hasUpvoted: false
  }
];

export const CommunityTab: React.FC = () => {
  const [filterCat, setFilterCat] = useState<string>('all');
  const [tips, setTips] = useState<TravellerTip[]>(() => {
    try {
      const saved = localStorage.getItem('yatra_traveller_tips');
      return saved ? JSON.parse(saved) : INITIAL_TRAVELLER_TIPS;
    } catch {
      return INITIAL_TRAVELLER_TIPS;
    }
  });

  const [showNewModal, setShowNewModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorNation, setAuthorNation] = useState('🇺🇸 USA');
  const [tipLocation, setTipLocation] = useState('');
  const [tipCategory, setTipCategory] = useState<'scams' | 'transport' | 'food' | 'sim'>('scams');
  const [tipMessage, setTipMessage] = useState('');
  const [savedBanner, setSavedBanner] = useState(false);

  const handleUpvote = (id: string) => {
    const updated = tips.map(t => {
      if (t.id === id) {
        const isUp = t.hasUpvoted;
        return {
          ...t,
          upvotes: isUp ? t.upvotes - 1 : t.upvotes + 1,
          hasUpvoted: !isUp
        };
      }
      return t;
    });
    setTips(updated);
    try {
      localStorage.setItem('yatra_traveller_tips', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handlePostTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipMessage.trim() || !tipLocation.trim()) return;

    const newTip: TravellerTip = {
      id: `tip-custom-${Date.now()}`,
      author: authorName.trim() || 'Anonymous Traveller',
      nationality: authorNation,
      location: tipLocation.trim(),
      category: tipCategory,
      timeAgo: 'Just now',
      message: tipMessage.trim(),
      upvotes: 1,
      hasUpvoted: true,
      isLocalUser: true
    };

    const updated = [newTip, ...tips];
    setTips(updated);
    try {
      localStorage.setItem('yatra_traveller_tips', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setTipMessage('');
    setTipLocation('');
    setAuthorName('');
    setShowNewModal(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  const filteredTips = tips.filter(t => {
    if (filterCat === 'all') return true;
    return t.category === filterCat;
  });

  return (
    <div className="flex-1 pb-16 space-y-4 px-3 sm:px-5 pt-3">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-stone-850 via-stone-800 to-stone-900 border border-stone-700/80 p-4 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-100 font-cinzel">
                Traveller Community Wire
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <span>Tips from Foreign Backpackers & Tourists</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Tip</span>
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-3 text-xs">
          {[
            { id: 'all', label: 'All Tips' },
            { id: 'scams', label: 'Scam Warnings' },
            { id: 'transport', label: 'Taxis & Trains' },
            { id: 'sim', label: 'SIM & Connectivity' },
            { id: 'food', label: 'Water & Food' }
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setFilterCat(c.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                filterCat === c.id
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:text-stone-100 border border-stone-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Rule Notice: Sample Data Clearly Marked */}
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-[11px] text-amber-300">
        <Info className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          <strong>Sample Community Prototype</strong>: Showing offline pre-bundled sample posts. Live backend synchronization will be enabled in a future release.
        </span>
      </div>

      {savedBanner && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Tip saved to local device storage!</span>
        </div>
      )}

      {/* Tips Feed */}
      <div className="space-y-3">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="rounded-2xl bg-stone-850 border border-stone-750 p-4 space-y-2.5 shadow-sm hover:border-stone-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-stone-300">
                  <span className="font-bold text-stone-100">{tip.author}</span>
                  <span className="text-[11px] font-mono text-stone-400">{tip.nationality}</span>
                  {tip.isLocalUser && (
                    <span className="text-[10px] text-amber-400 font-mono">(You)</span>
                  )}
                  <span className="text-stone-600">·</span>
                  <span className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Clock className="w-3 h-3" />
                    <span>{tip.timeAgo}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{tip.location}</span>
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                {tip.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {tip.message}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
              <span className="text-[10px] text-stone-500 font-mono">Verified Visitor Tip</span>

              <button
                onClick={() => handleUpvote(tip.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  tip.hasUpvoted
                    ? 'bg-amber-950/40 text-amber-300 border-amber-800/70'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${tip.hasUpvoted ? 'fill-current' : ''}`} />
                <span className="font-mono">{tip.upvotes}</span>
                <span className="hidden sm:inline">Helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Tip Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-stone-900 rounded-3xl border border-stone-700 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <h4 className="text-base font-bold text-amber-100 font-cinzel">Share Traveller Tip</h4>
                <p className="text-[11px] text-stone-400">Help fellow first-time foreign visitors</p>
              </div>
              <button 
                onClick={() => setShowNewModal(false)}
                className="text-stone-400 hover:text-stone-200 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostTip} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-2.5 py-1.5 bg-stone-850 border border-stone-700 rounded-lg text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Country</label>
                  <input
                    type="text"
                    value={authorNation}
                    onChange={(e) => setAuthorNation(e.target.value)}
                    placeholder="🇺🇸 USA / 🇬🇧 UK"
                    className="w-full px-2.5 py-1.5 bg-stone-850 border border-stone-700 rounded-lg text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">City / Location *</label>
                <input
                  type="text"
                  required
                  value={tipLocation}
                  onChange={(e) => setTipLocation(e.target.value)}
                  placeholder="e.g. Paharganj, Delhi Airport, Agra Fort..."
                  className="w-full px-2.5 py-1.5 bg-stone-850 border border-stone-700 rounded-lg text-stone-100"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Topic</label>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value as typeof tipCategory)}
                  className="w-full px-2.5 py-1.5 bg-stone-850 border border-stone-700 rounded-lg text-stone-100"
                >
                  <option value="scams">Scam Warning</option>
                  <option value="transport">Taxis / Auto / Trains</option>
                  <option value="sim">SIM Cards & Connectivity</option>
                  <option value="food">Water & Safe Eating</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Your Advice *</label>
                <textarea
                  required
                  rows={3}
                  value={tipMessage}
                  onChange={(e) => setTipMessage(e.target.value)}
                  placeholder="What should other foreign tourists know here?"
                  className="w-full px-2.5 py-1.5 bg-stone-850 border border-stone-700 rounded-lg text-stone-100 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 py-2 rounded-lg bg-stone-800 text-stone-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Offline</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

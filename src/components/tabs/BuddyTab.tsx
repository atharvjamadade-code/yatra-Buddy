import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, Volume2, VolumeX, ExternalLink, 
  RotateCcw, ShieldCheck, AlertCircle, Bot, User
} from 'lucide-react';
import { RetrievalBuddyEngine, BuddyAnswer } from '../../utils/buddyEngine';
import { speakTextOffline, stopSpeech } from '../../utils/audioSynthesizer';

const SUGGESTION_CHIPS = [
  'What if the taxi driver says my hotel is closed or burned down?',
  'Do I need to register with the FRRO if staying under 180 days?',
  'What should I do if an auto-rickshaw driver refuses the meter?',
  'Is tap water safe to drink in India and what about street ice?',
  'How do I buy a tourist SIM card at the airport?',
  'Where is the real International Tourist Bureau for train tickets?',
  'Can foreign tourists use UPI mobile scan-to-pay in India?',
  'Emergency police and ambulance dialer number in India'
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'buddy';
  text: string;
  sourceLabel?: string;
  sourceUrl?: string;
  confidence?: number;
  hasVettedAnswer?: boolean;
  isLlmRephrased?: boolean;
  title?: string;
  timestamp: string;
}

const engine = new RetrievalBuddyEngine();

interface BuddyTabProps {
  initialQuery?: string;
}

export const BuddyTab: React.FC<BuddyTabProps> = ({ initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'buddy',
      text: "Namaste! I am your offline Yatra Buddy. I run completely on your device without internet. Ask me anything about avoiding scams, dealing with auto-rickshaws, e-Visas, FRRO registration, water safety, or emergencies. I only share verified official guidance and will never invent an answer.",
      timestamp: 'Just now',
      hasVettedAnswer: true
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [useLlmRephrase, setUseLlmRephrase] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle incoming initialQuery from other tabs
  useEffect(() => {
    if (initialQuery) {
      handleAskQuestion(initialQuery);
    }
  }, [initialQuery]);

  const handleAskQuestion = async (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    stopSpeech();
    setIsSpeaking(false);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Run offline retrieval engine
    const answerResult: BuddyAnswer = await engine.answer(q, useLlmRephrase);

    setTimeout(() => {
      setIsTyping(false);
      const buddyMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'buddy',
        text: answerResult.answer,
        sourceLabel: answerResult.sourceLabel,
        sourceUrl: answerResult.sourceUrl,
        confidence: answerResult.confidence,
        hasVettedAnswer: answerResult.hasVettedAnswer,
        isLlmRephrased: answerResult.isLlmRephrased,
        title: answerResult.title,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, buddyMsg]);
    }, 350);
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakTextOffline(text, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="flex-1 pb-16 flex flex-col h-full bg-stone-900">
      {/* Buddy Header & Brain Config Bar */}
      <div className="bg-stone-850 border-b border-stone-800 p-3 sm:px-4 shrink-0 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-amber-100 font-cinzel">
                Offline AI Buddy
              </h2>
              <span className="text-[10px] text-emerald-400 font-mono block">
                100% On-Device · Retrieval Engine
              </span>
            </div>
          </div>

          {/* On-Device LLM Rephraser Toggle */}
          <div className="flex items-center gap-1.5 bg-stone-900 px-2 py-1 rounded-lg border border-stone-750">
            <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">1B Model:</span>
            <button
              onClick={() => setUseLlmRephrase(prev => !prev)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors cursor-pointer ${
                useLlmRephrase
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {useLlmRephrase ? 'LLM Rephrase ON' : 'Direct Fact Mode'}
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 mt-2.5 text-xs no-scrollbar">
          {SUGGESTION_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(chip)}
              className="whitespace-nowrap px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-amber-200 border border-stone-750 text-[11px] font-medium transition-colors cursor-pointer shrink-0"
            >
              {chip.length > 38 ? chip.slice(0, 36) + '...' : chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[92%] sm:max-w-[85%] ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-800 border border-stone-700 text-amber-400'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-3 text-xs leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-amber-600 text-white rounded-tr-xs shadow-md'
                    : 'bg-stone-850 border border-stone-750 text-stone-200 rounded-tl-xs shadow-sm'
                }`}
              >
                {msg.title && (
                  <div className="font-bold text-amber-300 font-cinzel text-xs border-b border-stone-700/60 pb-1">
                    {msg.title}
                  </div>
                )}

                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Source Label & Tappable Link */}
                {!isUser && msg.sourceLabel && (
                  <div className="pt-2 border-t border-stone-750/80 flex items-center justify-between gap-2 text-[10px] text-stone-400">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Source:</span>
                      {msg.sourceUrl ? (
                        <a
                          href={msg.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 hover:underline flex items-center gap-0.5 font-medium"
                        >
                          <span>{msg.sourceLabel}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-stone-300 font-medium">{msg.sourceLabel}</span>
                      )}
                    </div>

                    {/* Speech audio button */}
                    <button
                      onClick={() => handleSpeak(msg.text)}
                      title="Listen aloud (TTS)"
                      className="p-1 rounded text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2 items-center text-xs text-stone-400 pl-2">
            <Bot className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="italic">Scoring bundled knowledge.json...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-stone-850 border-t border-stone-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuestion(inputQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about visas, scams, auto meter, drinking water..."
            className="flex-1 px-3 py-2 bg-stone-900 border border-stone-750 rounded-xl text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-stone-500 text-center mt-1.5">
          Answers generated from bundled offline knowledge. Vetted travel guidance, not legal advice.
        </p>
      </div>
    </div>
  );
};

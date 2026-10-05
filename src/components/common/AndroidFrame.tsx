import React, { useState, useEffect } from 'react';
import { WifiOff, BatteryMedium } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isPhoneFrame: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children, isPhoneFrame }) => {
  const [timeStr, setTimeStr] = useState('09:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isPhoneFrame) {
    return (
      <main className="w-full max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
    );
  }

  return (
    <div className="flex justify-center items-center py-4 px-2 sm:py-8 select-none">
      {/* Phone Outer Shell */}
      <div className="w-full max-w-[412px] bg-stone-950 rounded-[44px] p-2.5 shadow-2xl shadow-black/80 border-4 border-stone-800 relative transition-all duration-300">
        {/* Subtle Side Button Accents */}
        <div className="absolute -left-[7px] top-28 w-[3px] h-12 bg-stone-700 rounded-l" />
        <div className="absolute -left-[7px] top-44 w-[3px] h-20 bg-stone-700 rounded-l" />
        <div className="absolute -right-[7px] top-32 w-[3px] h-14 bg-stone-700 rounded-r" />

        {/* Screen Bezel & Display */}
        <div className="w-full bg-stone-900 rounded-[36px] overflow-hidden flex flex-col h-[780px] max-h-[88vh] border border-stone-800 relative">
          
          {/* Android Status Bar */}
          <div className="w-full h-7 bg-stone-950/80 backdrop-blur-sm px-6 flex items-center justify-between text-xs text-stone-400 shrink-0 z-50">
            <span className="font-semibold text-stone-300 text-[11px] font-mono tracking-tight">{timeStr}</span>
            
            {/* Front Camera Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-stone-950 border border-stone-800 mx-auto" />

            <div className="flex items-center gap-1.5 text-[11px]">
              <WifiOff className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-stone-400 font-mono">OFFLINE</span>
              <BatteryMedium className="w-3.5 h-3.5 text-stone-300 ml-0.5" />
              <span className="text-[10px] font-mono text-stone-300">88%</span>
            </div>
          </div>

          {/* Main App Content Viewport */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative bg-stone-900">
            {children}
          </div>

          {/* Android Home Navigation Gesture Bar */}
          <div className="w-full h-4 bg-stone-950 flex items-center justify-center shrink-0 z-50">
            <div className="w-28 h-1 bg-stone-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

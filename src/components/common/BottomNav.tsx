import React from 'react';
import { Home, MessageSquare, Headphones, Users, ShieldAlert } from 'lucide-react';
import { TabType } from '../../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  hindiLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  isAlert?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', hindiLabel: 'होम', icon: Home },
  { id: 'buddy', label: 'Buddy', hindiLabel: 'मित्र', icon: MessageSquare },
  { id: 'guides', label: 'Guides', hindiLabel: 'मार्गदर्शक', icon: Headphones },
  { id: 'community', label: 'Community', hindiLabel: 'समुदाय', icon: Users },
  { id: 'sos', label: 'SOS', hindiLabel: 'सुरक्षा', icon: ShieldAlert, isAlert: true }
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 px-2 py-1 select-none"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around h-15">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          let textColor = 'text-stone-400 hover:text-stone-200';
          let iconColor = 'text-stone-400 group-hover:text-stone-200';
          let indicatorBg = 'transparent';

          if (isActive) {
            if (item.isAlert) {
              textColor = 'text-rose-400 font-semibold';
              iconColor = 'text-rose-400';
              indicatorBg = 'bg-rose-500/20';
            } else {
              textColor = 'text-amber-400 font-semibold';
              iconColor = 'text-amber-400';
              indicatorBg = 'bg-amber-500/20';
            }
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="group flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-1 rounded-xl transition-all cursor-pointer relative"
              aria-label={`${item.label} tab`}
              aria-selected={isActive}
              role="tab"
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-lg transition-colors ${indicatorBg}`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  } ${iconColor}`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap transition-colors ${textColor}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

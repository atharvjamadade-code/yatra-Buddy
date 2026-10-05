import React, { useState } from 'react';
import { TabType, CountryOrigin } from './types';
import { YATRAS } from './data/yatrasData';
import { getEmbassyByCode } from './data/embassyData';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { AndroidFrame } from './components/common/AndroidFrame';
import { OriginModal } from './components/common/OriginModal';
import { HomeTab } from './components/tabs/HomeTab';
import { BuddyTab } from './components/tabs/BuddyTab';
import { GuidesTab } from './components/tabs/GuidesTab';
import { CommunityTab } from './components/tabs/CommunityTab';
import { SosTab } from './components/tabs/SosTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeYatraId, setActiveYatraId] = useState<string>('kedarnath');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [pendingBuddyQuery, setPendingBuddyQuery] = useState<string>('');

  // Selected Country & Linked Embassy
  const [selectedCountry, setSelectedCountry] = useState<CountryOrigin>(() => {
    try {
      const savedCode = localStorage.getItem('yatra_user_country_code');
      return getEmbassyByCode(savedCode || 'IN');
    } catch {
      return getEmbassyByCode('IN');
    }
  });

  // Prompt user on entry: check if they have completed origin selection
  const [isOriginModalOpen, setIsOriginModalOpen] = useState<boolean>(() => {
    try {
      const completed = localStorage.getItem('yatra_user_origin_completed');
      return !completed; // true if new user entering app
    } catch {
      return true;
    }
  });

  const handleSelectCountry = (country: CountryOrigin, idNumber?: string) => {
    setSelectedCountry(country);
    try {
      localStorage.setItem('yatra_user_country_code', country.code);
      localStorage.setItem('yatra_user_origin_completed', 'true');

      // Update ICE Profile with country and optional passport/id number
      const savedIce = localStorage.getItem('yatra_ice_profile');
      const iceObj = savedIce ? JSON.parse(savedIce) : {};
      const updatedIce = {
        ...iceObj,
        countryCode: country.code,
        countryName: country.name,
        ...(idNumber ? { passportOrIdNumber: idNumber } : {})
      };
      localStorage.setItem('yatra_ice_profile', JSON.stringify(updatedIce));
    } catch {
      // ignore
    }
  };

  const handleAskBuddyQuestion = (query: string) => {
    setPendingBuddyQuery(query);
    setActiveTab('buddy');
  };

  const currentYatra = YATRAS.find(y => y.id === activeYatraId) || YATRAS[0];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Application Header */}
      <Header
        activeYatraId={activeYatraId}
        onSelectYatra={setActiveYatraId}
        isPhoneFrame={isPhoneFrame}
        onToggleFrame={() => setIsPhoneFrame(prev => !prev)}
        onGoToSos={() => setActiveTab('sos')}
        activeTab={activeTab}
        selectedCountry={selectedCountry}
        onOpenOriginModal={() => setIsOriginModalOpen(true)}
      />

      {/* Main Body with Android Phone Frame or Expanded Viewport */}
      <div className="flex-1 flex flex-col">
        <AndroidFrame isPhoneFrame={isPhoneFrame}>
          {/* Active Tab View */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'home' && (
              <HomeTab
                onNavigateTab={(tab) => setActiveTab(tab)}
                selectedCountry={selectedCountry}
                onOpenOriginModal={() => setIsOriginModalOpen(true)}
                onAskBuddyQuestion={handleAskBuddyQuestion}
              />
            )}

            {activeTab === 'buddy' && (
              <BuddyTab initialQuery={pendingBuddyQuery} />
            )}

            {activeTab === 'guides' && (
              <GuidesTab />
            )}

            {activeTab === 'community' && (
              <CommunityTab />
            )}

            {activeTab === 'sos' && (
              <SosTab
                selectedCountry={selectedCountry}
                onOpenOriginModal={() => setIsOriginModalOpen(true)}
              />
            )}
          </div>

          {/* Bottom 5-Tab Navigation Bar */}
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab !== 'buddy') {
                setPendingBuddyQuery('');
              }
            }}
          />
        </AndroidFrame>
      </div>

      {/* Entry / Onboarding Origin Country Modal */}
      <OriginModal
        isOpen={isOriginModalOpen}
        onClose={() => setIsOriginModalOpen(false)}
        selectedCountryCode={selectedCountry.code}
        onSelectCountry={handleSelectCountry}
      />
    </div>
  );
}

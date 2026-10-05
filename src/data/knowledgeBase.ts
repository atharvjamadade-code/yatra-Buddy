import { KnowledgeTopic } from '../types';

export const OFFLINE_KNOWLEDGE_BASE: KnowledgeTopic[] = [
  {
    id: 'ams-altitude-sickness',
    keywords: [
      'ams', 'altitude sickness', 'breathing', 'dizzy', 'dizziness', 'headache',
      'nausea', 'vomiting', 'oxygen', 'high altitude', 'suffocation', 'chest tightness',
      'tired', 'faint', 'altitude', 'kapoor', 'camphor', 'diamox'
    ],
    title: 'Altitude Sickness (AMS) Management & Emergency Protocols',
    category: 'health',
    categoryLabel: 'Medical & High Altitude',
    summary: 'Recognizing Acute Mountain Sickness (AMS) symptoms early and immediate actions to prevent HAPE/HACE above 2,500 meters.',
    fullAdvice: [
      'Early symptoms include throbbing headache, loss of appetite, persistent nausea, unusual fatigue, and disrupted sleep.',
      'Immediate action: Stop ascending immediately. Rest at current altitude for at least 2 hours with hot fluids.',
      'Smell crushed Camphor (Kapoor) tied in a clean handkerchief to help stimulate respiratory sensation and open nasal passages.',
      'Sip warm water mixed with electrolyte/glucose powder. Never drink freezing glacial river water directly as it constricts airways.',
      'Free Government Oxygen Parlours are stationed at Bheembali, Lincholi, and Kedarnath Base Camp (run by SDRF & NDRF).',
      'If headache does not subside after 2 hours or if lips turn bluish/purple, immediately descend at least 400-500 meters down with a companion.'
    ],
    importantWarning: 'DO NOT ignore a worsening persistent cough with pinkish phlegm or loss of walking coordination. These indicate HAPE/HACE requiring immediate descent and emergency SDRF evacuation.',
    verifiedOfficial: true
  },
  {
    id: 'helicopter-booking-scam-safety',
    keywords: [
      'helicopter', 'heli', 'chopper', 'phata', 'guptkashi', 'sersi', 'ticket',
      'booking', 'scam', 'fraud', 'fake ticket', 'irctc heli', 'rates', 'price'
    ],
    title: 'Official Helicopter Booking Guidelines & Anti-Scam Alert',
    category: 'transport',
    categoryLabel: 'Helicopter & Aviation',
    summary: 'Official helipad operators, booking portal procedures, and warning against counterfeit WhatsApp and fraudulent agent tickets.',
    fullAdvice: [
      'Official bookings for Kedarnath are ONLY conducted through the authorized IRCTC Heli Yatra portal (heliyatra.irctc.co.in).',
      'Operating Helipads are located at Phata, Sersi, and Guptkashi. Government approved one-way fare ranges between ₹2,800 to ₹4,000 depending on helipad distance.',
      'Strict weight limit: Maximum passenger weight + baggage allowance is strictly enforced (generally 2 to 5 kg small soft bag per passenger). Excess baggage must be left at base camp lockers.',
      'Counterfeit ticket caution: Never transfer money to personal Google Pay, PhonePe, or WhatsApp numbers claiming to provide "instant VIP helicopter passes". Shrine Board issues no emergency helicopter quotas over chat.',
      'Weather cancellation rule: If flights are suspended due to sudden cloud cover or mountain gusts, 100% fare is refunded directly to the original booking account.'
    ],
    importantWarning: 'Always carry a printed copy of your IRCTC heli ticket alongside the original Aadhaar card used during online booking. QR codes are verified at the security gates.',
    verifiedOfficial: true
  },
  {
    id: 'pony-doli-kandi-rates',
    keywords: [
      'pony', 'horse', 'khachchar', 'mule', 'doli', 'palanquin', 'kandi', 'pitthu',
      'rates', 'fare', 'price', 'union', 'charges', 'gaurikund to kedarnath'
    ],
    title: 'Pony, Mule, Doli & Kandi Official Union Rates & Rules',
    category: 'transport',
    categoryLabel: 'Trek Transport & Porterage',
    summary: 'Standard District Administration authorized rate charts for ponies, dolies, and child/luggage porters.',
    fullAdvice: [
      'Always hire ponies and porters ONLY from the official Municipal / Shrine Board prepaid counters located at Gaurikund or Katra.',
      'Gaurikund to Kedarnath official one-way pony rate is capped by District Administration (~₹3,000 to ₹3,500). Round-trip booked in advance carries subsidized package fare.',
      'Doli (Palanquin carried by 4 porters) costs approximately ₹8,000 to ₹10,000 depending on passenger weight bracket (under 75kg / 75kg-90kg).',
      'Pitthu / Kandi (bamboo carrier for children or heavy backpacks) costs ~₹1,200 to ₹1,800 for 15-20 kg luggage.',
      'Ensure the horse handler provides the printed municipal token receipt with the registration number tag displayed on the animal neck.',
      'Humane animal treatment: Report any overburdened or limping animals to the Animal Husbandry inspection squad posted at Jungle Chatti.'
    ],
    importantWarning: 'Never pay the full advance amount to freelance operators outside the registered prepaid counter. Retain your half of the token slip until safely reaching the destination.',
    verifiedOfficial: true
  },
  {
    id: 'darshan-vip-pass-rules',
    keywords: [
      'darshan', 'vip pass', 'queue', 'waiting time', 'timing', 'entry', 'dress code',
      'sanctum', 'garbhagriha', 'shringar', 'aarti', 'fast track', 'sugam darshan'
    ],
    title: 'Temple Darshan Rules, VIP Pass Procedure & Dress Code',
    category: 'darshan',
    categoryLabel: 'Darshan & Temple Protocols',
    summary: 'Sanctum entry hours, priority queue slips, permitted puja offerings, and strict dress codes.',
    fullAdvice: [
      'Kedarnath General Darshan operates from 07:00 AM to 03:00 PM, and reopens from 05:00 PM to 08:30 PM after daily sanctum purification.',
      'Special Morning Mahabhishek Puja (04:00 AM to 07:00 AM) allows devotees inside the Garbhagriha to perform holy touch and mantra recitation. Prior online booking through Badri-Kedar Temple Committee (BKTC) is mandatory.',
      'Dress code: Modest traditional attire is recommended (Kurta-Pyjama / Dhoti for men, Saree / Salwar Kameez for women). Thermal innerwear under traditional clothes is permitted.',
      'Leather prohibition: Leather belts, pure leather wallets, and shoes must be deposited at free cloakrooms outside temple parikrama.',
      'Photography & videography: Strictly forbidden inside the sanctum. CCTV surveillance is active and violators are subject to shrine fines.'
    ],
    importantWarning: 'Be wary of touts around the parikrama claiming to offer "secret backstage queue skips". Shrine guards only honor official BKTC / Shrine Board electronic barcodes.',
    verifiedOfficial: true
  },
  {
    id: 'water-food-langar-hygiene',
    keywords: [
      'water', 'drinking water', 'food', 'langar', 'eating', 'tea', 'hygiene', 'stomach',
      'meal', 'free food', 'bhandara', 'boiled water', 'glucose'
    ],
    title: 'Safe Drinking Water, Free Langars & Mountain Nutrition',
    category: 'logistics',
    categoryLabel: 'Food, Water & Hydration',
    summary: 'Locating clean drinking water points, authorized free bhandaras, and high-energy trail eating advice.',
    fullAdvice: [
      'Filtered and UV-treated hot drinking water taps are provided free of cost by the administration every 500 meters along major pilgrim tracks.',
      'Never drink cold raw water directly from natural cascades or hillside streams, which may contain glacial silt or upstream contamination causing acute gastroenteritis.',
      'Carry a 1-liter thermal steel flask to refill steaming hot water. Adding glucose or ginger-lemon drops keeps your body warm.',
      'Charitable Langars (Bhandaras) provide free nutritious satvik meals (khichdi, dal-roti, hot kheer, herbal tea) along Bheembali, Lincholi, and Baltal trails.',
      'Eat light, frequent meals high in complex carbohydrates (dry fruits, roasted chana, energy bars) rather than heavy fried parathas or oily snacks before uphill ascents.'
    ],
    importantWarning: 'Avoid packaged junk foods or heavy dairy items when climbing steep gradients to prevent digestive cramps and altitude nausea.',
    verifiedOfficial: true
  },
  {
    id: 'clothing-weather-gear-layering',
    keywords: [
      'clothing', 'clothes', 'jacket', 'shoes', 'boots', 'layering', 'rain', 'weather',
      'cold', 'snow', 'gloves', 'socks', 'packing', 'windcheater', 'thermals'
    ],
    title: 'Mountain Layering System, Footwear & Weather Protection',
    category: 'logistics',
    categoryLabel: 'Gear & Cold Weather',
    summary: 'The 3-layer mountain clothing strategy, waterproof gear, and proper trekking footwear to avoid blisters.',
    fullAdvice: [
      'The 3-Layer Rule: Base layer (synthetic or merino thermal inner), Mid layer (fleece jacket or light down sweater), Outer layer (windproof & waterproof shell jacket).',
      'Avoid cotton shirts or jeans! Wet cotton retains moisture, clings to skin, and accelerates hypothermia rapidly in Himalayan breezes.',
      'Footwear: Wear ankle-support trekking shoes with deep lugged rubber soles. Break in new shoes at home for at least 10 days before the yatra to avoid debilitating blisters.',
      'Wear double socks: A thin moisture-wicking synthetic liner sock inside a thick woolen cushion sock prevents skin friction.',
      'Always pack an emergency heavy-duty PVC rain poncho that covers both your body and your backpack.',
      'Carry two pairs of gloves: Light inner fleece liner gloves and an outer waterproof wind-resistant pair.'
    ],
    importantWarning: 'Temperatures in Garhwal and Kashmir can plummet from +15°C to -4°C in less than 30 minutes during sudden cloudbursts. Keep your warm cap and poncho in the top pouch of your backpack.',
    verifiedOfficial: true
  },
  {
    id: 'spiritual-history-kedarnath-pandavas',
    keywords: [
      'kedarnath history', 'pandavas', 'shiva', 'bull', 'nandi', 'mythology', 'story',
      'origin', 'legend', 'jyotirlinga', 'adi shankaracharya', 'bhima'
    ],
    title: 'Spiritual Legend of Kedarnath: Pandavas & Adi Shankaracharya',
    category: 'lore',
    categoryLabel: 'Spiritual Lore & Sacred History',
    summary: 'The Mahabharata legend of the Pandavas seeking redemption and the bull form of Lord Shiva at Kedarnath.',
    fullAdvice: [
      'Following the Kurukshetra war, the Pandavas felt deep remorse for the deaths of their kin and sought the darshan of Lord Shiva to absolve their sins.',
      'Lord Shiva, eluding them, took the disguise of a celestial bull grazing among cattle at Guptkashi and the high meadows of Kedar.',
      'Bhima recognized the extraordinary bull and stretched his massive legs across two mountain ridges to prevent its escape. As the bull dived into the earth, Bhima held onto its triangular hump.',
      'The triangular hump remained at Kedarnath, while other parts of Shiva materialized as the Panch Kedar: Arms at Tungnath, Face at Rudranath, Navel at Madhyamaheshwar, and Hair Locks at Kalpeshwar.',
      'The revered 8th-century philosopher-saint Adi Shankaracharya revitalized the holy temple and attained Mahasamadhi behind the sanctum at the young age of 32.'
    ],
    importantWarning: 'Kedarnath is one of the premier twelve Jyotirlingas, where Lord Shiva is worshipped in his natural pyramidal rock form without a carved human visage.',
    verifiedOfficial: true
  },
  {
    id: 'lost-and-found-family-separation',
    keywords: [
      'lost', 'missing', 'separated', 'family', 'child', 'elderly', 'crowd', 'announcement',
      'help desk', 'police post', 'phone dead', 'no signal'
    ],
    title: 'Handling Crowd Separation, Missing Companions & Lost Property',
    category: 'safety',
    categoryLabel: 'Emergency & Lost Protocol',
    summary: 'Standard drill if separated in heavy crowds when mobile phone towers have zero cellular reception.',
    fullAdvice: [
      'Pre-trek Golden Rule: Before leaving base camp, designate a specific landmark meeting spot (e.g., "The Giant Bell outside Temple Gate 2" or "SDRF Tent at Bheembali").',
      'Equip children and elderly family members with a laminated card worn around their neck containing their full name, home address, group leader contact, and blood group.',
      'Shrine Public Announcement System: Loudspeaker control rooms operate continuously at Gaurikund, Bheembali, and Kedarnath Mandir complex. Inform the nearest police desk to broadcast your companion name.',
      'Police Lost & Found camps maintain physical logbooks with instant walkie-talkie communication between all trail checkpoints.',
      'Keep whistle in easy reach: Blow 3 short blasts in a repeated sequence if stranded away from the main trail path.'
    ],
    importantWarning: 'Do not panic or wander off the paved stone path looking for missing relatives in the darkness. Remain at the nearest brightly lit administration post or SDRF tent.',
    verifiedOfficial: true
  },
  {
    id: 'offline-app-explanation',
    keywords: [
      'offline', 'network', 'internet', 'jio', 'airtel', 'bsnl', 'signal', 'no internet',
      'how does buddy work', 'on device', 'ai', 'data'
    ],
    title: 'How Yatra Buddy Operates 100% Offline Without Cellular Data',
    category: 'logistics',
    categoryLabel: 'Technology & Connectivity',
    summary: 'Explaining on-device storage, zero network permission architecture, and cellular signal patterns.',
    fullAdvice: [
      'Yatra Buddy requires ZERO active cellular or Wi-Fi data to function. All trail guides, emergency hotlines, and knowledge responses are stored locally on your device.',
      'BSNL, Jio, and Airtel maintain limited 4G towers at Gaurikund and Kedarnath base, but connectivity frequently drops along high passes and during thunderstorms.',
      'Keep your phone in Airplane Mode with Location (GPS) ON to save over 70% of battery while maintaining instant coordinate tracking for SOS rescue.',
      'The Buddy assistant uses an on-device keyword inference engine simulating the planned offline neural model, ensuring instant answers in deep gorges.'
    ],
    verifiedOfficial: true
  },
  {
    id: 'foreign-pilgrims-embassy-support',
    keywords: [
      'embassy', 'foreign', 'consulate', 'passport', 'visa', 'foreigner', 'american',
      'british', 'nepali', 'overseas', 'diplomatic', 'country', 'international', 'nri', 'oci'
    ],
    title: 'International Pilgrims: Embassy Rescue & Lost Passport Protocol',
    category: 'safety',
    categoryLabel: 'Diplomatic & Overseas Yatris',
    summary: 'Procedures for international pilgrims and NRIs/OCIs facing medical distress or lost passports in remote Himalayan zones.',
    fullAdvice: [
      'Embassy 24/7 Consular lines are pre-loaded in the Yatra Buddy SOS Tab for your country (USA, UK, Canada, Nepal, Australia, etc.).',
      'If you lose your physical passport on the trek, immediately obtain a Police Lost Property Report (FIR / GD Entry) from the nearest police post at Gaurikund or Katra.',
      'Your diplomatic embassy in New Delhi can issue an Emergency Travel Document (ETD) or emergency passport upon verification with local police.',
      'In severe medical crises (AMS/HAPE), foreign diplomatic mission duty officers coordinate with India’s Ministry of External Affairs and SDRF for emergency air ambulance or helicopter evacuation.',
      'Keep your Passport number and Country of Origin updated in the Yatra Buddy SOS tab so emergency dispatch SMS messages automatically alert your embassy.'
    ],
    importantWarning: 'Ensure you possess high-altitude travel medical insurance that explicitly covers emergency mountain search & helicopter rescue above 3,000 meters.',
    verifiedOfficial: true
  }
];

// Offline Search & Intent Matching Engine
export function queryKnowledgeBase(query: string, currentCategory?: string): {
  bestMatch: KnowledgeTopic | null;
  relatedTopics: KnowledgeTopic[];
  matchedKeywords: string[];
} {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery && !currentCategory) {
    return {
      bestMatch: OFFLINE_KNOWLEDGE_BASE[0],
      relatedTopics: OFFLINE_KNOWLEDGE_BASE.slice(1, 5),
      matchedKeywords: []
    };
  }

  // Tokenize query words
  const words = cleanQuery.split(/[\s,?.!-]+/).filter(w => w.length > 2);

  const scored = OFFLINE_KNOWLEDGE_BASE.map(topic => {
    let score = 0;
    const hitKeywords: string[] = [];

    // Category boost
    if (currentCategory && topic.category === currentCategory) {
      score += 15;
    }

    // Direct title match
    if (cleanQuery && topic.title.toLowerCase().includes(cleanQuery)) {
      score += 30;
    }

    // Keyword match
    for (const kw of topic.keywords) {
      if (cleanQuery && (cleanQuery.includes(kw) || kw.includes(cleanQuery))) {
        score += 20;
        hitKeywords.push(kw);
      } else {
        for (const w of words) {
          if (kw.includes(w) || w.includes(kw)) {
            score += 10;
            if (!hitKeywords.includes(kw)) hitKeywords.push(kw);
          }
        }
      }
    }

    // Summary & advice scanning
    for (const w of words) {
      if (topic.summary.toLowerCase().includes(w)) {
        score += 3;
      }
      for (const line of topic.fullAdvice) {
        if (line.toLowerCase().includes(w)) {
          score += 2;
        }
      }
    }

    return { topic, score, hitKeywords };
  });

  scored.sort((a, b) => b.score - a.score);

  if (scored.length > 0 && scored[0].score > 0) {
    return {
      bestMatch: scored[0].topic,
      relatedTopics: scored.slice(1, 4).map(s => s.topic),
      matchedKeywords: scored[0].hitKeywords
    };
  }

  // Fallback to top category or general topic
  return {
    bestMatch: OFFLINE_KNOWLEDGE_BASE[0],
    relatedTopics: OFFLINE_KNOWLEDGE_BASE.slice(1, 4),
    matchedKeywords: []
  };
}

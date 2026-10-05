export interface ScamShieldItem {
  id: string;
  title: string;
  cities: string[];
  severity: 'High' | 'Medium';
  theHook: string;
  theReality: string;
  whatToDo: string[];
  redFlags: string[];
}

export const SCAMS_DATA: ScamShieldItem[] = [
  {
    id: 'scam-closed-hotel',
    title: 'The "Your Hotel is Closed / Demolished" Trick',
    cities: ['Delhi (Airport / Paharganj)', 'Agra', 'Varanasi'],
    severity: 'High',
    theHook: 'Your taxi or auto driver claims your booked hotel burned down, has no road access due to a political protest/festival, or is closed for renovations.',
    theReality: 'The driver receives up to 50% commission by diverting you to an overpriced, filthy budget hotel run by his partner or tout agency.',
    whatToDo: [
      'Firmly instruct the driver: "Please drive directly to my hotel address anyway."',
      'Call your hotel\'s verified phone number directly on your mobile to confirm it is open.',
      'If the driver refuses to move, demand to be let out at the nearest Metro station or police picket.'
    ],
    redFlags: [
      'Driver makes a fake phone call on speaker to a "receptionist" claiming the hotel is cancelled.',
      'Driver offers to take you to a "Government Tourist Office" in Connaught Place instead.'
    ]
  },
  {
    id: 'scam-fake-railway-bureau',
    title: 'The Fake Railway Tourist Bureau & Cancelled Train',
    cities: ['New Delhi Railway Station', 'Agra Cantt', 'Jaipur'],
    severity: 'High',
    theHook: 'Well-dressed men with official-looking lanyards intercept you outside the station entrance, claiming the international ticket office is closed or your train is cancelled.',
    theReality: 'They redirect you into an auto to a private travel agency in Connaught Place or Karol Bagh that charges ₹30,000+ for a fake private car itinerary.',
    whatToDo: [
      'Walk straight past anyone outside the station without stopping or engaging.',
      'The real International Tourist Bureau at New Delhi Railway Station is on the 1st Floor of the main building (Paharganj side).',
      'Verify train status on the official NTES app or with uniform ticket checkers on the platform.'
    ],
    redFlags: [
      'Anyone standing on the street saying "Show me your ticket before entering the station". Only Railway Police at metal detector gates can check.',
      'Claims that whole railway lines are destroyed by track repairs.'
    ]
  },
  {
    id: 'scam-broken-auto-meter',
    title: 'The Broken Auto Meter / Fixed Tourist Tariff',
    cities: ['Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata'],
    severity: 'Medium',
    theHook: 'Driver claims the electronic meter is broken, or demands a flat ₹500 for a 3 km ride, claiming "tourist rates are separate".',
    theReality: 'There is no special tourist tariff in Indian transport law. The meter is working or they are trying to charge 4x to 8x the legal tariff.',
    whatToDo: [
      'Insist: "Meter se chaliye" (Go by meter). If they refuse, simply walk away to the next auto.',
      'Use ride-hailing apps like Uber, Ola, or Rapido for fixed, GPS-tracked fares with zero bargaining.',
      'At airports or railway stations, always use the Prepaid Police Taxi/Auto booth where you receive a stamped receipt.'
    ],
    redFlags: [
      'Refusal to turn on the digital meter before driving off.',
      'Claims that waiting charges or luggage charges double the fare.'
    ]
  },
  {
    id: 'scam-shoe-poop',
    title: 'The Shoe Poop / Pigeon Dropping Distraction',
    cities: ['Delhi (Connaught Place, Red Fort)', 'Mumbai (Gateway of India)', 'Agra (Taj Mahal)'],
    severity: 'Medium',
    theHook: 'Someone surreptitiously squirts feces or mud on your shoes while walking, then an accomplice immediately points it out and offers shoe shine.',
    theReality: 'The shoe cleaner cleans your shoe and then aggressively demands ₹1,000 to ₹2,000, claiming special imported wax was used, while an accomplice may attempt pickpocketing.',
    whatToDo: [
      'Do not stop or look down if someone suddenly yells about your shoes in a crowded tourist hub.',
      'Walk into a restaurant or clean shop and clean it yourself with a wet wipe.',
      'Firmly say "No" and keep moving without engaging.'
    ],
    redFlags: [
      'A friendly stranger pointing out your shoes followed by an instant shoe-shiner appearing within 5 seconds.'
    ]
  },
  {
    id: 'scam-gemstone-export',
    title: 'The Precious Gems / Duty-Free Export Scam',
    cities: ['Jaipur', 'Agra', 'Pushkar'],
    severity: 'High',
    theHook: 'A charismatic local invites you for tea, befriends you, and proposes a business deal: carry duty-free gems home to sell to his partner for a huge profit.',
    theReality: 'You pay upfront for worthless colored glass or low-grade stones. The overseas contact never exists and your money is gone.',
    whatToDo: [
      'Never purchase stones or jewelry as an "investment deal" or agreed export favor for strangers.',
      'Only purchase certified handicrafts and gems from state-run emporiums (like Central Cottage Industries or Rajasthali).'
    ],
    redFlags: [
      'Offers of "free hotels or meals" in exchange for delivering packages to foreign addresses.'
    ]
  }
];

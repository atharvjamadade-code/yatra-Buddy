export interface Phrase {
  id: string;
  category: 'transport' | 'shopping' | 'food' | 'emergency' | 'basics';
  categoryLabel: string;
  english: string;
  hindi: {
    romanized: string;
    native: string;
  };
  tamil: {
    romanized: string;
    native: string;
  };
  bengali: {
    romanized: string;
    native: string;
  };
  audioGuideNote: string;
}

export const PHRASEBOOK_DATA: Phrase[] = [
  {
    id: 'p1',
    category: 'transport',
    categoryLabel: 'Getting Around & Auto',
    english: 'Please use the meter.',
    hindi: {
      romanized: 'Meter se chaliye.',
      native: 'मीटर से चलिए।'
    },
    tamil: {
      romanized: 'Meter podunga.',
      native: 'மீட்டர் போடுங்க.'
    },
    bengali: {
      romanized: 'Meter chalu korun.',
      native: 'মিটার চালু করুন।'
    },
    audioGuideNote: 'Say firmly before sitting inside an auto-rickshaw.'
  },
  {
    id: 'p2',
    category: 'transport',
    categoryLabel: 'Getting Around & Auto',
    english: 'How much will it cost to go here?',
    hindi: {
      romanized: 'Yahan jaane ka kitna lagega?',
      native: 'यहाँ जाने का कितना लगेगा?'
    },
    tamil: {
      romanized: 'Inge poga evvalavu aagum?',
      native: 'இங்கே போக எவ்வளவு ஆகும்?'
    },
    bengali: {
      romanized: 'Ekhane jete koto lagbe?',
      native: 'এখানে যেতে কত লাগবে?'
    },
    audioGuideNote: 'Show the address on your phone while saying this.'
  },
  {
    id: 'p3',
    category: 'transport',
    categoryLabel: 'Getting Around & Auto',
    english: 'Please stop here.',
    hindi: {
      romanized: 'Yahan rokiye, please.',
      native: 'यहाँ रोकिए, प्लीज।'
    },
    tamil: {
      romanized: 'Inge niruthunga.',
      native: 'இங்கே நிறுத்துங்க.'
    },
    bengali: {
      romanized: 'Ekhane thambun.',
      native: 'এখানে থামুন।'
    },
    audioGuideNote: 'Use when approaching your destination.'
  },
  {
    id: 'p4',
    category: 'food',
    categoryLabel: 'Safe Food & Water',
    english: 'Do you have bottled mineral water with unbroken seal?',
    hindi: {
      romanized: 'Sealed mineral water bottle milegi?',
      native: 'सीलबंद मिनरल वाटर की बोतल मिलेगी?'
    },
    tamil: {
      romanized: 'Sealed mineral water bottle irukka?',
      native: 'சீல் செய்த மினரல் வாட்டர் பாட்டில் இருக்கா?'
    },
    bengali: {
      romanized: 'Sealed mineral water pawa jabe?',
      native: 'সিল করা মিনারেল ওয়াটার পাওয়া যাবে?'
    },
    audioGuideNote: 'Always verify the bottle plastic cap lock is intact.'
  },
  {
    id: 'p5',
    category: 'food',
    categoryLabel: 'Safe Food & Water',
    english: 'Please make it non-spicy / mild.',
    hindi: {
      romanized: 'Bina mirch ke banaiye, kam teekha.',
      native: 'बिना मिर्च के बनाइए, कम तीखा।'
    },
    tamil: {
      romanized: 'Kaaram kammiya podunga.',
      native: 'காரம் கம்மியா போடுங்க.'
    },
    bengali: {
      romanized: 'Jhal chhara banaben, kom jhal.',
      native: 'ঝাল ছাড়া বানাবেন, কম ঝাল।'
    },
    audioGuideNote: 'Helps avoid very hot red chili powder in restaurants.'
  },
  {
    id: 'p6',
    category: 'shopping',
    categoryLabel: 'Shopping & Bargaining',
    english: 'How much is this? Too expensive, please reduce price.',
    hindi: {
      romanized: 'Yeh kitne ka hai? Bahut mehenga hai, thoda kam kijiye.',
      native: 'यह कितने का है? बहुत महंगा है, थोड़ा कम कीजिए।'
    },
    tamil: {
      romanized: 'Idhu evvalavu? Romba adhigam, korainga.',
      native: 'இது எவ்வளவு? ரொம்ப அதிகம், குறைங்க.'
    },
    bengali: {
      romanized: 'Eta koto? Onek daam, ektu kom korun.',
      native: 'এটা কত? অনেক দাম, একটু কম করুন।'
    },
    audioGuideNote: 'Standard polite bargaining in local street bazaars.'
  },
  {
    id: 'p7',
    category: 'emergency',
    categoryLabel: 'Emergency Assistance',
    english: 'Please help me! Call the police or doctor.',
    hindi: {
      romanized: 'Kripya meri madad kijiye! Police ya doctor ko bulaiye.',
      native: 'कृपया मेरी मदद कीजिए! पुलिस या डॉक्टर को बुलाइए।'
    },
    tamil: {
      romanized: 'Enakku udhavi seiyunga! Police illai doctorai koopidunga.',
      native: 'எனக்கு உதவி செய்யுங்க! போலீஸ் அல்லது டாக்டரைக் கூப்பிடுங்க.'
    },
    bengali: {
      romanized: 'Doya kore amake sahajjo korun! Police ba daktar dakun.',
      native: 'দয়া করে আমাকে সাহায্য করুন! পুলিশ বা ডাক্তার ডাকুন।'
    },
    audioGuideNote: 'Urgent emergency call for assistance.'
  },
  {
    id: 'p8',
    category: 'basics',
    categoryLabel: 'Politeness & Basics',
    english: 'Thank you very much / Respectful Greeting',
    hindi: {
      romanized: 'Bahut bahut dhanyavaad / Namaste.',
      native: 'बहुत-बहुत धन्यवाद / नमस्ते।'
    },
    tamil: {
      romanized: 'Romba nandri / Vanakkam.',
      native: 'ரொம்ப நன்றி / வணக்கம்.'
    },
    bengali: {
      romanized: 'Onek dhonnobad / Nomoshkar.',
      native: 'অনেক ধন্যবাদ / নমস্কার।'
    },
    audioGuideNote: 'Joining hands in Namaste/Vanakkam expresses heartfelt warmth.'
  }
];

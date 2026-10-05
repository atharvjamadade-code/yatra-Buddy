import { Yatra } from '../types';

export const YATRAS: Yatra[] = [
  {
    id: 'kedarnath',
    name: 'Kedarnath Dham',
    hindiName: 'केदारनाथ धाम',
    region: 'Rudraprayag, Garhwal Himalayas',
    state: 'Uttarakhand',
    maxAltitude: 3583,
    trekDistanceKm: 16.5,
    difficulty: 'Difficult',
    bestSeason: 'May - June & Sept - Oct',
    description: 'One of the twelve sacred Jyotirlingas of Lord Shiva, located near the Mandakini river amidst majestic snow-peaked Himalayan ranges.',
    currentCamp: 'Bheembali (2,680m)',
    baseCamp: 'Gaurikund (1,982m)',
    destination: 'Kedarnath Mandir (3,583m)',
    weather: {
      tempDay: 8,
      tempNight: -2,
      condition: 'Partly Cloudy · Mountain Chills',
      advisory: 'Steep climb above 3,000m. Drink warm water every 30 minutes; carry camphor sachets for low oxygen comfort.',
      oxygenLevel: '68% of sea level',
    },
    milestones: [
      { id: 'k1', name: 'Gaurikund Base', distanceKm: 0, altitudeM: 1982, facilities: ['Medical Post', 'Pony Stand', 'Biometric Slip', 'Hot Springs'], notes: 'Mandatory biometric registration verification point. Trek gates open at 04:00 AM.' },
      { id: 'k2', name: 'Jungle Chatti', distanceKm: 4, altitudeM: 2280, facilities: ['Tea Stalls', 'SDRF Camp', 'Rest Benches'], notes: 'Initial gradual incline. Good stop for hot tea and energy replenishment.' },
      { id: 'k3', name: 'Bheembali', distanceKm: 7, altitudeM: 2680, facilities: ['Oxygen Parlour', 'GMVN Huts', 'Medical Post', 'Water Point'], notes: 'Midway camp. Free SDRF oxygen station available if experiencing mild dizziness.' },
      { id: 'k4', name: 'Lincholi', distanceKm: 11, altitudeM: 3150, facilities: ['Helipad (Emergency)', 'Dormitories', 'Army Medical Camp'], notes: 'Significant temperature drop. Wear windproof jacket and ear warmers.' },
      { id: 'k5', name: 'Kedarnath Base Camp', distanceKm: 15, altitudeM: 3400, facilities: ['Tent Colony', 'Canteen', 'First Aid Center'], notes: 'Wide plateau view of Kedarnath peak. Last 1.5 km gentle walk to temple.' },
      { id: 'k6', name: 'Kedarnath Mandir', distanceKm: 16.5, altitudeM: 3583, facilities: ['Shrine Board Office', 'VIP Queue', 'Prasad Counters', 'Shoe Stand'], notes: 'Holy Sanctum. Mobile phones must be deposited in token lockers before entry.' }
    ],
    darshanTimings: {
      morningAarti: '04:00 AM - 07:00 AM (Mahabhishek & Rudrabhishek)',
      darshanOpen: '07:00 AM - 03:00 PM (General Darshan)',
      afternoonBreak: '03:00 PM - 05:00 PM (Sanctum Cleaning & Rest)',
      eveningAarti: '06:00 PM - 07:30 PM (Grand Shayan Aarti)',
      darshanClose: '08:30 PM (Gates close for night curfew)'
    }
  },
  {
    id: 'amarnath',
    name: 'Shri Amarnath Cave',
    hindiName: 'श्री अमरनाथ गुफा',
    region: 'Anantnag, Kashmir Valley',
    state: 'Jammu & Kashmir',
    maxAltitude: 3888,
    trekDistanceKm: 14.0, // Baltal route
    difficulty: 'Extreme',
    bestSeason: 'July - August (Shravan)',
    description: 'Ancient Himalayan cave containing the naturally formed Ice Shiva Lingam, revered as the spot where Lord Shiva revealed the secret of immortality.',
    currentCamp: 'Sangam Point (3,650m)',
    baseCamp: 'Baltal / Domel (2,743m)',
    destination: 'Holy Cave (3,888m)',
    weather: {
      tempDay: 6,
      tempNight: -4,
      condition: 'Chilly Breeze · Flurry Risk',
      advisory: 'Steep zig-zag trail. Mandatory Compulsory Health Certificate (CHC) required. Carry thermal balaclava.',
      oxygenLevel: '64% of sea level',
    },
    milestones: [
      { id: 'a1', name: 'Baltal Base Camp', distanceKm: 0, altitudeM: 2743, facilities: ['CRPF Camp', 'RFID Issuance', 'Langar Area', 'Helipad'], notes: 'Security frisking and RFID card activation. Strict entry cutoff at 11:00 AM.' },
      { id: 'a2', name: 'Domel Checkpost', distanceKm: 2.5, altitudeM: 2850, facilities: ['Water Filters', 'Pony Union Counter'], notes: 'Trek gateway. Steel railings line the cliff path.' },
      { id: 'a3', name: 'Barari Marg', distanceKm: 6, altitudeM: 3250, facilities: ['Medical Dispensary', 'Army Refreshment', 'Tea Tent'], notes: 'Narrow high pass. Stay on inner mountain side away from edge.' },
      { id: 'a4', name: 'Sangam Point', distanceKm: 10, altitudeM: 3650, facilities: ['Pahalgam Route Junction', 'SDRF Base', 'Free Langar'], notes: 'Meeting point of Baltal and Pahalgam traditional trails.' },
      { id: 'a5', name: 'Amarnath Holy Cave', distanceKm: 14, altitudeM: 3888, facilities: ['Sanctum Sanctorum', 'Prasad Counter', 'Army Medical Station'], notes: 'Breathtaking ice stalagmite darshan. Strict no-plastic & no-electronic zone.' }
    ],
    darshanTimings: {
      morningAarti: '06:00 AM - 07:00 AM',
      darshanOpen: '07:00 AM - 04:00 PM',
      afternoonBreak: 'No closure during peak rush',
      eveningAarti: '05:00 PM - 06:00 PM',
      darshanClose: '06:30 PM (Night evacuation to base camp for security)'
    }
  },
  {
    id: 'vaishnodevi',
    name: 'Mata Vaishno Devi',
    hindiName: 'माता वैष्णो देवी',
    region: 'Trikuta Mountains, Reasi',
    state: 'Jammu & Kashmir',
    maxAltitude: 1585,
    trekDistanceKm: 12.5,
    difficulty: 'Moderate',
    bestSeason: 'Year Round (Best: March - October)',
    description: 'Sacred cave shrine of Mata Vaishno Devi situated in the Trikuta hills, visited by millions of devotees seeking motherly blessings.',
    currentCamp: 'Ardhkuwari (1,460m)',
    baseCamp: 'Katra (750m)',
    destination: 'Bhawan & Bhairon Ghati (2,010m)',
    weather: {
      tempDay: 19,
      tempNight: 12,
      condition: 'Pleasant & Clear',
      advisory: 'Paved, covered and well-illuminated path. Battery cars available from Ardhkuwari for elderly yatris.',
      oxygenLevel: '85% of sea level',
    },
    milestones: [
      { id: 'v1', name: 'Banganga Entry', distanceKm: 0, altitudeM: 800, facilities: ['Yatra Parchi Scan', 'Cloak Rooms', 'Auto Rickshaw Stand'], notes: 'Start of the holy trek. Sacred river Banganga bath point.' },
      { id: 'v2', name: 'Charan Paduka', distanceKm: 2.5, altitudeM: 1020, facilities: ['Drinking Water', 'Board Refreshment Units'], notes: 'Holy footprint stone where Goddess rested while looking back at Bhairon Nath.' },
      { id: 'v3', name: 'Ardhkuwari (Garbh Joon)', distanceKm: 6.0, altitudeM: 1460, facilities: ['Garbh Joon Cave Queue', 'Battery Car Station', 'Medical Unit'], notes: 'Sacred womb cave where Mata meditated for 9 months. Queue slip takes 4-8 hours.' },
      { id: 'v4', name: 'Himkoti Viewpoint', distanceKm: 8.5, altitudeM: 1510, facilities: ['Panoramic View Deck', 'Dosa Point', 'Clean Restrooms'], notes: 'Alternative cleaner track via Tarakote Marg bypasses traditional staircase.' },
      { id: 'v5', name: 'Bhawan Sanctum', distanceKm: 12.5, altitudeM: 1585, facilities: ['Holy Pindies Darshan', 'Bathing Ghats', 'Ropeway to Bhairon Ghati'], notes: 'Darshan of Mahakali, Mahalakshmi and Mahasaraswati natural rock pindies.' },
      { id: 'v6', name: 'Bhairon Baba Temple', distanceKm: 14.5, altitudeM: 2010, facilities: ['Ropeway Station', 'Offering Counter'], notes: 'Yatra is only deemed complete after seeking Bhairon Baba blessings.' }
    ],
    darshanTimings: {
      morningAarti: '06:00 AM - 08:00 AM (Shridhar Aarti - Temple open to view on screens)',
      darshanOpen: 'Open 24 Hours continuously except during two aartis',
      afternoonBreak: 'None',
      eveningAarti: '07:00 PM - 09:00 PM (Evening Divya Aarti)',
      darshanClose: 'Open round the clock for pilgrims'
    }
  },
  {
    id: 'badrinath',
    name: 'Badrinath Dham',
    hindiName: 'श्री बद्रीनाथ धाम',
    region: 'Chamoli, Alaknanda Valley',
    state: 'Uttarakhand',
    maxAltitude: 3300,
    trekDistanceKm: 1.0, // Motor road access with walking town circuit
    difficulty: 'Easy',
    bestSeason: 'May - June & Sept - Nov',
    description: 'The premier Char Dham pilgrimage destination dedicated to Lord Badri Narayan (Vishnu) nestled between Nar and Narayana mountain ranges.',
    currentCamp: 'Tapt Kund Area',
    baseCamp: 'Joshimath (1,890m)',
    destination: 'Badrinath Temple & Mana Village',
    weather: {
      tempDay: 11,
      tempNight: 1,
      condition: 'Crisp Mountain Breeze',
      advisory: 'Natural sulphur spring (Tapt Kund) provides medicinal warm bath before entering the temple.',
      oxygenLevel: '72% of sea level',
    },
    milestones: [
      { id: 'b1', name: 'Badrinath Bus Stand', distanceKm: 0, altitudeM: 3250, facilities: ['GMVN Tourist Lodge', 'Taxi Stand', 'ATM (often out of cash)'], notes: 'Vehicle terminus. Carry sufficient paper currency as card network is spotty.' },
      { id: 'b2', name: 'Tapt Kund', distanceKm: 0.4, altitudeM: 3280, facilities: ['Hot Sulphur Baths (Separate for Men & Women)', 'Changing Rooms'], notes: 'Natural hot springs maintain ~45°C throughout year. Purifying pre-darshan bath.' },
      { id: 'b3', name: 'Main Badrinath Temple', distanceKm: 0.6, altitudeM: 3300, facilities: ['Sanctum', 'Brahma Kapal for Pind Daan', 'Mahaprasad Counter'], notes: 'Black stone idol of Lord Vishnu in meditative Padmasana posture.' },
      { id: 'b4', name: 'Mana Village (First Indian Village)', distanceKm: 3.5, altitudeM: 3350, facilities: ['Vyas Gufa', 'Ganesh Gufa', 'Bhim Pul', 'Saraswati River Origin'], notes: 'Historic border village where Sage Vyasa composed Mahabharata.' }
    ],
    darshanTimings: {
      morningAarti: '04:30 AM - 06:30 AM (Maha Abhishek)',
      darshanOpen: '07:00 AM - 01:00 PM (General Darshan)',
      afternoonBreak: '01:00 PM - 04:00 PM (Bhog & Shringar Rest)',
      eveningAarti: '06:00 PM - 09:00 PM (Geet Govinda recitation & Shayan Aarti)',
      darshanClose: '09:00 PM'
    }
  },
  {
    id: 'kashi',
    name: 'Kashi Vishwanath',
    hindiName: 'काशी विश्वनाथ',
    region: 'Varanasi, Ganga River Basin',
    state: 'Uttar Pradesh',
    maxAltitude: 81,
    trekDistanceKm: 2.0, // Heritage Ghat walking circuit
    difficulty: 'Easy',
    bestSeason: 'October - March',
    description: 'The golden temple of Shiva in the oldest living city of the world, connected directly to the sacred Ganga Ghats through the new Vishwanath Corridor.',
    currentCamp: 'Dashashwamedh Ghat',
    baseCamp: 'Godowlia Chowk',
    destination: 'Golden Sanctum & Manikarnika Ghat',
    weather: {
      tempDay: 28,
      tempNight: 19,
      condition: 'Warm & Humid',
      advisory: 'Dress conservatively in traditional cotton clothing. Remove leather belts and wallets before corridor security.',
      oxygenLevel: '100% of sea level',
    },
    milestones: [
      { id: 'ks1', name: 'Ganga Ghat Entry', distanceKm: 0, altitudeM: 80, facilities: ['Boat Pier', 'Morning Ganga Aarti', 'Sadhus Encampment'], notes: 'Take sacred holy dip at Dashashwamedh or Assi Ghat before entering corridor.' },
      { id: 'ks2', name: 'Vishwanath Corridor Gate 4', distanceKm: 0.8, altitudeM: 81, facilities: ['Free Cloakroom', 'Electronic Baggage Scanners', 'Wheelchairs'], notes: 'Fast-track corridor with shaded marble walk leading to the temple.' },
      { id: 'ks3', name: 'Swarna Shikhar Sanctum', distanceKm: 1.2, altitudeM: 81, facilities: ['Golden Dome', 'Jalabhishek queue', 'Sugam Darshan Lounge'], notes: 'Touch the sacred Jyotirlinga and perform Jalabhishek with pure Ganga Jal.' },
      { id: 'ks4', name: 'Manikarnika & Scindia Ghat', distanceKm: 1.8, altitudeM: 80, facilities: ['Tarkeshwar Mahadev', 'Heritage View'], notes: 'Sacred cremation ghat where liberation (Moksha) is granted by Shiva.' }
    ],
    darshanTimings: {
      morningAarti: '03:00 AM - 04:00 AM (Mangala Aarti)',
      darshanOpen: '04:00 AM - 11:15 AM (General Darshan & Abhishek)',
      afternoonBreak: '11:15 AM - 12:20 PM (Bhog Aarti)',
      eveningAarti: '07:00 PM - 08:15 PM (Sapta Rishi Aarti)',
      darshanClose: '11:00 PM (Shayan Aarti conclusion)'
    }
  }
];

export const DEFAULT_CHECKLIST = [
  { id: 'c1', title: 'Camphor (Kapoor) sachets', category: 'Medical' as const, essential: true, checked: true, notes: 'Inhale periodically to open airways at high altitudes.' },
  { id: 'c2', title: 'Waterproof Rain Poncho & Bag Cover', category: 'Gear' as const, essential: true, checked: true, notes: 'Mountain rain arrives unpredictably without warning.' },
  { id: 'c3', title: 'Thermal Innerwear (Top & Bottom)', category: 'Clothing' as const, essential: true, checked: true, notes: 'Avoid cotton; synthetic or merino wool dries fastest.' },
  { id: 'c4', title: 'Heavy Duty Trekking Pole', category: 'Gear' as const, essential: true, checked: false, notes: 'Reduces up to 25% of knee pressure on steep descents.' },
  { id: 'c5', title: 'Yatra Registration Slip & Govt ID (Aadhaar)', category: 'Documents' as const, essential: true, checked: true, notes: 'Keep in waterproof ziplock bag inside your daypack.' },
  { id: 'c6', title: 'Insulated Stainless Steel Thermos Flask (1L)', category: 'Gear' as const, essential: true, checked: false, notes: 'Fill with hot water at free langars along the trek.' },
  { id: 'c7', title: 'Diamox / Acetazolamide (Doctor advice)', category: 'Medical' as const, essential: true, checked: false, notes: 'Take only under qualified medical prescription for AMS.' },
  { id: 'c8', title: 'Oral Rehydration Salts (ORS) & Glucose powder', category: 'Food' as const, essential: true, checked: true, notes: 'Replenishes lost electrolytes during strenuous uphill walking.' },
  { id: 'c9', title: 'High-energy Dry Fruits & Dark Chocolates', category: 'Food' as const, essential: false, checked: false, notes: 'Quick calories when sugar levels drop on steep sections.' },
  { id: 'c10', title: 'Heavy Woolen Socks & Wool Cap (Monkey Cap)', category: 'Clothing' as const, essential: true, checked: true, notes: 'Extremities lose body heat fastest in the evening.' },
  { id: 'c11', title: 'Power Bank (20,000 mAh)', category: 'Gear' as const, essential: true, checked: false, notes: 'Cold battery drains 3x faster in sub-zero temps. Keep in inner pocket.' },
  { id: 'c12', title: 'Blister Tape & Band-aids', category: 'Medical' as const, essential: false, checked: true, notes: 'Apply immediately upon first friction hot spot on heels.' }
];

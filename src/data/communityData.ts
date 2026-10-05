import { CommunityReport } from '../types';

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-1',
    yatraId: 'kedarnath',
    author: 'Rajesh Sharma (Panchkula)',
    location: 'Near Bheembali Bridge (2,680m)',
    timeAgo: '25 mins ago',
    type: 'trail',
    message: 'The new paved bypass trail near Bheembali is open and much smoother for walking on foot compared to the mule track. SDRF has set up free hot herbal tea and an oxygen pulse check desk.',
    statusTag: 'Trail Clear · Safe',
    upvotes: 42,
    hasUpvoted: false
  },
  {
    id: 'rep-2',
    yatraId: 'kedarnath',
    author: 'Sunita Verma (Lucknow)',
    location: 'Kedarnath Temple Parikrama',
    timeAgo: '1 hour ago',
    type: 'crowd',
    message: 'General Darshan queue is moving quickly right now. Waiting time is approximately 40 minutes. Security is strictly requiring mobile phones inside bags before entering the inner barricade.',
    statusTag: 'Wait: 40 mins',
    upvotes: 67,
    hasUpvoted: true
  },
  {
    id: 'rep-3',
    yatraId: 'kedarnath',
    author: 'Vikram Negi (Local Guide)',
    location: 'Lincholi Ridge (3,150m)',
    timeAgo: '2 hours ago',
    type: 'weather',
    message: 'Light icy drizzle started around Lincholi with chilling winds. Please wear your rain poncho and windproof gloves right away. Do not rush downhill as wet stone stairs can be slippery.',
    statusTag: 'Drizzle & Low Temp',
    upvotes: 89,
    hasUpvoted: false
  },
  {
    id: 'rep-4',
    yatraId: 'amarnath',
    author: 'Col. Arvind Mehta (Retd)',
    location: 'Baltal Base Camp',
    timeAgo: '45 mins ago',
    type: 'advice',
    message: 'Security gate at Domel closes sharp at 11:00 AM under Army orders. Make sure your RFID card is hung outside your jacket so barcode scanners verify you without having to unzip in the cold.',
    statusTag: 'Cutoff 11:00 AM Strict',
    upvotes: 53,
    hasUpvoted: false
  },
  {
    id: 'rep-5',
    yatraId: 'vaishnodevi',
    author: 'Pooja Agarwal (Jaipur)',
    location: 'Tarakote Marg Junction',
    timeAgo: '3 hours ago',
    type: 'advice',
    message: 'If traveling with small children or grandparents, take the Tarakote Marg route! It has zero horses/mules, very gentle slope, clean automated water fountains, and great food points.',
    statusTag: 'Recommended Track',
    upvotes: 114,
    hasUpvoted: false
  }
];

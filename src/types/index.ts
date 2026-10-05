export type TabType = 'home' | 'buddy' | 'guides' | 'community' | 'sos';

export interface Yatra {
  id: string;
  name: string;
  hindiName: string;
  region: string;
  state: string;
  maxAltitude: number; // in meters
  trekDistanceKm: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Extreme';
  bestSeason: string;
  description: string;
  currentCamp: string;
  baseCamp: string;
  destination: string;
  weather: {
    tempDay: number;
    tempNight: number;
    condition: string;
    advisory: string;
    oxygenLevel: string;
  };
  milestones: Waypoint[];
  darshanTimings: {
    morningAarti: string;
    darshanOpen: string;
    afternoonBreak: string;
    eveningAarti: string;
    darshanClose: string;
  };
}

export interface Waypoint {
  id: string;
  name: string;
  distanceKm: number;
  altitudeM: number;
  facilities: string[];
  isCompleted?: boolean;
  notes: string;
}

export interface KnowledgeTopic {
  id: string;
  keywords: string[];
  title: string;
  category: 'health' | 'transport' | 'darshan' | 'logistics' | 'lore' | 'safety';
  categoryLabel: string;
  summary: string;
  fullAdvice: string[];
  importantWarning?: string;
  verifiedOfficial?: boolean;
}

export interface AudioGuide {
  id: string;
  yatraId: string;
  title: string;
  duration: string;
  narrator: string;
  chapters: {
    title: string;
    timestamp: string;
    content: string;
  }[];
  overview: string;
  templeRules: string[];
}

export interface CommunityReport {
  id: string;
  yatraId: string;
  author: string;
  location: string;
  timeAgo: string;
  type: 'trail' | 'weather' | 'crowd' | 'advice';
  message: string;
  statusTag: string;
  upvotes: number;
  hasUpvoted?: boolean;
  isLocalUser?: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  category: 'Clothing' | 'Medical' | 'Documents' | 'Gear' | 'Food';
  essential: boolean;
  checked: boolean;
  notes?: string;
}

export interface IceProfile {
  name: string;
  age: number;
  bloodGroup: string;
  countryCode: string;
  countryName: string;
  passportOrIdNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  allergies: string;
  medicalConditions: string;
  yatraRegNumber: string;
}

export interface CountryOrigin {
  code: string;
  name: string;
  flag: string;
  isDomestic?: boolean;
  embassyName: string;
  missionType: 'Embassy' | 'High Commission' | 'Consulate' | 'Resident Commissioner';
  emergencyPhone24_7: string;
  standardPhone: string;
  address: string;
  email: string;
  specialAdvice: string;
}

export interface Skill {
  name: string;
  icon: 'heart' | 'cross' | 'chef' | 'child' | 'check';
  verified: boolean;
}

export interface Candidate {
  id: string;
  maskedId: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  agencyName: string;
  skills: Skill[];
  availability: string;
  nationality: string;
  isPrivacyMode: boolean;
  // Hidden fields simulation
  locationMasked: boolean;
  phoneMasked: boolean;
  
  // Agency Contact Info
  agencyPhone: string;
  agencyEmail: string;
  estimatedCost: string;
}

export interface SearchIntent {
  interpretedIntent: string;
  keywords: string[];
}
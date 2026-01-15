
export interface RecyclingPoint {
  id: string;
  name: string;
  type: 'plastic' | 'paper' | 'batteries' | 'glass';
  address: string;
  coords: [number, number];
  hours: string;
  description: string;
  image?: string;
}

export interface RecyclingZone {
  id: string;
  name: string;
  description: string;
  color: string;
  polygon: [number, number][];
}

export type ModuleType = 'retrospective' | 'analyzer' | 'recycling' | 'assistant';

export interface NDVIResult {
  city: string;
  ndviValue: number;
  percentage: number;
  healthStatus: string;
  timestamp: string;
  historicalTrend?: number[]; // Mock trend data
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}


export type CarBodyType = 'sedan' | 'sport' | 'truck' | 'cyber';

export interface CarConfig {
  bodyType: CarBodyType;
  bodyColor: string;
  rimColor: string;
  windowTint: string;
  spoiler: boolean;
  neonUnderglow: boolean;
  neonColor: string;
  brandName: string;
  modelName: string;
}

export interface DesignReview {
  rating: number;
  critique: string;
  suggestedEnhancements: string[];
  marketSegment: string;
}

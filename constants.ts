
import { CarConfig } from './types';

export const COLORS = [
  { name: 'Obsidian', hex: '#0a0a0a' },
  { name: 'Silver Surge', hex: '#c0c0c0' },
  { name: 'Atomic Red', hex: '#ff0000' },
  { name: 'Electric Blue', hex: '#0066ff' },
  { name: 'Cyber Lime', hex: '#32cd32' },
  { name: 'Gold Rush', hex: '#ffd700' },
  { name: 'Deep Purple', hex: '#4b0082' },
  { name: 'Frozen White', hex: '#f8f8ff' },
];

export const NEON_COLORS = [
  { name: 'Cyber Cyan', hex: '#00ffff' },
  { name: 'Acid Green', hex: '#7fff00' },
  { name: 'Magma Pink', hex: '#ff1493' },
  { name: 'Ultraviolet', hex: '#9400d3' },
];

export const INITIAL_CONFIG: CarConfig = {
  bodyType: 'sport',
  bodyColor: '#ff0000',
  rimColor: '#1a1a1a',
  windowTint: 'rgba(0,0,0,0.8)',
  spoiler: true,
  neonUnderglow: false,
  neonColor: '#00ffff',
  brandName: 'APEX',
  modelName: 'RS-1'
};

export interface MapGrid {
  name: string;
  width: number;
  height: number;
  grid: number;
  shiftX: number;
  shiftY: number;
  gridDistance: number;
  gridUnits: string;
  padding: number;
  gridColor: string;
  gridAlpha: number;
  globalLight: boolean;
  darkness: number;
  img?: string | null;
  foreground?: string | null;
  lights: Light[];
  walls: Wall[];
}

export interface Light {
  x: number;
  y: number;
  dim: number;
  bright: number;
  tintColor: string;
  tintAlpha: number;
}

export interface WallThreshold {
  light: number;
  sight: number;
  sound?: number | null;
  attenuation: boolean;
}

export interface Wall {
  c: [number, number, number, number];
  move: number;
  sense: number;
  sound: number;
  door: number;
  sight?: number | null;
  light?: number | null;
  threshold?: WallThreshold | null;
}

export interface Point {
  x: number;
  y: number;
}
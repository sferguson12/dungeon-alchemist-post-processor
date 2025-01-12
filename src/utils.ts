import { Wall } from './types';

export function filterWalls(walls: Wall[]): Wall[] {
  return walls.filter(wall => 
    wall.move === 1 && 
    wall.sense === 0 && 
    wall.sound === 1 && 
    wall.door === 0
  );
}
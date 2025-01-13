import { injectable } from 'tsyringe';
import { Point, Wall } from '../types';

@injectable()
export class PointTransformer {
  public toAllPoints(walls: Wall[]): Point[] {
    return walls.flatMap((wall) => this.toPoints(wall));
  }

  public toPoints(wall: Wall): Point[] {
    return [
      { x: wall.c[0], y: wall.c[1] },
      { x: wall.c[2], y: wall.c[3] },
    ];
  }
}

import { inject, injectable } from 'tsyringe';
import { Point, Wall } from '../types';
import { PointTransformer } from '../transformers/PointTransformer';

@injectable()
export class PointFilter {
  constructor(
    @inject(PointTransformer) private pointTransformer: PointTransformer,
  ) {}

  public getAttachmentPoints(wall: Wall, set: Wall[]): Point[] {
    const wallPoints = this.pointTransformer.toPoints(wall);
    const setPoints = this.pointTransformer.toAllPoints(set);

    return wallPoints.filter((point) => this.isPointInSet(point, setPoints));
  }

  private isPointInSet(point: Point, fencePoints: Point[]): boolean {
    return fencePoints.some(
      (fencePoint) => fencePoint.x === point.x && fencePoint.y === point.y,
    );
  }
}

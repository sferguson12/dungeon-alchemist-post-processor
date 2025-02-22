import { injectable } from 'tsyringe';
import { Point, Wall } from '../types';
import { DoorValue } from '../enums';

const MAX_GATE_TILES = 2;

@injectable()
export class GateFilter {
  /**
   * A gate is defined as a door that is no more than two tiles in size that
   * shares at least one of its coordinates with a fence. Some gates may need
   * to be fixed manually because of the uncertainty in differentiating fences
   * from windows.
   *
   * @param wall object to test
   * @param gridSize grid size in pixels
   * @param fencePoints array of known fence points
   * @returns true if the object is a gate, false otherwise
   */
  public isGate(wall: Wall, gridSize: number, fencePoints: Point[]): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    if (wall.door !== DoorValue.Door) {
      return false;
    }

    // We need to give it a pixel on either side since sometimes the math bumps them up a pixel
    const isSizeCandidate = size <= MAX_GATE_TILES + 2 * gridSize;

    const points: Point[] = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
    const sharesFenceCoordinate = points.some((point) =>
      this.isPointInFence(point, fencePoints),
    );

    return isSizeCandidate && sharesFenceCoordinate;
  }

  private isPointInFence(point: Point, fencePoints: Point[]): boolean {
    return fencePoints.some(
      (fencePoint) => fencePoint.x === point.x && fencePoint.y === point.y,
    );
  }
}

import { injectable } from "tsyringe";
import { Wall } from "../types";

// We define gates as at no more than two tiles in size
// to help differentiate them from windows. This will result
// in some fences that need to be fixed manually.
const MAX_GATE_TILES = 2;

@injectable()
export class GateFilter {
  public isGate(wall: Wall, gridSize: number): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  // We need to give it a pixel on either side since sometimes the math bumps them up a pixel
  return size <= MAX_GATE_TILES + 2 * gridSize && size % gridSize < 2;
  }
}

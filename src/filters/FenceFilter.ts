import { injectable } from "tsyringe";
import { Wall } from "../types";

// We define fences as at least two tiles in size
// to help differentiate them from windows. This will result
// in some fences that need to be fixed manually.
const MIN_FENCE_TILES = 2;

@injectable()
export class FenceFilter {
  public isFence(wall: Wall, gridSize: number): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return size > MIN_FENCE_TILES * gridSize;
  }
}

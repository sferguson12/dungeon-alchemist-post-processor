import { injectable } from 'tsyringe';
import { Wall } from '../types';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';

const MIN_FENCE_TILES = 2;

@injectable()
export class FenceFilter {
  /**
   * A fence is defined as a non-sense-blocking object that is greater than
   * two tiles in size, so as to differentiate it from a window. This will
   * result in some fences that need to be fixed manually.
   *
   * @param wall object to test
   * @param gridSize grid size in pixels
   * @returns true if the object is a fence, false otherwise
   */
  public isFence(wall: Wall, gridSize: number): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // These are based on how the walls are exported from DA
    const isConfigCandidate =
      wall.move === MovementValue.Normal &&
      wall.sense === SenseValue.None &&
      wall.sound === SoundValue.Normal &&
      wall.door === DoorValue.None;

    // We need to give it a pixel on either side since sometimes the math bumps them up a pixel
    const isSizeCandidate = size > MIN_FENCE_TILES * gridSize + 2;

    return isConfigCandidate && isSizeCandidate;
  }
}

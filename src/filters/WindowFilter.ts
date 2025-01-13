import { injectable } from 'tsyringe';
import { Wall } from '../types';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';

// Windows are either one or two tiles in size
const MAX_WINDOW_SIZE = 2;

@injectable()
export class WindowFilter {
  /**
   * A window is defined as a non-wall object that is no more than two
   * tiles in size.
   *
   * @param wall object to test
   * @param gridSize grid size in pixels
   * @returns true if the object is a window, false otherwise
   */
  public isWindow(wall: Wall, gridSize: number): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // These are based on how the walls are exported from DA
    const isConfigCandidate =
      wall.move === MovementValue.Normal &&
      wall.sense === SenseValue.None &&
      wall.sound === SoundValue.Normal &&
      wall.door === DoorValue.None;

    // We need to give it a pixel on either side since sometimes the math bumps them up a pixel
    const isSizeCandidate =
      size <= MAX_WINDOW_SIZE + 2 * gridSize && size % gridSize < 2;

    return isConfigCandidate && isSizeCandidate;
  }
}

import { inject, injectable } from 'tsyringe';
import { Point, Wall } from '../types';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';
import { PointFilter } from './PointFilter';

const MIN_FENCE_TILES = 2;

@injectable()
export class FenceFilter {
  constructor(@inject(PointFilter) private pointFilter: PointFilter) {}

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

  /**
   * A misidentified window is a window all of whose attachment points are
   * to fences. Though it is possible to attach a fence to a window (such as
   * an interior banister), it is more likely that a "window" attached to any
   * fence has been misidentified based on its length.
   *
   * @param wall object to test
   * @param fences set of previously identified fences
   * @returns true if the object is a misidentified window, false otherwise
   */
  public isMisidentifiedWindow(wall: Wall, fences: Wall[]): boolean {
    const fenceAttachmentPoints = this.pointFilter.getAttachmentPoints(
      wall,
      fences,
    );
    return fenceAttachmentPoints.length > 0;
  }
}

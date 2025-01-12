import { injectable } from 'tsyringe';
import { Wall } from '../types';

@injectable()
export class WallFilter {
  /**
   * A non-wall is defined as an object that blocks movement and sound, but
   * does not block light and is not a door.
   *
   * @param wall object to test
   * @returns true if the object is a door, false otherwise
   */
  public isNotWall(wall: Wall): boolean {
    return (
      wall.move === 1 && wall.sense === 0 && wall.sound === 1 && wall.door === 0
    );
  }
}

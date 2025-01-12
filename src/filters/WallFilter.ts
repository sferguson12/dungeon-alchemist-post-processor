import { injectable } from 'tsyringe';
import { Wall } from '../types';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';

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
      wall.move === MovementValue.Normal &&
      wall.sense === SenseValue.None &&
      wall.sound === SoundValue.Normal &&
      wall.door === DoorValue.None
    );
  }
}

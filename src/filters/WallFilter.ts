import { injectable } from 'tsyringe';
import { Wall } from '../types';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';

@injectable()
export class WallFilter {
  /**
   * A wall is defined as an object that blocks movement, sense, and sound,
   * but is not a door.
   *
   * @param wall object to test
   * @returns true if the object is a wall, false otherwise
   */
  public isWall(wall: Wall): boolean {
    return (
      wall.move === MovementValue.Normal &&
      wall.sound === SoundValue.Normal &&
      wall.sense === SenseValue.Normal &&
      wall.door === DoorValue.None
    );
  }
}

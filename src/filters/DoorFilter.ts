import { injectable } from 'tsyringe';
import { Wall } from '../types';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';

@injectable()
export class DoorFilter {
  /**
   * A door is defined as an object that blocks movement, sound, and light,
   * and has the door flag set.
   *
   * @param wall object to test
   * @returns true if the object is a door, false otherwise
   */
  public isDoor(wall: Wall): boolean {
    return wall.door === DoorValue.Door;
  }
}

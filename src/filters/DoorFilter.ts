import { injectable } from "tsyringe";
import { Wall } from "../types";

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
    return wall.move === 1 && 
      wall.sense === 1 && 
      wall.sound === 1 && 
      wall.door === 1
  }  
}
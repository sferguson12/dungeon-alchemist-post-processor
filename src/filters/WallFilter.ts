import { injectable } from "tsyringe";
import { Wall } from "../types";

@injectable()
export class WallFilter {

public isWall(wall: Wall): boolean {
  return wall.move === 1 && 
    wall.sense === 0 && 
    wall.sound === 1 && 
    wall.door === 0
  }
}
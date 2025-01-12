import { injectable } from "tsyringe";
import { Wall, WallThreshold } from "../types";
import chalk from "chalk";

// Setttings to update for windows
const SENSE_VALUE = 30; // Proximity
const SIGHT_DISTANCE = 10;
const WINDOW_THRESHOLD: WallThreshold = {
  light: SIGHT_DISTANCE,
  sight: SIGHT_DISTANCE,
  sound: null,
  attenuation: true
};

@injectable()
export class WindowTransfromer {
  public transformObject(wall: Wall) {
    console.log(chalk.cyan(`Updating detected window at coordinates: ${wall.c}`));
    wall.sense = SENSE_VALUE;
    wall.light = SENSE_VALUE;
    wall.sight = SENSE_VALUE;
    wall.threshold = WINDOW_THRESHOLD;;
  }
}
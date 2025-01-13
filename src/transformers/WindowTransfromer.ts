import { injectable } from 'tsyringe';
import { Wall, WallThreshold } from '../types';
import chalk from 'chalk';
import { SenseValue } from '../enums';

// Setttings to update for windows
const SIGHT_DISTANCE = 10;
const WINDOW_THRESHOLD: WallThreshold = {
  light: SIGHT_DISTANCE,
  sight: SIGHT_DISTANCE,
  sound: null,
  attenuation: true,
};

@injectable()
export class WindowTransfromer {
  public transformObject(wall: Wall): Wall {
    console.log(
      chalk.cyan(`Updating detected window at coordinates: ${wall.c}`),
    );
    wall.sense = SenseValue.Proximity;
    wall.light = SenseValue.Proximity;
    wall.sight = SenseValue.Proximity;
    wall.threshold = WINDOW_THRESHOLD;
    return wall;
  }
}

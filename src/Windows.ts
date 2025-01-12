import chalk from 'chalk';
import { injectable } from 'tsyringe';
import { MapGrid, Wall, WallThreshold } from './types';
import { filterWalls } from './utils';

// Windows are either one or two tiles in size
const MAX_WINDOW_SIZE = 2;

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
export class Windows {
  public async processObjects(jsonData: MapGrid, gridSize: number) {
    console.log(chalk.yellow('Processing JSON data on Windows'));

    const walls = jsonData.walls as Wall[];
    const windows = filterWalls(walls)
      .filter(wall => this.isWindow(wall, gridSize))
      .map(wall => {
        console.log(chalk.cyan(`Updating detected window at coordinates: ${wall.c}`));
        wall.sense = SENSE_VALUE;
        wall.light = SENSE_VALUE;
        wall.sight = SENSE_VALUE;
        wall.threshold = WINDOW_THRESHOLD;;
      });

    console.log(chalk.green(`${windows.length} windows processed`));
  }

  private isWindow(wall: Wall, gridSize: number): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (x1 === 2378 && x2 === 2522) { console.log('found window of size ', size); }

    // We need to give it a pixel on either side since sometimes the math bumps them up a pixel
    return size <= MAX_WINDOW_SIZE + 2 * gridSize && size % gridSize < 2;
  }
}
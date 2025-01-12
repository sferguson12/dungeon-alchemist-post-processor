import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall, WallThreshold } from '../types';
import { WindowFilter } from '../filters/WindowFilter';
import { WallFilter } from '../filters/WallFilter';

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
export class WindowProcessor {
  constructor(
    @inject(WallFilter) private wallFilter: WallFilter,
    @inject(WindowFilter) private windowFilter: WindowFilter
  ) {}

  public async processObjects(jsonData: MapGrid, gridSize: number) {
    console.log(chalk.yellow('Processing JSON data on Windows'));

    const walls = jsonData.walls as Wall[];
    const windows = walls.filter(wall => this.wallFilter.isWall(wall))
      .filter(wall => this.windowFilter.isWindow(wall, gridSize))
      .map(wall => {
        console.log(chalk.cyan(`Updating detected window at coordinates: ${wall.c}`));
        wall.sense = SENSE_VALUE;
        wall.light = SENSE_VALUE;
        wall.sight = SENSE_VALUE;
        wall.threshold = WINDOW_THRESHOLD;;
      });

    console.log(chalk.green(`${windows.length} windows processed`));
  }
}
import chalk from 'chalk';
import { injectable } from 'tsyringe';
import { MapGrid, Wall } from './types';
import { filterWalls } from './utils';

// We define fences as at least two tiles in size
// to help differentiate them from windows. This will result
// in some fences that need to be fixed manually.
const MIN_FENCE_TILES = 2;

const SENSE_VALUE = 10; // Limited

@injectable()
export class Fences {
  public processObjects(jsonData: MapGrid, gridSize: number) {
    console.log(chalk.yellow('Processing JSON data on Fences'));

    const walls = jsonData.walls as Wall[];
    const fences = filterWalls(walls)
      .filter(wall => this.isFence(wall, gridSize))
      .map(wall => {
        console.log(chalk.cyan(`Updating detected fence at coordinates: ${wall.c}`));
        wall.sense = SENSE_VALUE;
      });

    console.log(chalk.green(`${fences.length} fences processed`));
  }

  private isFence(wall: Wall, gridSize: number): boolean {
    const [x1, y1, x2, y2] = wall.c;
    const size = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return size > MIN_FENCE_TILES * gridSize;
  }
}
import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall } from '../types';
import { FenceFilter } from '../filters/FenceFilter';
import { WallFilter } from '../filters/WallFilter';

const SENSE_VALUE = 10; // Limited

@injectable()
export class FenceProcessor {
  constructor(
    @inject(FenceFilter) private fenceFilter: FenceFilter,
    @inject(WallFilter) private wallFilter: WallFilter
  ) {}
  
  public processObjects(jsonData: MapGrid, gridSize: number) {
    console.log(chalk.yellow('Processing JSON data on Fences'));

    const walls = jsonData.walls as Wall[];
    const fences = walls.filter(wall => this.wallFilter.isWall(wall))
      .filter(wall => this.fenceFilter.isFence(wall, gridSize))
      .map(wall => {
        console.log(chalk.cyan(`Updating detected fence at coordinates: ${wall.c}`));
        wall.sense = SENSE_VALUE;
      });

    console.log(chalk.green(`${fences.length} fences processed`));
  }
}
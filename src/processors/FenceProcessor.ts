import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall } from '../types';
import { FenceFilter } from '../filters/FenceFilter';
import { WallFilter } from '../filters/WallFilter';
import { FenceTransformer } from '../transformers/FenceTransformer';
import { DoorFilter } from '../filters/DoorFilter';

@injectable()
export class FenceProcessor {
  constructor(
    @inject(DoorFilter) private doorFilter: DoorFilter,
    @inject(FenceFilter) private fenceFilter: FenceFilter,
    @inject(FenceTransformer) private fenceTransformer: FenceTransformer,
    @inject(WallFilter) private wallFilter: WallFilter,
  ) {}

  public processObjects(jsonData: MapGrid, gridSize: number): Wall[] {
    console.log(chalk.yellow('Processing JSON data on Fences'));

    const walls = jsonData.walls as Wall[];
    const fences = walls
      .filter(
        (wall) =>
          !this.wallFilter.isWall(wall) && !this.doorFilter.isDoor(wall),
      )
      .filter((wall) => this.fenceFilter.isFence(wall, gridSize))
      .map((wall) => this.fenceTransformer.transformObject(wall));

    console.log(chalk.green(`${fences.length} fences processed`));

    return fences;
  }
}

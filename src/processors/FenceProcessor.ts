import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall } from '../types';
import { FenceFilter } from '../filters/FenceFilter';
import { FenceTransformer } from '../transformers/FenceTransformer';

@injectable()
export class FenceProcessor {
  constructor(
    @inject(FenceFilter) private fenceFilter: FenceFilter,
    @inject(FenceTransformer) private fenceTransformer: FenceTransformer,
  ) {}

  public processObjects(jsonData: MapGrid, gridSize: number): Wall[] {
    console.log(chalk.yellow('Processing JSON data on Fences'));

    const walls = jsonData.walls as Wall[];
    const fences = walls
      .filter((wall) => this.fenceFilter.isFence(wall, gridSize))
      .map((wall) => this.fenceTransformer.transformObject(wall));

    console.log(chalk.green(`${fences.length} fences processed`));

    return fences;
  }
}

import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall } from '../types';
import { FenceFilter } from '../filters/FenceFilter';
import { FenceTransformer } from '../transformers/FenceTransformer';
import { PointTransformer } from '../transformers/PointTransformer';

@injectable()
export class FenceProcessor {
  constructor(
    @inject(FenceFilter) private fenceFilter: FenceFilter,
    @inject(FenceTransformer) private fenceTransformer: FenceTransformer,
    @inject(PointTransformer) private pointTransformer: PointTransformer,
  ) {}

  public processObjects(
    jsonData: MapGrid,
    gridSize: number,
    windows: Wall[],
  ): Wall[] {
    console.log(chalk.yellow('Processing JSON data on Fences'));

    const walls = jsonData.walls as Wall[];
    const fences = walls
      .filter((wall) => this.fenceFilter.isFence(wall, gridSize))
      .map((wall) => this.fenceTransformer.transformObject(wall));

    const extraFences = windows
      .filter((window) =>
        this.fenceFilter.isMisidentifiedWindow(window, fences),
      )
      .map((window) => this.fenceTransformer.transformObject(window));

    fences.push(...extraFences);

    console.log(chalk.green(`${fences.length} fences processed`));

    return fences;
  }
}

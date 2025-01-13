import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall } from '../types';
import { WindowFilter } from '../filters/WindowFilter';
import { WallFilter } from '../filters/WallFilter';
import { WindowTransfromer } from '../transformers/WindowTransfromer';
import { DoorFilter } from '../filters/DoorFilter';

@injectable()
export class WindowProcessor {
  constructor(
    @inject(DoorFilter) private doorFilter: DoorFilter,
    @inject(WallFilter) private wallFilter: WallFilter,
    @inject(WindowFilter) private windowFilter: WindowFilter,
    @inject(WindowTransfromer) private windowTransfromer: WindowTransfromer,
  ) {}

  public processObjects(jsonData: MapGrid, gridSize: number): Wall[] {
    console.log(chalk.yellow('Processing JSON data on Windows'));

    const walls = jsonData.walls as Wall[];
    const windows = walls
      .filter(
        (wall) =>
          !this.wallFilter.isWall(wall) && !this.doorFilter.isDoor(wall),
      )
      .filter((wall) => this.windowFilter.isWindow(wall, gridSize))
      .map((wall) => this.windowTransfromer.transformObject(wall));

    console.log(chalk.green(`${windows.length} windows processed`));

    return windows;
  }
}

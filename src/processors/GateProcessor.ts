import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Point, Wall } from '../types';
import { GateFilter } from '../filters/GateFilter';
import { SenseValue } from '../enums';
import { DoorFilter } from '../filters/DoorFilter';
import { GateTransformer } from '../transformers/GateTransformer';

@injectable()
export class GateProcessor {
  constructor(
    @inject(DoorFilter) private doorFilter: DoorFilter,
    @inject(GateFilter) private gateFilter: GateFilter,
    @inject(GateTransformer) private gateTransformer: GateTransformer,
  ) {}

  public processObjects(jsonData: MapGrid, gridSize: number) {
    console.log(chalk.yellow('Processing JSON data on Gates'));

    const walls = jsonData.walls as Wall[];

    // Since the fences have already been filtered, we just look for Limited sense values
    const fences = walls.filter((wall) => wall.sense === SenseValue.Limited);
    console.log(chalk.green(`${fences.length} fences found`));

    // Build a list of fence coordinate pairs for use by the gate filter
    const fencePoints: Point[] = fences.flatMap((fence) => {
      return [
        { x: fence.c[0], y: fence.c[1] },
        { x: fence.c[2], y: fence.c[3] },
      ];
    });

    const gates = walls
      .filter((wall) => this.doorFilter.isDoor(wall))
      .filter((wall) => this.gateFilter.isGate(wall, gridSize, fencePoints))
      .map((wall) => this.gateTransformer.transformObject(wall));

    console.log(chalk.green(`${gates.length} gates processed`));
  }
}

import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Point, Wall } from '../types';
import { GateFilter } from '../filters/GateFilter';
import { GateTransformer } from '../transformers/GateTransformer';
import { PointTransformer } from '../transformers/PointTransformer';

@injectable()
export class GateProcessor {
  constructor(
    @inject(GateFilter) private gateFilter: GateFilter,
    @inject(GateTransformer) private gateTransformer: GateTransformer,
    @inject(PointTransformer) private pointTransformer: PointTransformer,
  ) {}

  public processObjects(
    jsonData: MapGrid,
    gridSize: number,
    fences: Wall[],
  ): Wall[] {
    console.log(chalk.yellow('Processing JSON data on Gates'));

    const walls = jsonData.walls as Wall[];

    // Build a list of fence coordinate pairs for use by the gate filter
    const fencePoints: Point[] = this.pointTransformer.toAllPoints(fences);

    const gates = walls
      .filter((wall) => this.gateFilter.isGate(wall, gridSize, fencePoints))
      .map((wall) => this.gateTransformer.transformObject(wall));

    console.log(chalk.green(`${gates.length} gates processed`));

    return gates;
  }
}

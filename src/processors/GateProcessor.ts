import chalk from 'chalk';
import { inject, injectable } from 'tsyringe';
import { MapGrid, Wall } from '../types';
import { GateFilter } from '../filters/GateFilter';
import { FenceFilter } from '../filters/FenceFilter';
import { WallFilter } from '../filters/WallFilter';

// We define fences as at least two tiles in size
// to help differentiate them from windows. This will result
// in some fences that need to be fixed manually.
const MAX_GATE_TILES = 2;

const SENSE_VALUE = 10; // Limited

@injectable()
export class GateProcessor {
  constructor(
    @inject(FenceFilter) private fenceFilter: FenceFilter,
    @inject(GateFilter) private gateFilter: GateFilter,
    @inject(WallFilter) private wallFilter: WallFilter
  ) {}

  public processObjects(jsonData: MapGrid, gridSize: number) {
    console.log(chalk.yellow('Processing JSON data on Gates'));

    const walls = jsonData.walls as Wall[];
    const gates = walls.filter(wall => this.wallFilter.isWall(wall))
      .filter(wall => this.gateFilter.isGate(wall, gridSize))
      .map(wall => {
        console.log(chalk.cyan(`Updating detected gate at coordinates: ${wall.c}`));
        wall.sense = SENSE_VALUE;
      });

    console.log(chalk.green(`${gates.length} gates processed`));
  }
}
import { injectable } from 'tsyringe';
import { Wall } from '../types';
import chalk from 'chalk';
import { SenseValue } from '../enums';

@injectable()
export class GateTransformer {
  public transformObject(wall: Wall): Wall {
    console.log(chalk.cyan(`Updating detected gate at coordinates: ${wall.c}`));
    wall.sense = SenseValue.Limited;
    return wall;
  }
}

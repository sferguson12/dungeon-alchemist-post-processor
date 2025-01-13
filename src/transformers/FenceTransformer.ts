import { injectable } from 'tsyringe';
import { Wall } from '../types';
import chalk from 'chalk';
import { SenseValue, SoundValue } from '../enums';

@injectable()
export class FenceTransformer {
  public transformObject(wall: Wall): Wall {
    console.log(
      chalk.cyan(`Updating detected fence at coordinates: ${wall.c}`),
    );
    wall.sense = SenseValue.Limited;
    wall.sound = SoundValue.None;
    return wall;
  }
}

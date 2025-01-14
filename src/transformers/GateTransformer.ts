import { injectable } from 'tsyringe';
import { Wall } from '../types';
import chalk from 'chalk';
import { DoorValue, MovementValue, SenseValue, SoundValue } from '../enums';

@injectable()
export class GateTransformer {
  public transformObject(wall: Wall): Wall {
    console.log(chalk.cyan(`Updating detected gate at coordinates: ${wall.c}`));

    wall.move = MovementValue.Normal;
    wall.sense = SenseValue.Limited;
    wall.sound = SoundValue.None;
    wall.door = DoorValue.Door;

    wall.light = undefined;
    wall.sight = undefined;
    wall.threshold = undefined;

    return wall;
  }
}

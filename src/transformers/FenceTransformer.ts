import { injectable } from "tsyringe";
import { Wall } from "../types";
import chalk from "chalk";

const SENSE_VALUE = 10; // Limited

@injectable()
export class FenceTransformer {
  public transformObject(wall: Wall) {
    console.log(chalk.cyan(`Updating detected fence at coordinates: ${wall.c}`));
    wall.sense = SENSE_VALUE;
  }
}
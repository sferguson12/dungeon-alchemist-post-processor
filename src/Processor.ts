import { inject, injectable } from 'tsyringe';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { Windows } from './Windows';
import { Fences } from './Fences';
import { MapGrid } from './types';

@injectable()
export class Processor {
  constructor(
    @inject(Windows) private windows: Windows,
    @inject(Fences) private fences: Fences
  ) {}

  public async process(file: string) {
    const filePath = path.resolve(file);
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(data) as MapGrid;

      console.log(chalk.green('File content successfully read into memory'));
      // Save for debugging
      // console.log(util.inspect(jsonData, { depth: null, colors: true }));

      const gridSize = jsonData.grid;
      console.log(chalk.blue(`Grid size: ${gridSize}`));

      this.windows.processObjects(jsonData, gridSize);
      this.fences.processObjects(jsonData, gridSize);

      const outputFilePath = path.resolve('output.json');
      await fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2));
      console.log(chalk.green(`Modified JSON data written to ${outputFilePath}`));
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        console.error(chalk.red(`File not found: ${filePath}`));
      } else if (err instanceof SyntaxError) {
        console.error(chalk.red(`Error parsing JSON: ${err.message}`));
      } else {
        console.error(chalk.red(`Error reading file: ${err.message}`));
      }
      throw err;
    }
  }
}
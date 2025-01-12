import { inject, injectable } from 'tsyringe';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { WindowProcessor } from './processors/WindowProcessor';
import { FenceProcessor } from './processors/FenceProcessor';
import { MapGrid } from './types';
import { GateProcessor } from './processors/GateProcessor';

const DEFAULT_BACKGROUND_COLOR = '#000000';

@injectable()
export class MapGridProcessor {
  constructor(
    @inject(FenceProcessor) private fenceProcessor: FenceProcessor,
    @inject(GateProcessor) private gateProcessor: GateProcessor,
    @inject(WindowProcessor) private windowProcessor: WindowProcessor,
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

      this.windowProcessor.processObjects(jsonData, gridSize);
      this.fenceProcessor.processObjects(jsonData, gridSize);
      this.gateProcessor.processObjects(jsonData, gridSize);

      jsonData.backgroundColor = DEFAULT_BACKGROUND_COLOR;

      const outputFilePath = path.resolve('output.json');
      await fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2));
      console.log(
        chalk.green(`Modified JSON data written to ${outputFilePath}`),
      );
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

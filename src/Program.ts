import { injectable, inject } from 'tsyringe';
import { Command } from 'commander';
import { MapGridProcessor } from './MapGridProcessor';

@injectable()
export class Program {
  private program: Command;

  constructor(
    @inject(MapGridProcessor) private mapGridProcessor: MapGridProcessor,
  ) {
    this.program = new Command();
    this.setupCommands();
  }

  private setupCommands() {
    this.program
      .name('dapp')
      .description(
        'A utility for post-processing Dungeon Alchemy exports for Foundry VTT',
      )
      .version('0.1.0');

    this.program
      .command('process <file>')
      .description('Post process the Dungeon Alchemy export')
      .action(async (file: string) => {
        await this.mapGridProcessor.process(file);
      });
  }

  public parse(argv: string[]) {
    this.program.parse(argv);
  }
}

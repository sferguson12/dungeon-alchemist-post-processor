import 'reflect-metadata';
import { container } from 'tsyringe';
import { Program } from './Program';

const program = container.resolve(Program);
program.parse(process.argv);
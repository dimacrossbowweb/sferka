import { type IColor } from '../interfaces';

export abstract class AbstractColor implements IColor {

	abstract r: number;
	abstract g: number;
	abstract b: number;

	abstract alpha: number;
	abstract format: string;

};

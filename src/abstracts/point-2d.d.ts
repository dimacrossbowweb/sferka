import { type IPoint2D } from '../interfaces';

export abstract class AbstractPoint2D implements IPoint2D {

	abstract x: number;
	abstract y: number;

	abstract color: string;
	abstract radius: number;

};

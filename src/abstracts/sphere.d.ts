import { type ISphere } from '../interfaces';

export abstract class Sphere implements ISphere {

	abstract hexagons: IHex[];

	abstract radius: number;

};

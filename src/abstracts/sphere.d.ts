import { type ISphere } from '../interfaces';

export abstract class AbstractSphere implements ISphere {

	abstract hexagons: IHex[];

	abstract radius: number;

};

import { type ISphere, type IPolygon } from '../interfaces';

export abstract class AbstractSphere implements ISphere {

	abstract geometry: IPolygon[];

	abstract radius: number;

	abstract details: number;

};

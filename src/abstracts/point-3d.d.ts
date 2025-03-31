import { type IPoint3D } from '../interfaces';

export abstract class AbstractPoint3D implements IPoint3D {

	abstract x: number;
	abstract y: number;
	abstract z: number;

};
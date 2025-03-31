import { type IPoint2D, type IPoint3D } from '../interfaces';

export abstract class AbstractCamera implements IPoint2D {

	abstract x: number;
	abstract y: number;
	abstract z: number;

	abstract scale: number;

	abstract rotate( value: IPoint3D ): void;

	abstract zoom( value: number ): void;

};

import { type ILight } from '../interfaces';

export abstract class AbstractLight implements ILight {

	abstract yaw: number;
	abstract pitch: number;
	abstract roll: number;

	abstract rotate( rotation: ILight ): void;

};

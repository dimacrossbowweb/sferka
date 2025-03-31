import { type ICamera } from '../interfaces';

export abstract class AbstractCamera implements ICamera {

	abstract yaw: number;
	abstract pitch: number;
	abstract roll: number;

	abstract z: number;

	abstract rotate( rotation: ICamera ): void;

	abstract zoom( z: number ): void;

};

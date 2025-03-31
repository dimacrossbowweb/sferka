import { type IPoint2D } from '../interfaces';
import { AbstractCamera } from './camera';

export abstract class AbstractScene {

	abstract canvas: HTMLCanvasElement;

	abstract center: IPoint2D;

	abstract camera: AbstractCamera;

	abstract render (): void;

	abstract clear (): void;

};

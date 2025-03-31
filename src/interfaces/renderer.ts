import { type IPoint2D } from './point-2d';
import { type ICamera } from './camera';

export interface IRenderer {

	canvas: HTMLCanvasElement;

	center: IPoint2D;

	camera: ICamera;

};

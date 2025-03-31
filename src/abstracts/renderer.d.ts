import type { IPoint2D } from '../interfaces';
import { IRenderer } from '../interfaces/renderer';

export abstract class AbstractRenderer implements IRenderer {

	abstract canvas: HTMLCanvasElement;

	abstract center: IPoint2D;

	abstract camera: ICamera;

	render( canvas: HTMLCanvasElement, camera: ICamera, center: IPoint2D ): void;

};

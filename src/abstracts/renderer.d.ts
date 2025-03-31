import { AbstractScene } from './scene.d';

export abstract class AbstractRenderer {

	render( canvas: HTMLCanvasElement, scene: AbstractScene ): void;

};

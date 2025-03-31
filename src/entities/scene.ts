import { type IPoint2D } from '../interfaces';
import { AbstractScene, AbstractCamera } from '../abstracts';
import { Camera } from './camera';

export class Scene extends AbstractScene {

	canvas!: HTMLCanvasElement;

	center!: IPoint2D;

	camera!: AbstractCamera;

	ro!: ResizeObserver;

	constructor ( canvas: HTMLCanvasElement, camera: Camera, center: IPoint2D ) {

		super();

		try {

			if ( !( canvas instanceof HTMLCanvasElement ) ) {

				throw new Error( 'Scene -> constructor :: invalid canvas element' );

			}

			if ( !( camera instanceof Camera ) ) {

				throw new Error( 'Scene -> constructor :: invalid camera element' );

			}

			this.canvas = canvas;
			this.camera = camera;

			this.ro = new ResizeObserver( () => {

				this.render();

			} );

			this.ro.observe( this.canvas );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	render (): void {

		this.clear();

		

	}

	clear (): void {

	}

};

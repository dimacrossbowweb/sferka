import { type IPoint2D } from '../interfaces';
import { AbstractScene } from '../abstracts';
import { Camera } from './camera';

export class Scene extends AbstractScene {

	canvas!: HTMLCanvasElement;

	private ctx!: CanvasRenderingContext2D;

	center!: IPoint2D;

	camera!: Camera;

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

			const ctx: CanvasRenderingContext2D | null = this.canvas.getContext( '2d' );

			if ( !ctx ) {

				throw new Error( 'Scene -> constructor :: invalid canvas context' );

			}

			this.ctx = ctx;

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

		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

	}

};

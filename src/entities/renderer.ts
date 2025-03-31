import { type IPoint2D, type IPoint3D } from '../interfaces';
import { AbstractRenderer } from '../abstracts/renderer';
import { Camera } from './camera';

export class Renderer extends AbstractRenderer {

	canvas!: HTMLCanvasElement;

	private ctx!: CanvasRenderingContext2D;

	center!: IPoint2D;

	camera!: Camera;

	constructor ( canvas: HTMLCanvasElement ) {

		super();

		try {

			if ( !( canvas instanceof HTMLCanvasElement ) ) {

				throw new Error( 'Renderer -> constructor :: invalid canvas element' );

			}

			const ctx: CanvasRenderingContext2D | null = this.canvas.getContext( '2d' );

			if ( !ctx ) {

				throw new Error( 'Scene -> constructor :: invalid canvas context' );

			}

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	/**
	 * Calculates of pointProjection
	 * @param { Camera } camera
	 * @returns { number } center
	 */
	private projection ( camera: Camera, center: number, point3d: IPoint3D ): IPoint2D {

		const point: IPoint2D = {

			x: ( width.value / 2 ) * point3d.x + width.value / 2,
			y: ( height.value / 2 ) * point3d.y + height.value / 2,
		
		};

		return point;

	}

	render( canvas: HTMLCanvasElement, camera: Camera, center: IPoint2D ): void {



	}

};

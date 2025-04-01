import { type IPoint2D, type IPoint3D } from '../interfaces';
import { type TRotateMatrix } from '../types/rotate-matrix';
import { type TVector } from '../types/vector';
import { type IHex } from '../interfaces';
import { AbstractRenderer } from '../abstracts/renderer.d';
import { Camera } from './camera';
import { Math3D } from '../utils/math-3d';
import { Scene } from './scene';

export class Renderer extends AbstractRenderer {

	constructor () {

		super();

	}

	/**
	 * Calculates of pointProjection
	 * @param { Camera } camera
	 * @param { IPoint3D } point3d
	 * @returns { IPoint2D }
	 */
	private projection (
		
		camera: Camera,
		point3d: IPoint3D
	
	): IPoint2D {

		const rotateZMatrix: TRotateMatrix = Math3D.rotateMatrixZ( camera.roll );
		const rotateXMatrix: TRotateMatrix = Math3D.rotateMatrixX( camera.pitch );
		const rotateYMatrix: TRotateMatrix = Math3D.rotateMatrixY( camera.yaw );

		const pointVector: TVector = [ point3d.x, point3d.y, point3d.z ];

		const rotatedPoint: TVector = Math3D.multiplyMatrixVector(
			
			rotateYMatrix,
			Math3D.multiplyMatrixVector(
			
				rotateXMatrix, Math3D.multiplyMatrixVector( rotateZMatrix, pointVector )
			
			));


		const point: IPoint2D = {

			x: rotatedPoint[ 0 ],
			y: rotatedPoint[ 1 ],
		
		};

		return point;

	}

	private clear (
		
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number
	
	): void {

		try {

			if ( !( ctx instanceof CanvasRenderingContext2D ) ) {

				throw new Error( 'Renderer -> clear :: invalid canvas context' );

			}

			ctx.clearRect( 0, 0, width, height );


		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private drawHexagon (
		
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		scene: Scene,
		hex: IHex
	
	): void {

		try {

			if ( !( ctx instanceof CanvasRenderingContext2D ) ) {

				throw new Error( 'Renderer -> drawHexagon :: invalid canvas context' );

			}

			const points: IPoint2D[] = [
				
				this.projection( scene.camera, hex.points[ 0 ] ),
				this.projection( scene.camera, hex.points[ 1 ] ),
				this.projection( scene.camera, hex.points[ 2 ] ),
				this.projection( scene.camera, hex.points[ 3 ] ),
				this.projection( scene.camera, hex.points[ 4 ] ),
				this.projection( scene.camera, hex.points[ 5 ] )

			];

			// const center: IPoint2D = { x: 0, y: 0 };
			const center: IPoint2D = { x: Math.round( width / 2 ), y: Math.round( height / 2 ) };

			const size: number = Math.min( width / 2, height / 2 );

			ctx.beginPath();

			ctx.moveTo( points[ 0 ].x * size + center.x, points[ 0 ].y * size + center.y );

			for ( let i: number = 1; i < points.length; i++ ) {

				ctx.lineTo( points[ i ].x * size + center.x, points[ i ].y * size + center.y );

			}

			ctx.closePath();

			ctx.lineWidth = 2;
			ctx.strokeStyle = 'blue';

			ctx.stroke();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	render ( canvas: HTMLCanvasElement, scene: Scene ): void {

		try {

			if ( !( canvas instanceof HTMLCanvasElement ) ) {

				throw new Error( 'Rendered -> render :: invalid canvas element' );

			}

			if ( !( scene instanceof Scene ) ) {

				throw new Error( 'Renderer -> render :: invalid scene element' );

			}

			const ctx: CanvasRenderingContext2D | null = canvas.getContext( '2d' );

			if ( !ctx ) {

				throw new Error( 'Renderer -> render :: invalid canvas context' );

			}

			this.clear( ctx, canvas.width, canvas.height );

			const hexagons: IHex[] = scene?.sphere?.hexagons || [];

			hexagons.forEach( ( hex: IHex ) => {

				this.drawHexagon(

					ctx,
					canvas.clientWidth,
					canvas.clientHeight,
					scene,
					hex

				);

			} );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};

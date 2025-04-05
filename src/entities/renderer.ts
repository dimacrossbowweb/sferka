import { type IPoint2D, type IPoint3D, type IPolygon, type IColor } from '../interfaces';
import { type TRotateMatrix } from '../types/rotate-matrix';
import { type TVector } from '../types/vector';
import { AbstractRenderer } from '../abstracts/renderer.d';
import { Camera } from './camera';
import { Math3D } from '../utils/math-3d';
import { Scene } from './scene';
import { ColorParser } from '../utils/parsers/color';

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
	
	): IPoint3D {

		const rotateZMatrix: TRotateMatrix = Math3D.rotateMatrixZ( camera.roll );
		const rotateXMatrix: TRotateMatrix = Math3D.rotateMatrixX( camera.pitch );
		const rotateYMatrix: TRotateMatrix = Math3D.rotateMatrixY( camera.yaw );

		const pointVector: TVector = [ point3d.x, point3d.y, point3d.z ];

		const rotatedPoint: TVector = Math3D.multiplyMatrixVector(
			
			rotateYMatrix,
			Math3D.multiplyMatrixVector(
			
				rotateXMatrix, Math3D.multiplyMatrixVector( rotateZMatrix, pointVector )
			
			));


		const point: IPoint3D = {

			x: rotatedPoint[ 0 ],
			y: rotatedPoint[ 1 ],
			z: rotatedPoint[ 2 ],
		
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

	private drawPolygon (
		
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		scene: Scene,
		polygon: IPolygon
	
	): void {

		try {

			if ( !( ctx instanceof CanvasRenderingContext2D ) ) {

				throw new Error( 'Renderer -> drawHexagon :: invalid canvas context' );

			}

			const points: IPoint3D[] = polygon.points;

			const center: IPoint2D = { x: Math.round( width / 2 ), y: Math.round( height / 2 ) };

			const size: number = Math.min( width / 2, height / 2 );

			ctx.beginPath();

			ctx.moveTo( points[ 0 ].x * size * scene.camera.z + center.x, points[ 0 ].y * size * scene.camera.z + center.y );

			for ( let i: number = 1; i < points.length; i++ ) {

				ctx.lineTo( points[ i ].x * size * scene.camera.z + center.x, points[ i ].y * size * scene.camera.z + center.y );

			}

			ctx.closePath();

			ctx.lineWidth = 0;
			ctx.strokeStyle = '#ffffff';

			let light: number = Math3D.light( polygon, scene.light ) / ( Math.PI * 2 );

			light = light < 0.2 ? 0.2 : light;

			// console.log( light );

			// console.log( Math3D.light( polygon, scene.light ) );

			// ctx.fillStyle = polygon.color;

			console.log( 'polygon.color = ', polygon.color );

			const parsedColor: IColor = ColorParser.parse( polygon.color );

			ctx.fillStyle = `rgb( ${ Math.round( parsedColor.r * light ) }, ${ Math.round( parsedColor.g * light ) }, ${ Math.round( parsedColor.b * light ) } )`;

			ctx.fill();

			// ctx.stroke();

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

			const geometry: IPolygon[] = scene?.mesh?.geometry || [];

			const projectionBuffer: IPolygon[] = [];

			geometry.forEach( ( polygon: IPolygon ) => {

				const projectionPolygon: IPolygon = {

					points: [
					
						this.projection( scene.camera, polygon.points[ 0 ] ),
						this.projection( scene.camera, polygon.points[ 1 ] ),
						this.projection( scene.camera, polygon.points[ 2 ] ),
						this.projection( scene.camera, polygon.points[ 3 ] ),

					],

					color: polygon.color,

				};

				projectionBuffer.push( projectionPolygon );

			} );

			const zBuffer: IPolygon[] = Math3D.zBuffer( projectionBuffer );

			zBuffer.forEach( ( polygon: IPolygon ) => {

				this.drawPolygon(

					ctx,
					canvas.clientWidth,
					canvas.clientHeight,
					scene,
					polygon

				);

			} );

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};

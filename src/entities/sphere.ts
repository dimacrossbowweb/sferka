import { type IPolygon, type IPoint3D } from '../interfaces';
import { Mesh } from './mesh';

export class Sphere extends Mesh {

	radius!: number;

	details!: number;

	constructor ( radius: number, details: number, color: string ) {

		super( color );

		try {

			if ( typeof radius !== 'number' || radius <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid radius' );

			} 

			if ( typeof details !== 'number' || details <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid details' );

			}

			this.radius = radius;
			this.details = details;

			this.generate();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private generate (): void {

		const points: IPoint3D[][] = [];

		this.geometry = [];

		for ( let i: number = 0; i <= this.details; i++ ) {

			points.push( [] );

			for ( let j: number = 0; j <= this.details; j++ ) {

				const u = i / this.details;
				const v = j / this.details;
				const theta = 2 * Math.PI * u;
				const phi = Math.acos(2 * v - 1);

				points[ i ].push( {

					x: Math.sin( phi ) * Math.cos( theta ),
					y: Math.sin( phi ) * Math.sin( theta ),
					z: Math.cos( phi )

				} );

			}

		}

		for ( let i: number = 1; i <= this.details; i++ ) {

			const prevI: number = i <= this.details ? i - 1 : 0;

			for ( let j: number = 0; j < this.details ; j++ ) {

				const nextJ: number = j <= this.details ? j + 1 : 0;

				const polygon: IPolygon = {

					points: [

						points[ prevI ][ j ],
						points[ prevI ][ nextJ ],
						points[ i ][ nextJ ],
						points[ i ][ j ],

					],

					color: this.color,

					// color: `rgb(${ Math.round( Math.random() * 255 ) }, ${ Math.round( Math.random() * 255 ) }, ${ Math.round( Math.random() * 255 ) })`

				};

				this.geometry.push( polygon );

			}

		}

	}

	setDetails ( details: number = 10 ): void {

		this.details = details;

		this.generate();

	}

	setColor ( color: string = '#ffffff' ): void {

		this.color = color;

		this.geometry.forEach( ( polygon: IPolygon ) => polygon.color = color );

	}

};


import { type IPolygon, type IPoint3D } from '../interfaces';
import { Mesh } from './mesh';

export class Cylinder extends Mesh {

	size!: number;

	details!: number;

	constructor ( size: number, details: number, color: string ) {

		super( color );

		try {

			if ( typeof size !== 'number' || size <= 0 ) {

				throw new Error( 'Cylinder -> constructor :: invalid size' );

			} 

			if ( typeof details !== 'number' || details <= 0 ) {

				throw new Error( 'Cylinder -> constructor :: invalid details' );

			}

			this.size = size;
			this.details = details;

			this.generate();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private generate (): void {

		const points: IPoint3D[][] = [ [], [] ];

		for ( let i: number = 0; i < this.details; i++ ) {

			points[ 0 ][ i ] = {

				x: Math.cos( i / this.details * Math.PI * 2 ) * 0.5,
				y: Math.sin( i / this.details * Math.PI * 2 ) * 0.5,
				z: -0.5

			};

			points[ 1 ][ i ] = {

				x: Math.cos( i / this.details * Math.PI * 2 ) * 0.5,
				y: Math.sin( i / this.details * Math.PI * 2 ) * 0.5,
				z: 0.5

			};
			
		}

		const centerTop: IPoint3D = { x: 0, y: 0, z: -0.5 };
		const centerBottom: IPoint3D = { x: 0, y: 0, z: 0.5 };

		this.geometry = [];

		for ( let i: number = 0; i < this.details; i++ ) {

			const nextI: number = i === this.details - 1 ? 0 : i + 1;

			this.geometry.push( {

				points: [

					points[ 0 ][ i ],
					points[ 0 ][ nextI ],
					points[ 1 ][ nextI ],
					points[ 1 ][ i ],

				],

				color: this.color

			} );

			this.geometry.push( {

				points: [

					points[ 0 ][ i ],
					points[ 0 ][ nextI ],
					centerTop,
					centerTop,

				],

				color: this.color

			} );

			this.geometry.push( {

				points: [

					points[ 1 ][ i ],
					points[ 1 ][ nextI ],
					centerBottom,
					centerBottom,

				],

				color: this.color

			} );

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


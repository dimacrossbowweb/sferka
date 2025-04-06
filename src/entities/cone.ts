import { type IPolygon, type IPoint3D } from '../interfaces';
import { Mesh } from './mesh';

export class Cone extends Mesh {

	size!: number;

	details!: number;

	constructor ( size: number, details: number, color: string ) {

		super( color );

		try {

			if ( typeof size !== 'number' || size <= 0 ) {

				throw new Error( 'Cone -> constructor :: invalid size' );

			} 

			if ( typeof details !== 'number' || details <= 0 ) {

				throw new Error( 'Cone -> constructor :: invalid details' );

			}

			this.size = size;
			this.details = details;

			this.generate();

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private generate (): void {

		const points: IPoint3D[] = [];

		for ( let i: number = 0; i < this.details; i++ ) {

			points.push( {

				x: Math.cos( i / this.details * Math.PI * 2 ) * 0.5,
				y: Math.sin( i / this.details * Math.PI * 2 ) * 0.5,
				z: 0.5

			} );
			
		}

		const centerTop: IPoint3D = { x: 0, y: 0, z: -0.5 };
		const centerBottom: IPoint3D = { x: 0, y: 0, z: 0.5 };

		this.geometry = [];

		for ( let i: number = 0; i < this.details; i++ ) {

			const nextI: number = i === this.details - 1 ? 0 : i + 1;

			this.geometry.push( {

				points: [

					points[ i ],
					points[ nextI ],
					points[ nextI ],
					points[ i ],

				],

				color: this.color

			} );

			this.geometry.push( {

				points: [

					points[ i ],
					points[ nextI ],
					centerTop,
					centerTop,

				],

				color: this.color

			} );

			this.geometry.push( {

				points: [

					points[ i ],
					points[ nextI ],
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


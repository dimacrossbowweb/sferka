import { type IPolygon, type IPoint3D } from '../interfaces';
import { Mesh } from './mesh';

export class Cube extends Mesh {

	size!: number;

	details!: number;

	constructor ( size: number, details: number, color: string ) {

		super( color );

		try {

			if ( typeof size !== 'number' || size <= 0 ) {

				throw new Error( 'Cube -> constructor :: invalid size' );

			} 

			if ( typeof details !== 'number' || details <= 0 ) {

				throw new Error( 'Cube -> constructor :: invalid details' );

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

		points[ 0 ] = { x: -0.5, y: -0.5, z: -0.5 };
		points[ 1 ] = { x: 0.5, y: -0.5, z: -0.5 };
		points[ 2 ] = { x: 0.5, y: 0.5, z: -0.5 };
		points[ 3 ] = { x: -0.5, y: 0.5, z: -0.5 };
		points[ 4 ] = { x: -0.5, y: -0.5, z: 0.5 };
		points[ 5 ] = { x: 0.5, y: -0.5, z: 0.5 };
		points[ 6 ] = { x: 0.5, y: 0.5, z: 0.5 };
		points[ 7 ] = { x: -0.5, y: 0.5, z: 0.5 };

		this.geometry = [

			{
				points: [ points[ 0 ], points[ 1 ], points[ 2 ], points[ 3 ] ],
				color: this.color
			},
			{
				points: [ points[ 4 ], points[ 5 ], points[ 6 ], points[ 7 ] ],
				color: this.color
			},
			{
				points: [ points[ 0 ], points[ 4 ], points[ 7 ], points[ 3 ] ],
				color: this.color
			},
			{
				points: [ points[ 0 ], points[ 1 ], points[ 5 ], points[ 4 ] ],
				color: this.color
			},
			{
				points: [ points[ 3 ], points[ 2 ], points[ 6 ], points[ 7 ] ],
				color: this.color
			},
			{
				points: [ points[ 1 ], points[ 5 ], points[ 6 ], points[ 2 ] ],
				color: this.color
			},

		];

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


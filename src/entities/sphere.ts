import { type IHex } from '../interfaces';
import { AbstractSphere } from '../abstracts';

export class Sphere extends AbstractSphere {

	hexagons!: IHex[];

	radius!: number;

	constructor ( radius: number, count: number ) {

		super();

		try {

			if ( typeof radius !== 'number' || radius <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid radius' );

			} 

			if ( typeof count !== 'number' || count <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid count' );

			}

			this.hexagons = [];

			this.generate();

			this.radius = radius;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private generate (): void {

		this.hexagons = [

			{

				points: [
					
					{ x: 0, y: 0.5, z: 0.75 },
					{ x: 0.23, y: 0.12, z: 0.98 },
					{ x: 0.6, y: 0.2, z: 0.8 },
					{ x: 0.3, y: 0.2, z: 1 },
					{ x: 0.1, y: 0.9, z: 0.3 },
					{ x: 0, y: 0, z: 0 },

				]

			}

		];

	}

};


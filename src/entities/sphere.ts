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

			this.radius = radius;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private generate (): void {

		

	}

};


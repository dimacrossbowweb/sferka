import { type IPolygon, type IPoint3D } from '../interfaces';
import { AbstractSphere } from '../abstracts';

export class Sphere extends AbstractSphere {

	geometry!: IPolygon[];

	radius!: number;

	details!: number;

	constructor ( radius: number, details: number ) {

		super();

		try {

			if ( typeof radius !== 'number' || radius <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid radius' );

			} 

			if ( typeof details !== 'number' || details <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid details' );

			}

			this.geometry = [];

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

		for ( let i: number = 0; i < this.details; i++ ) {

			points.push( [] );

			for ( let j: number = 0; j < this.details; j++ ) {

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

		for ( let i: number = 1; i < this.details; i++ ) {

			for ( let j: number = 0; j < this.details - 1; j++ ) {

				const polygon: IPolygon = {

					points: [

						points[ i - 1 ][ j ],
						points[ i - 1 ][ j + 1 ],
						points[ i ][ j + 1 ],
						points[ i ][ j ],

					]

				};

				this.geometry.push( polygon );

			}

		}

	}

};


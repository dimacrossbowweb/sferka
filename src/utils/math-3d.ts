import { type TRotateMatrix } from '../types/rotate-matrix';
import { type TVector } from '../types/vector';
import { type IPoint3D, type IPolygon, type ILight } from '../interfaces';

export class Math3D {

	static rotateMatrixX ( angle: number ): TRotateMatrix {

		const cosX: number = Math.cos( angle );
  		const sinX: number = Math.sin( angle );

		return [

			[ 1, 0, 0 ],
			[ 0, cosX, -sinX ],
			[ 0, sinX, cosX ],

		];

	}

	static rotateMatrixY ( angle: number ): TRotateMatrix {

		const cosY: number = Math.cos( angle );
  		const sinY: number = Math.sin( angle );

		return [

			[ cosY, 0, sinY ],
			[ 0, 1, 0 ],
			[ -sinY, 0, cosY ],

		];

	}

	static rotateMatrixZ ( angle: number ): TRotateMatrix {

		const cosZ: number = Math.cos( angle );
  		const sinZ: number = Math.sin( angle );

		return [

			[ cosZ, -sinZ, 0 ],
			[ sinZ, cosZ, 0 ],
			[ 0, 0, 1 ],

		];

	}

	static multiplyMatrixVector( matrix: TRotateMatrix, vector: TVector ): TVector {

		const result: TVector = [

			matrix[ 0 ][ 0 ] * vector[ 0 ] + matrix[ 0 ][ 1 ] * vector[ 1 ] + matrix[ 0 ][ 2 ] * vector[ 2 ],
			matrix[ 1 ][ 0 ] * vector[ 0 ] + matrix[ 1 ][ 1 ] * vector[ 1 ] + matrix[ 1 ][ 2 ] * vector[ 2 ],
			matrix[ 2 ][ 0 ] * vector[ 0 ] + matrix[ 2 ][ 1 ] * vector[ 1 ] + matrix[ 2 ][ 2 ] * vector[ 2 ]

		];

		return result;

	}

	static light( polygon: IPolygon, light: ILight ) {

		const vectorAB: TVector = [ 
			
			polygon.points[ 1 ].x - polygon.points[ 0 ].x,
			polygon.points[ 1 ].y - polygon.points[ 0 ].y,
			polygon.points[ 1 ].z - polygon.points[ 0 ].z,
		
		];

		const vectorAC: TVector = [ 
			
			polygon.points[ 2 ].x - polygon.points[ 0 ].x,
			polygon.points[ 2 ].y - polygon.points[ 0 ].y,
			polygon.points[ 2 ].z - polygon.points[ 0 ].z,
		
		];

		const planeNormal: TVector = [

			vectorAB[ 1 ] * vectorAC[ 2 ] - vectorAB[ 2 ] * vectorAC[ 1 ], 
			vectorAB[ 2 ] * vectorAC[ 0 ] - vectorAB[ 0 ] * vectorAC[ 2 ], 
			vectorAB[ 0 ] * vectorAC[ 1 ] - vectorAB[ 1 ] * vectorAC[ 0 ], 

		];

		const dotProduct: number = planeNormal[ 0 ] * light.yaw + planeNormal[ 1 ] * light.pitch + planeNormal[ 2 ] * light.roll;

		

		const normalMagnitude = Math.sqrt( planeNormal[ 0 ] ** 2 + planeNormal[ 1 ] ** 2 + planeNormal[ 2 ] ** 2 );

		const kMagnitude: number = Math.sqrt( light.yaw ** 2 + light.pitch ** 2 + light.roll ** 2 );

		const angle: number = Math.acos( dotProduct / ( normalMagnitude * kMagnitude ) );

		//console.log( 'angle = ', angle );



		return isNaN( angle ) ? Math.PI / 1.2 : angle;

	}

	static zBuffer( geometry: IPolygon[] ): IPolygon[] {

		return geometry.sort( ( p1: IPolygon, p2: IPolygon ) => {

			const p1Depth: number = p1.points.reduce( ( i: number, j: IPoint3D ) => i + j.z, 0 ) / 4;
			const p2Depth: number = p2.points.reduce( ( i: number, j: IPoint3D ) => i + j.z, 0 ) / 4;

			if ( p1Depth > p2Depth ) return 1;
			if ( p1Depth < p2Depth ) return -1;

			return 0;

		} );

	}

};

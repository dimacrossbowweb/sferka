import { type TRotateMatrix } from '../types/rotate-matrix';
import { type TVector } from '../types/vector';

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

};

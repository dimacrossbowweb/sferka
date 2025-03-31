import { type IPoint3D } from '../interfaces';
import { AbstractCamera } from '../abstracts';

export class Camera extends AbstractCamera {

	x!: number;
	y!: number;
	z!: number;

	scale!: number;

	constructor( position: IPoint3D, scale: number ) {

		super();

		try {

			this.x = position?.x || 0;
			this.y = position?.y || 0;
			this.z = position?.z || 0;

			this.scale = scale || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	rotate( value: IPoint3D ): void {

		try {

			this.x = value?.x || 0;
			this.y = value?.y || 0;
			this.z = value?.z || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	zoom( value: number ): void {

		try {

			this.scale = value || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};


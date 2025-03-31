import { type ICamera } from '../interfaces';
import { AbstractCamera } from '../abstracts';

export class Camera extends AbstractCamera {

	yaw!: number;
	pitch!: number;
	roll!: number;

	z!: number;

	constructor( rotation: ICamera ) {

		super();

		try {

			this.yaw = rotation?.yaw || 0;
			this.pitch = rotation?.pitch || 0;
			this.roll = rotation?.roll || 0;

			this.z = rotation?.z || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	rotate( rotation: ICamera ): void {

		try {

			this.yaw = rotation?.yaw || 0;
			this.pitch = rotation?.pitch || 0;
			this.roll = rotation?.roll || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	zoom( z: number ): void {

		try {

			this.z = z || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};


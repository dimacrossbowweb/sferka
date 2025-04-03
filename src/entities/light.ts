import { type ILight } from '../interfaces';
import { AbstractLight } from '../abstracts';

export class Light extends AbstractLight {

	yaw!: number;
	pitch!: number;
	roll!: number;

	constructor( rotation: ILight ) {

		super();

		try {

			this.yaw = rotation?.yaw || 0;
			this.pitch = rotation?.pitch || 0;
			this.roll = rotation?.roll || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	rotate( rotation: ILight ): void {

		try {

			this.yaw = rotation?.yaw || 0;
			this.pitch = rotation?.pitch || 0;
			this.roll = rotation?.roll || 0;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};


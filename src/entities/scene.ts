import { AbstractScene } from '../abstracts';
import { Camera } from './camera';
import { Sphere } from './sphere';

export class Scene extends AbstractScene {

	camera!: Camera;

	sphere!: Sphere;

	constructor ( camera: Camera, sphere: Sphere ) {

		super();

		try {

			if ( !( camera instanceof Camera ) ) {

				throw new Error( 'Scene -> constructor :: invalid camera element' );

			}

			if ( !( sphere instanceof Sphere ) ) {

				throw new Error( 'Scene -> constructor :: invalid sphere element' );

			}

			this.camera = camera;
			this.sphere = sphere;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};

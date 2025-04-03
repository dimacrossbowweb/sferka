import { AbstractScene } from '../abstracts';
import { Camera } from './camera';
import { Light } from './light';
import { Sphere } from './sphere';

export class Scene extends AbstractScene {

	camera!: Camera;

	light!: Light;

	sphere!: Sphere;

	constructor ( camera: Camera, light: Light, sphere: Sphere ) {

		super();

		try {

			if ( !( camera instanceof Camera ) ) {

				throw new Error( 'Scene -> constructor :: invalid camera element' );

			}

			if ( !( light instanceof Light ) ) {

				throw new Error( 'Scene -> constructor :: invalid light element' );

			}

			if ( !( sphere instanceof Sphere ) ) {

				throw new Error( 'Scene -> constructor :: invalid sphere element' );

			}

			this.camera = camera;
			this.light = light;
			this.sphere = sphere;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};

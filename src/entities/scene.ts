import { AbstractScene } from '../abstracts';
import { Camera } from './camera';
import { Light } from './light';
import { Mesh } from './mesh'

export class Scene extends AbstractScene {

	camera!: Camera;

	light!: Light;

	mesh!: Mesh;

	constructor ( camera: Camera, light: Light, mesh: Mesh ) {

		super();

		try {

			if ( !( camera instanceof Camera ) ) {

				throw new Error( 'Scene -> constructor :: invalid camera element' );

			}

			if ( !( light instanceof Light ) ) {

				throw new Error( 'Scene -> constructor :: invalid light element' );

			}

			if ( !( mesh instanceof Mesh ) ) {

				throw new Error( 'Scene -> constructor :: invalid mesh element' );

			}

			this.camera = camera;
			this.light = light;
			this.mesh = mesh;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

};

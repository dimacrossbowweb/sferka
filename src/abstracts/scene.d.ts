import { type IScene, type IPoint2D } from '../interfaces';
import { AbstractCamera } from './camera.d';
import { AbstractLight } from './light.d';
import { AbstractMesh } from './mesh.d';

export abstract class AbstractScene implements IScene {

	abstract camera: AbstractCamera;
	
	abstract light: AbstractLight;

	abstract mesh: AbstractMesh;

};

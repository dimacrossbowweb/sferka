import { type IScene, type IPoint2D } from '../interfaces';
import { AbstractCamera } from './camera.d';
import { AbstractLight } from './light.d';
import { AbstractSphere } from './sphere.d';

export abstract class AbstractScene implements IScene {

	abstract camera: AbstractCamera;
	
	abstract light: AbstractLight;

	abstract sphere: AbstractSphere;

};

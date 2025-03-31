import { type IScene, type IPoint2D } from '../interfaces';
import { AbstractCamera } from './camera.d';
import { AbstractSphere } from './sphere.d';

export abstract class AbstractScene implements IScene {

	abstract camera: AbstractCamera;

	abstract sphere: AbstractSphere;

};

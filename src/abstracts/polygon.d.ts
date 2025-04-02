import { type IHex } from '../interfaces';
import { AbstractPoint3D } from './point-3d.d';

export abstract class AbstractHex implements IHex {

	abstract points: [
		
		AbstractPoint3D,
		AbstractPoint3D,
		AbstractPoint3D,
		AbstractPoint3D,
	
	];

	abstract color: string;

};

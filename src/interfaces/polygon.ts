import { type IPoint3D } from './point-3d';

export interface IPolygon {

	points: [
		
		IPoint3D,
		IPoint3D,
		IPoint3D,
		IPoint3D,
	
	];

	color: string;

};

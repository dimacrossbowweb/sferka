import { type IPolygon } from '../interfaces';

export abstract class AbstractMesh implements IMesh {

    abstract geometry: IPolygon[];

    abstract color: string;

};

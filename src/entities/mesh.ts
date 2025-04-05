import { AbstractMesh } from '../abstracts';
import { type IPolygon } from '../interfaces';

export class Mesh extends AbstractMesh {

    geometry!: IPolygon[];
    
    color!: string;

    constructor( color: string ) {

        super();

        try {

            this.geometry = [];
            this.color = color;

        } catch ( e: unknown ) {

            console.error( e );

        }

    }

};

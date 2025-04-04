import { AbstractColor } from '../abstracts/color';
import { ColorParser } from '../utils/parsers/color';
import { type IColor } from '../interfaces';

export class Color extends AbstractColor {

	r!: number;
	g!: number;
	b!: number;

	alpha!: number;
	format!: string;

	constructor ( color: string ) {

		super();

		try {

			const parsedColor: IColor = ColorParser.parse( color );

			if ( [ 'rgb', 'hex' ].includes( parsedColor?.format ) ) {

				this.r = parsedColor.r;
				this.g = parsedColor.g;
				this.b = parsedColor.b;

				this.alpha = parsedColor.alpha;
				this.format = parsedColor.format;

			}

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	toString (): string {

		return `rgba( ${ this.r }, ${ this.g }, ${ this.b }, ${ this.alpha } )`;

	}

};

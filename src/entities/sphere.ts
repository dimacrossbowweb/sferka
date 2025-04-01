import { type IHex, type IPoint3D } from '../interfaces';
import { AbstractSphere } from '../abstracts';

export class Sphere extends AbstractSphere {

	hexagons!: IHex[];

	radius!: number;

	constructor ( radius: number, count: number ) {

		super();

		try {

			if ( typeof radius !== 'number' || radius <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid radius' );

			} 

			if ( typeof count !== 'number' || count <= 0 ) {

				throw new Error( 'Sphere -> constructor :: invalid count' );

			}

			this.hexagons = [];

			this.generate();

			this.radius = radius;

		} catch ( e: unknown ) {

			console.error( e );

		}

	}

	private generate ( radius: number = 1, numHexagons: number = 20 ): void {


function createTruncatedIcosahedronHexagons( radius: number = 1 ): IHex[] {
		// Золотое сечение
		const phi = (1 + Math.sqrt(5)) / 2;

		// Вершины усечённого икосаэдра
		const vertices: IPoint3D[] = [
			// Вершины икосаэдра
			{ x: 1, y: phi, z: 0 }, { x: -1, y: phi, z: 0 },
			{ x: 1, y: -phi, z: 0 }, { x: -1, y: -phi, z: 0 },
			{ x: phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 },
			{ x: -phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 },
			{ x: 0, y: 1, z: phi }, { x: 0, y: -1, z: phi },
			{ x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: -phi },
			// Дополнительные вершины для усечения
			{ x: 1, y: 0, z: phi }, { x: -1, y: 0, z: phi },
			{ x: 1, y: 0, z: -phi }, { x: -1, y: 0, z: -phi },
			{ x: phi, y: 1, z: 0 }, { x: -phi, y: 1, z: 0 },
			{ x: phi, y: -1, z: 0 }, { x: -phi, y: -1, z: 0 },
			{ x: 0, y: phi, z: 1 }, { x: 0, y: -phi, z: 1 },
			{ x: 0, y: phi, z: -1 }, { x: 0, y: -phi, z: -1 }
		];

		// Нормализуем вершины на радиус 1
		vertices.forEach(vertex => {
			const norm = Math.sqrt(vertex.x ** 2 + vertex.y ** 2 + vertex.z ** 2);
			vertex.x /= norm;
			vertex.y /= norm;
			vertex.z /= norm;
		});

		// Создаем шестиугольники
		const hexagons: IHex[] = [];

		console.log( '>>' );

		console.log( vertices.slice(0, 6) );

		// Пример: создаем шестиугольник из первых 6 вершин (для демонстрации)
		hexagons.push({ points: vertices.slice(0, 6) });

		// Добавьте дополнительные шестиугольники, используя другие комбинации вершин
		// Например, для создания всех шестиугольников, вписанных в усечённый икосаэдр,
		// вам нужно будет определить правильные комбинации вершин.

		return hexagons;
		}

		// Создаем массив шестиугольников
		this.hexagons = createTruncatedIcosahedronHexagons();

		console.log( 'HEX' );
		console.log( this.hexagons );

		this.hexagons = [

			{

				points: [
					
					{ x: 1, y: 0, z: 0 },
					{ x: 0.5, y: 0.87, z: 0 },
					{ x: -0.5, y: 0.87, z: 0 },
					{ x: -1, y: 0, z: 0 },
					{ x: -0.5, y: -0.87, z: 0 },
					{ x: 0.5, y: -0.87, z: 0 },

				]

			},

			{

				points: [
					
					{ x: 1 * Math.cos( 1 ), y: 0 * Math.sin( 1 ), z: 0 },
					{ x: 0.5 * Math.cos( 1 ), y: 0.87 * Math.sin( 1 ), z: 0 },
					{ x: -0.5 * Math.cos( 1 ), y: 0.87 * Math.sin( 1 ), z: 0 },
					{ x: -1 * Math.cos( 1 ), y: 0 * Math.sin( 1 ), z: 0 },
					{ x: -0.5 * Math.cos( 1 ), y: -0.87 * Math.sin( 1 ), z: 0 },
					{ x: 0.5 * Math.cos( 1 ), y: -0.87 * Math.sin( 1 ), z: 0 },

				]

			}

		];

	}

};


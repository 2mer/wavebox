import Directions2D from './Directions2D';
import Tile from './Tile';
import checkRelatives from './TilePositionChecker';
import createJunctionTile from './tiles/JunctionTile';
import createRoundTilePackage from './tiles/RoundTilePackage';
import { ANY_COLOR, BLUE, EMPTY, PURPLE, RED } from './tiles/symbols';
import createTilePackage from './tiles/TilePackage';

const BLANK_TILE = new Tile(
	{ texture: 'blank', tags: [EMPTY], weight: 1 },
	...checkRelatives({
		UP: (t) => !t.tags.includes(Directions2D.DOWN),
		DOWN: (t) => !t.tags.includes(Directions2D.UP),
		LEFT: (t) => !t.tags.includes(Directions2D.RIGHT),
		RIGHT: (t) => !t.tags.includes(Directions2D.LEFT),
	}).build()
);

const TileRegistry = [
	...createRoundTilePackage({
		identifier: BLUE,
		color: 0xe5ffde,
		check: (t) => t.tags.includes(BLUE) || t.tags.includes(ANY_COLOR),
		weights: { l: [100, 5] },
	}),

	...createRoundTilePackage({
		identifier: RED,
		color: 0xed6a5a,
		check: (t) => t.tags.includes(RED) || t.tags.includes(ANY_COLOR),
		weights: { l: [5, 100] },
	}),

	...createTilePackage({
		identifier: PURPLE,
		color: 0x9590a8,
		check: (t) => t.tags.includes(PURPLE) || t.tags.includes(ANY_COLOR),
		weights: { t: [20, 0, 20, 0], l: [20, 1] },
	}),
	// ...createTilePackage({ identifier: ANY_COLOR, color: 0x00ff00 }),
	// createJunctionTile({ identifier: ANY_COLOR, color: 0x9590a8 }),

	// new Tile(
	// 	{ texture: 'images/j.png', tags: [EMPTY], color: 0x9590a8 },
	// 	...checkRelatives({
	// 		UP: (t) => t.tags.includes(EMPTY),
	// 		DOWN: (t) => t.tags.includes(EMPTY),
	// 		LEFT: (t) => t.tags.includes(EMPTY),
	// 		RIGHT: (t) => t.tags.includes(EMPTY),
	// 	}).build()
	// ),
	new Tile(
		{
			texture: 'images/j.png',
			tags: [ANY_COLOR],
			color: 0x9590a8,
			weight: 0.00001,
		},
		() => true
	),

	// ...Array(500).fill(BLANK_TILE),
	BLANK_TILE,
];

export default TileRegistry;

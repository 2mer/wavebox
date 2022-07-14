import Directions2D from '../Directions2D';
import Tile from '../Tile';
import checkRelatives from '../TilePositionChecker';
import { JUNCTION } from './symbols';

export default function createJunctionTile({
	identifier,
	color = undefined,
	check = () => true,
	texture = 'images/j2.png',
}) {
	return new Tile(
		{
			texture,
			tags: [
				Directions2D.DOWN,
				Directions2D.UP,
				Directions2D.RIGHT,
				Directions2D.LEFT,
				identifier,
				JUNCTION,
			],
			color,
		},
		...checkRelatives({
			UP: (t) => check(t) && t.tags.includes(Directions2D.DOWN),
			LEFT: (t) => check(t) && t.tags.includes(Directions2D.RIGHT),
			RIGHT: (t) => check(t) && t.tags.includes(Directions2D.LEFT),
			DOWN: (t) => check(t) && t.tags.includes(Directions2D.UP),
		}).build()
	);
}

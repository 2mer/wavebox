import Tile from '../Tile';
import checkRelatives, { createRotations } from '../TilePositionChecker';

export default function createLTiles({
	identifier,
	color = undefined,
	check = () => true,
	texture = 'images/e.png',
}) {
	return createRotations(
		[0, 1, 2, 3],
		({ rotation, directions }) =>
			new Tile(
				{
					texture,
					tags: [directions.DOWN, identifier],
					rotation: 90 * rotation,
					color,
				},
				...checkRelatives({
					[directions.UP]: (t) => !t.tags.includes(directions.DOWN),
					[directions.LEFT]: (t) =>
						!t.tags.includes(directions.RIGHT),
					[directions.RIGHT]: (t) =>
						!t.tags.includes(directions.LEFT),
					[directions.DOWN]: (t) =>
						check(t) && t.tags.includes(directions.UP),
				}).build()
			)
	);
}

import Tile from '../Tile';
import checkRelatives, { createRotations } from '../TilePositionChecker';

export default function createLTiles({
	identifier,
	color = undefined,
	check = () => true,
	weights = [1, 1],
}) {
	return createRotations(
		[0, 1],
		({ rotation, directions, index }) =>
			new Tile(
				{
					texture: 'images/l.png',
					tags: [directions.DOWN, directions.UP, identifier],
					rotation: 90 * rotation,
					color,
					weight: weights[index],
				},
				...checkRelatives({
					[directions.UP]: (t) =>
						check(t) && t.tags.includes(directions.DOWN),
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

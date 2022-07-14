import Tile from '../Tile';
import checkRelatives, { createRotations } from '../TilePositionChecker';

export default function createTeeTiles({
	identifier,
	color = undefined,
	check = () => true,
	texture = 'images/t.png',
	weights = [1, 1, 1, 1],
}) {
	return createRotations(
		[0, 1, 2, 3],
		({ rotation, directions, index }) =>
			new Tile(
				{
					texture,
					tags: [
						directions.DOWN,
						directions.LEFT,
						directions.RIGHT,
						identifier,
					],
					rotation: 90 * rotation,
					color,
					weight: weights[index],
				},
				...checkRelatives({
					[directions.UP]: (t) => !t.tags.includes(directions.DOWN),
					[directions.LEFT]: (t) =>
						check(t) && t.tags.includes(directions.RIGHT),
					[directions.RIGHT]: (t) =>
						check(t) && t.tags.includes(directions.LEFT),
					[directions.DOWN]: (t) =>
						check(t) && t.tags.includes(directions.UP),
				}).build()
			)
	);
}

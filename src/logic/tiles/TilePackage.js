import createEndTiles from './EndTile';
import createJunctionTile from './JunctionTile';
import createLTiles from './LTiles';
import createRTiles from './RTiles';
import createTeeTiles from './TeeTile';

export default function createTilePackage({
	identifier,
	color = undefined,
	check = () => true,
	weights = {},
}) {
	return [
		...createLTiles({ identifier, color, check, weights: weights?.l }),
		createJunctionTile({
			identifier,
			color,
			check,
			texture: 'images/j2.png',
			weights: weights?.j,
		}),
		...createEndTiles({
			identifier,
			color,
			check,
			weights: weights?.e,
		}),
		...createTeeTiles({
			identifier,
			color,
			check,
			texture: 'images/t.png',
			weights: weights?.t,
		}),
		...createRTiles({
			identifier,
			color,
			check,
			texture: 'images/r.png',
			weights: weights?.r,
		}),
	];
}

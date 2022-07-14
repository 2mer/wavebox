import createEndTiles from './EndTile';
import createJunctionTile from './JunctionTile';
import createLTiles from './LTiles';
import createRTiles from './RTiles';
import createTeeTiles from './TeeTile';

export default function createRoundTilePackage({
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
			texture: 'images/cross.png',
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
			texture: 'images/t2.png',
			weights: weights?.t,
		}),
		...createRTiles({
			identifier,
			color,
			check,
			texture: 'images/r2.png',
			weights: weights?.r,
		}),
	];
}

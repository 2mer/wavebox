import BlankTile from './tiles/impl/BlankTile';
import CornerTile from './tiles/impl/CornerTile';
import EndTile from './tiles/impl/EndTile';
import JunctionTile from './tiles/impl/JunctionTile';
import LineTile from './tiles/impl/LineTile';
import TSectionTile from './tiles/impl/TSectionTile';
import { flatten } from 'lodash';

const palette = [0xe5ffde, 0xed6a5a, 0x9590a8];

const TileRegistry = [
	new BlankTile(),
	...flatten(
		palette.map((color) => [
			new JunctionTile({ color, identifier: color }),
			...[0, 1, 2, 3].map(
				(rotation) =>
					new TSectionTile({ rotation, color, identifier: color })
			),
			...[0, 1, 2, 3].map(
				(rotation) =>
					new EndTile({ rotation, color, identifier: color })
			),
			...[0, 1, 2, 3].map(
				(rotation) =>
					new CornerTile({ rotation, color, identifier: color })
			),
			...[0, 1].map(
				(rotation) =>
					new LineTile({
						rotation,
						weight: 10,
						color,
						identifier: color,
					})
			),
		])
	),
];

export default TileRegistry;

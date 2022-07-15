import BlankTile from './tiles/probabilities/BlankTile';
import CornerTile from './tiles/probabilities/CornerTile';
import EndTile from './tiles/probabilities/EndTile';
import JunctionTile from './tiles/probabilities/JunctionTile';
import LineTile from './tiles/probabilities/LineTile';
import TSectionTile from './tiles/probabilities/TSectionTile';
import { flatten } from 'lodash';

const palette = [0xe5ffde, 0xed6a5a, 0x9590a8];

const TileRegistry = {
	default: [
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
	],

	round: [
		new BlankTile({ weight: 40 }),
		...flatten(
			palette.map((color) => [
				new JunctionTile({
					color,
					identifier: color,
					texture: 'images/cross.png',
				}),
				...[0, 1, 2, 3].map(
					(rotation) =>
						new TSectionTile({
							rotation,
							color,
							identifier: color,
							texture: 'images/t2.png',
						})
				),
				...[0, 1, 2, 3].map(
					(rotation) =>
						new EndTile({ rotation, color, identifier: color })
				),
				...[0, 1, 2, 3].map(
					(rotation) =>
						new CornerTile({
							rotation,
							color,
							identifier: color,
							texture: 'images/r2.png',
						})
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
	],
};

export default TileRegistry;

import { Matrix2D } from '@sgty/tsunami';
import { Graphics } from 'pixi.js';
import TileRegistry from '../../logic/TileRegistry';
import PixiTile from '../../logic/tiles/PixiTile';

export default function createTilemap({
	container,
	debug = true,
	size = 8,
	onClick = () => {},
	preset = 'default',
}) {
	const tileMap = new Matrix2D({
		width: 10,
		height: 10,
		createTile: (position, formation) => {
			const tile = new PixiTile(position, { container, size, onClick });

			tile.probabilities = [...formation.probabilities];

			return tile;
		},
		probabilities: TileRegistry[preset],
	});

	const g = new Graphics();

	const lineSize = size / 2;

	container.addChild(g);

	tileMap.drawBounds = () => {
		g.clear();
		g.lineStyle({ width: lineSize, alpha: 1, color: 0xed6a5a });
		g.drawRect(
			tileMap.topLeft.x * size - lineSize / 2,
			tileMap.topLeft.y * size - lineSize / 2,
			size * tileMap.width + lineSize,
			size * tileMap.height + lineSize
		);
	};

	tileMap.drawBounds();

	if (debug) {
		window.tileMap = tileMap;
	}

	return tileMap;
}

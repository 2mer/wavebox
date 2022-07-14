import { Matrix2D } from '@sgty/tsunami';
import { Graphics } from 'pixi.js';
import TileRegistry from '../logic/TileRegistry';
import PixiTile from '../logic/tiles/PixiTile';

export default function createTilemap({ container, debug = true, size = 8 }) {
	const tileMap = new Matrix2D({
		width: 100,
		height: 100,
		createTile: (position) => {
			const tile = new PixiTile(position, { container, size });

			tile.probabilities = [...TileRegistry];

			return tile;
		},
		probabilities: TileRegistry,
	});

	if (debug) {
		const g = new Graphics();

		const lineSize = size / 2;

		g.lineStyle({ width: lineSize, alpha: 1, color: 0xed6a5a });
		g.drawRect(
			-lineSize / 2,
			-lineSize / 2,
			size * tileMap.width + lineSize,
			size * tileMap.height + lineSize
		);

		container.addChild(g);

		window.tileMap = tileMap;
	}

	return tileMap;
}

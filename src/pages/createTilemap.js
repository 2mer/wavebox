import { Container } from 'pixi.js';
import PixiTilemap from '../components/WaveCanvas/PixiTilemap';
import MatrixFormation2D from '../logic/data/MatrixFormation2D';
import TiledMap from '../logic/TiledMap2D';
import TileRegistry from '../logic/TileRegistry';
import PixiTile from './PixiTile';

export default function createTilemap() {
	const tileMap = new TiledMap(
		new MatrixFormation2D(100, 100).fill(
			(x, y) => new PixiTile({ x, y }, TileRegistry)
		)
	);

	const container = new Container();

	const pixiTilemap = new PixiTilemap({ tileMap, container, size: 8 });
	window.tileMap = pixiTilemap;

	return pixiTilemap;
}

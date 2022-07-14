import MatrixFormation from './MatrixFormation';

export default class MatrixFormation2D extends MatrixFormation {
	getRecalcItems(tile) {
		return [
			this.get(tile.position.x - 1, tile.position.y),
			this.get(tile.position.x, tile.position.y - 1),
			this.get(tile.position.x + 1, tile.position.y),
			this.get(tile.position.x, tile.position.y + 1),
		].filter(Boolean);
	}
}

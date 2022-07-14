import checkRelatives from '../checkRelatives';
import PixiTileProbability from '../PixiTileProbability';

export const BLANK_TILE = Symbol('BLANK_TILE');

export default class BlankTile extends PixiTileProbability {
	constructor(opts) {
		super(opts);

		this.tags.setTags(BLANK_TILE);
	}

	isProbable(ctx) {
		return checkRelatives(ctx, this.local, {
			DOWN: (tags) => !tags.includes(this.local.UP),
			UP: (tags) => !tags.includes(this.local.DOWN),
			LEFT: (tags) => !tags.includes(this.local.RIGHT),
			RIGHT: (tags) => !tags.includes(this.local.LEFT),
		});
	}
}

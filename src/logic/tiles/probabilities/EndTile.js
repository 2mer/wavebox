import checkRelatives from '../checkRelatives';
import PixiTileProbability from '../PixiTileProbability';

export default class EndTile extends PixiTileProbability {
	identifier;

	constructor({
		texture = 'images/e.png',
		identifier = undefined,
		...rest
	} = {}) {
		super({ ...rest, texture });

		this.identifier = identifier;

		this.tags.setTags(this.local.DOWN, identifier);
	}

	isProbable(ctx) {
		return checkRelatives(ctx, this.local, {
			DOWN: (tags) => tags.includes(this.local.UP, this.identifier),
			UP: (tags) => !tags.includes(this.local.DOWN),
			LEFT: (tags) => !tags.includes(this.local.RIGHT),
			RIGHT: (tags) => !tags.includes(this.local.LEFT),
		});
	}
}

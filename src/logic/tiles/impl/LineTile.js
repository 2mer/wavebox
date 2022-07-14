import checkRelatives from '../checkRelatives';
import PixiTileProbability from '../PixiTileProbability';

export default class LineTile extends PixiTileProbability {
	identifier;

	constructor({
		texture = 'images/l.png',
		identifier = undefined,
		...rest
	} = {}) {
		super({ ...rest, texture });

		this.identifier = identifier;

		this.tags.setTags(this.local.DOWN, this.local.UP, identifier);
	}

	isProbable(ctx) {
		return checkRelatives(ctx, this.local, {
			DOWN: (tags) => tags.includes(this.local.UP, this.identifier),
			UP: (tags) => tags.includes(this.local.DOWN, this.identifier),
			LEFT: (tags) => !tags.includes(this.local.RIGHT),
			RIGHT: (tags) => !tags.includes(this.local.LEFT),
		});
	}
}

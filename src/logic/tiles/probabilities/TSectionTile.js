import checkRelatives from '../checkRelatives';
import PixiTileProbability from '../PixiTileProbability';

export default class TSectionTile extends PixiTileProbability {
	identifier;

	constructor({
		texture = 'images/t.png',
		identifier = undefined,
		...rest
	} = {}) {
		super({ ...rest, texture });

		this.identifier = identifier;

		this.tags.setTags(
			this.local.DOWN,
			this.local.LEFT,
			this.local.RIGHT,
			identifier
		);
	}

	isProbable(ctx) {
		return checkRelatives(ctx, this.local, {
			DOWN: (tags) => tags.includes(this.local.UP, this.identifier),
			UP: (tags) => !tags.includes(this.local.DOWN),
			LEFT: (tags) => tags.includes(this.local.RIGHT, this.identifier),
			RIGHT: (tags) => tags.includes(this.local.LEFT, this.identifier),
		});
	}
}

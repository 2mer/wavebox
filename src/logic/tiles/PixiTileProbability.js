import { TileProbability } from '@sgty/tsunami';
import Directions from '../Directions';
import Tags from '../../util/Tags';

export default class PixiTileProbability extends TileProbability {
	weight;
	rotation;
	texture;
	color;
	local;
	tags;

	constructor({
		weight = 1,
		rotation = 0,
		texture = 'blank',
		color = 0xffffff,
		tags = [],
	} = {}) {
		super();

		this.weight = weight;
		this.rotation = rotation;
		this.texture = texture;
		this.color = color;
		this.tags = new Tags(tags);

		this.local = Directions.rotate(rotation);
	}

	getWeight() {
		return this.weight;
	}
}

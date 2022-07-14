import _ from 'lodash';
import getWeightedArrayItem from './data/getWeightedArrayItem';

export default class TileProbability {
	probableState;
	_probabilities;
	collapsed = false;
	tile;
	position;

	constructor(position, tiles) {
		this.position = position;
		this._probabilities = [...tiles];
		this.probableState = [...tiles];
	}

	computeProbabilities(ctx) {
		if (this.collapsed) return;

		this.probableState = this._probabilities.filter((tile) =>
			tile.check(ctx)
		);
	}

	probabilities() {
		return this.probableState.length;
	}

	collapse() {
		this.collapsed = true;
		this.tile = getWeightedArrayItem(
			this.probableState,
			this.probableState.map((t) => t?.data?.weight || 1)
		);
	}
}

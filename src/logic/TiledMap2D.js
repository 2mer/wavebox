import _ from 'lodash';

export default class TiledMap {
	formation;

	constructor(formation) {
		this.formation = formation;
	}

	computeTiles(tile) {
		this.formation.getRecalcItems(tile).forEach((p) => {
			p.computeProbabilities({ tile: p, formation: this.formation });
		});
	}

	collapseTile() {
		const tilesByProbability = this.formation
			.items()
			.sort((a, b) => a.probabilities() - b.probabilities())
			.filter((t) => t.probabilities() && !t.collapsed);

		if (tilesByProbability.length) {
			const firstTileProbabilities =
				tilesByProbability[0].probabilities();

			const firstGradeProbabilities = tilesByProbability.filter(
				(t) => t.probabilities() === firstTileProbabilities
			);

			const tileProbability = _.sample(firstGradeProbabilities);

			tileProbability.collapse();

			this.computeTiles(tileProbability);

			return true;
		}

		return false;
	}
}

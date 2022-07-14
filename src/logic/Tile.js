export default class Tile {
	data;
	checks;

	constructor(data, ...checks) {
		this.data = data;
		this.checks = checks;
	}

	clone() {
		return new Tile(this.color, this.checks);
	}

	check(ctx) {
		return this.checks.every((c) => c(ctx));
	}
}

import { Graphics } from 'pixi.js';

export default class PixiTilemap {
	container;
	size;
	tileMap;
	highlighted = [];

	constructor({ container, tileMap, size = 2, debug = false }) {
		this.container = container;
		this.size = size;
		this.tileMap = tileMap;

		this.tileMap.formation.items().forEach((i) => {
			i.container = this.container;
			i.size = size;
		});

		if (debug) {
			const g = new Graphics();

			g.lineStyle({ width: 1, alpha: 1, color: 0x0000ff });
			g.drawRect(
				0,
				0,
				this.size * this.tileMap.formation.bounds[0],
				this.size * this.tileMap.formation.bounds[1]
			);

			this.container.addChild(g);
		}
	}

	collapseTile() {
		return this.tileMap.collapseTile();
	}

	collapseTiles(amt = 100) {
		for (let i = 0; i < amt; i++) {
			const ret = this.tileMap.collapseTile();

			if (!ret) return;
		}
	}

	collapseAll(step = 10) {
		const timeout = setInterval(() => {
			let ret = true;
			for (let i = 0; i < step; i++) {
				ret = ret && this.tileMap.collapseTile();
			}

			if (!ret) {
				clearTimeout(timeout);
			}
		});

		return () => {
			clearTimeout(timeout);
		};
	}

	collapseDelayed() {}

	destroy() {
		this.graphics.forEach((g) => g && g.destroy());
	}

	highlight(discriminator, tint = 0xffaa00) {
		this.highlighted.forEach((t) => {
			if (t.graphics) {
				t.graphics.tint = t?.data?.color || 0xffffff;
			}
		});

		this.highlighted = this.tileMap.formation.items().filter(discriminator);

		this.highlighted.forEach((t) => {
			if (t.graphics) {
				t.graphics.tint = tint;
			}
		});
	}
}

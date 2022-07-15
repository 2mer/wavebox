import { Tile } from '@sgty/tsunami';
import { Loader, Sprite, Texture } from 'pixi.js';
import Directions from '../Directions';

export default class PixiTile extends Tile {
	size = 40;
	container;
	onClick;

	graphics;

	constructor(position, { container, size = 40, onClick = (tile) => {} }) {
		super(position);

		this.container = container;
		this.size = size;
		this.onClick = onClick;
	}

	collapse(ctx) {
		if (this.lastCalc !== ctx.cid) {
			this.calcProbabilities(ctx);
		}

		ctx.invalidations.push(
			...[
				Directions.DOWN,
				Directions.LEFT,
				Directions.RIGHT,
				Directions.UP,
			]
				.map((dir) => ctx.formation.get(ctx.item.position.add(dir)))
				.filter(Boolean)
		);

		super.collapse(ctx);

		if (this.graphics) {
			this.container.removeChild(this.graphics);
			this.graphics.destroy();
		}

		this.render();
	}

	calcProbabilities(ctx) {
		super.calcProbabilities(ctx);

		if (!this.collapsed) {
			if (!this.graphics) {
				this.render();
			}
			const prob = this.probabilities.length;
			this.graphics.alpha =
				0.25 + (prob / ctx.formation.probabilities.length) * 0.5;
		}
	}

	render() {
		if (this.collapsed) {
			const tex = this.collapsed.texture
				? this.collapsed.texture === 'blank'
					? Texture.BLANK
					: Loader.shared.resources[this.collapsed.texture].texture
				: Texture.WHITE;

			this.graphics = new Sprite(tex);
			this.graphics.anchor.set(0.5);

			this.graphics.width = this.size;
			this.graphics.height = this.size;

			this.graphics.rotation =
				this.collapsed.rotation * 90 * (Math.PI / 180);

			this.graphics.tint = this.collapsed.color;
		} else {
			this.graphics = new Sprite(
				Loader.shared.resources['images/dot.png'].texture
			);
			this.graphics.anchor.set(0.5);

			this.graphics.alpha = 0;
		}

		this.container.addChild(this.graphics);

		this.graphics.width = this.size;
		this.graphics.height = this.size;
		this.graphics.x = this.position.x * this.size + 0.5 * this.size;
		this.graphics.y = this.position.y * this.size + 0.5 * this.size;

		this.graphics.interactive = true;
		this.graphics.on('pointertap', (e) => {
			if (e.data.button === 2) {
				this.onClick(this);
				e.data.originalEvent.preventDefault();
			}
		});
	}

	destroy() {
		if (this.graphics) {
			this.graphics.destroy();
		}
	}

	checkCollapsed(predicate) {
		if (!this.collapsed) return true;

		return predicate(this.collapsed.tags);
	}
}

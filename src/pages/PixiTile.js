import TileProbability from '../logic/TileProbability';
import { Sprite, Texture, Loader } from 'pixi.js';

export default class PixiTile extends TileProbability {
	graphics;
	size = 40;
	container;

	collapse() {
		super.collapse();

		if (this.graphics) {
			this.container.removeChild(this.graphics);
			this.graphics.destroy();
		}

		this.render();
	}

	computeProbabilities(ctx) {
		super.computeProbabilities(ctx);

		if (!this.collapsed) {
			if (!this.graphics) {
				this.render();
			}
			const prob = this.probabilities();
			this.graphics.alpha = (prob / this._probabilities.length) * 0.5;
		}
	}

	render() {
		if (this.collapsed && this.tile) {
			const { color, texture, rotation } = this.tile.data;

			const tex = texture
				? texture === 'blank'
					? Texture.BLANK
					: Loader.shared.resources[texture].texture
				: Texture.WHITE;

			this.graphics = new Sprite(tex);
			this.graphics.anchor.set(0.5);

			this.graphics.width = this.size;
			this.graphics.height = this.size;

			if (rotation) {
				this.graphics.rotation = rotation * (Math.PI / 180);
			}

			if (color) {
				this.graphics.tint = color;
			}
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
		this.graphics.on('pointerdown', () => console.log(this));
	}
}

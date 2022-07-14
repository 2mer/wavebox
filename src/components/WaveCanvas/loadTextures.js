import { Loader, settings, SCALE_MODES } from 'pixi.js';

export default function loadTextures() {
	settings.SCALE_MODE = SCALE_MODES.NEAREST;

	Loader.shared.add('images/t.png');
	Loader.shared.add('images/t2.png');
	Loader.shared.add('images/j.png');
	Loader.shared.add('images/j2.png');
	Loader.shared.add('images/l.png');
	Loader.shared.add('images/r.png');
	Loader.shared.add('images/r2.png');
	Loader.shared.add('images/cross.png');
	Loader.shared.add('images/e.png');
	Loader.shared.add('images/dot.png');

	Loader.shared.load();
}

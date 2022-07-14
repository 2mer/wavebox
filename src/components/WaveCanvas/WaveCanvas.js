import { Application, Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import loadTextures from './loadTextures';
import { Viewport } from 'pixi-viewport';
import { useHotkeys } from '@mantine/hooks';
import createTilemap from './createTilemap';

const WaveCanvas = () => {
	const ref = useRef();
	const tileMapRef = useRef();
	const cleanup = useRef();
	useHotkeys([
		[
			'space',
			() => {
				if (cleanup.current) {
					cleanup.current();
					cleanup.current = null;
				} else {
					cleanup.current = tileMapRef?.current?.collapseAll({
						step: 10,
					});
				}
			},
		],
	]);

	useEffect(() => {
		const mountEl = ref.current;

		const app = new Application({
			resizeTo: mountEl,
			backgroundColor: 0x3a405a,
		});

		const TILE_SIZE = 8;

		const container = new Container();

		const tileMap = createTilemap({ container, size: TILE_SIZE });
		tileMapRef.current = tileMap;

		const WORLD_WIDTH = TILE_SIZE * tileMap.width;
		const WORLD_HEIGHT = TILE_SIZE * tileMap.height;

		const viewport = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: WORLD_WIDTH,
			worldHeight: WORLD_HEIGHT,

			interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		});

		loadTextures();

		app.stage.addChild(viewport);

		viewport.addChild(container);

		viewport.drag().pinch().wheel().decelerate();

		mountEl.appendChild(app.view);

		viewport.moveCenter(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
		viewport.fit(WORLD_WIDTH, WORLD_HEIGHT);

		return () => {
			mountEl.removeChild(app.view);
			tileMap.getItems().forEach((item) => item.destroy());
		};
	}, [ref]);

	return (
		<div
			ref={ref}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
			}}
		/>
	);
};

export default WaveCanvas;

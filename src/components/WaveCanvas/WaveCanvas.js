import { Application } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import loadTextures from './loadTextures';
import { Viewport } from 'pixi-viewport';
import { useHotkeys } from '@mantine/hooks';

const WaveCanvas = ({ pixiTilemap }) => {
	const ref = useRef();
	const tileMap = useRef();
	const cleanup = useRef();
	useHotkeys([
		[
			'space',
			() => {
				if (cleanup.current) {
					cleanup.current();
					cleanup.current = null;
				} else {
					console.log(pixiTilemap);
					cleanup.current = pixiTilemap?.collapseAll();
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

		const WORLD_WIDTH =
			pixiTilemap.size * pixiTilemap.tileMap.formation.bounds[0];
		const WORLD_HEIGHT =
			pixiTilemap.size * pixiTilemap.tileMap.formation.bounds[0];

		const viewport = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: WORLD_WIDTH,
			worldHeight: WORLD_HEIGHT,

			interaction: app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		});

		loadTextures();

		app.stage.addChild(viewport);

		viewport.addChild(pixiTilemap.container);

		viewport.drag().pinch().wheel().decelerate();

		mountEl.appendChild(app.view);

		viewport.moveCenter(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
		viewport.fit(WORLD_WIDTH, WORLD_HEIGHT);

		tileMap.current = pixiTilemap;

		return () => {
			mountEl.removeChild(app.view);
			pixiTilemap.destroy();
		};
	}, [ref, pixiTilemap]);

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

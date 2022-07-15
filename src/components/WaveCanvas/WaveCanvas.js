import { Application, Container } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import loadTextures from './loadTextures';
import { Viewport } from 'pixi-viewport';
import { useHotkeys } from '@mantine/hooks';
import {
	Box,
	Paper,
	ActionIcon,
	Tooltip,
	Group,
	Text,
	Kbd,
	Menu,
	SegmentedControl,
} from '@mantine/core';
import createTilemap from './createTilemap';
import { PlayerPause, PlayerPlay, BoxMargin, Gauge } from 'tabler-icons-react';
import TileDrawer from './TileDrawer';

const WaveCanvas = () => {
	const ref = useRef();
	const tileMapRef = useRef();
	const cleanup = useRef();

	const [playing, setPlaying] = useState(false);
	const [stepSpeed, setStepSpeed] = useState(1);
	const [selectedTile, setSelectedTile] = useState(null);

	const expandCanvas = useCallback(() => {
		tileMapRef?.current.expand({
			top: 10,
			left: 10,
			bottom: 10,
			right: 10,
		});
		tileMapRef?.current.drawBounds();
	}, []);

	const togglePlay = useCallback(() => {
		if (cleanup.current) {
			cleanup.current();
			cleanup.current = null;
			setPlaying(false);
		} else {
			const collapseSettings = {
				step: stepSpeed,
				onComplete: () => {
					// setPlaying(false);
					expandCanvas();
					cleanup.current =
						tileMapRef?.current.collapseAll(collapseSettings);
				},
			};

			cleanup.current =
				tileMapRef?.current?.collapseAll(collapseSettings);
			setPlaying(true);
		}
	}, [stepSpeed]);

	useEffect(() => {
		if (playing) {
			togglePlay();
			togglePlay();
		}
	}, [stepSpeed]);

	useHotkeys([
		['space', togglePlay],
		['e', expandCanvas],
	]);

	useEffect(() => {
		const mountEl = ref.current;

		const app = new Application({
			resizeTo: mountEl,
			backgroundColor: 0x3a405a,
		});

		const TILE_SIZE = 8;

		const container = new Container();

		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop),
		});

		const tileMap = createTilemap({
			container,
			size: TILE_SIZE,
			onClick: setSelectedTile,
			preset: params.preset || 'default',
		});
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
		<>
			<div
				ref={ref}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
				onContextMenu={(e) => {
					e.preventDefault();
				}}
			/>

			{/* controls */}
			<Box
				sx={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					display: 'flex',
					padding: '1rem',
					justifyContent: 'center',
					pointerEvents: 'none',
				}}
			>
				<Paper sx={{ pointerEvents: 'all' }}>
					<Group noWrap p='md'>
						{/* play button */}
						<Tooltip
							label={
								<Group noWrap>
									<Text>{playing ? 'Pause' : 'Play'}</Text>
									<Kbd>space</Kbd>
								</Group>
							}
						>
							<ActionIcon
								color={playing ? 'orange' : 'green'}
								onClick={togglePlay}
							>
								{playing ? <PlayerPause /> : <PlayerPlay />}
							</ActionIcon>
						</Tooltip>

						{/* expand canvas */}
						<Tooltip
							label={
								<Group noWrap>
									<Text>Expand Canvas</Text>
									<Kbd>E</Kbd>
								</Group>
							}
						>
							<ActionIcon onClick={expandCanvas}>
								<BoxMargin />
							</ActionIcon>
						</Tooltip>

						{/* menu */}
						<Menu trigger='hover' size='xl'>
							<Menu.Label>Settings</Menu.Label>
							{/* <Menu.Item icon={<Gauge size={14} />}> */}
							<Group noWrap p='md' spacing='xs'>
								<Gauge size={14} />
								<Text>Speed</Text>
								<SegmentedControl
									value={stepSpeed}
									onChange={setStepSpeed}
									data={[
										{ label: 'x1', value: 1 },
										{ label: 'x10', value: 10 },
										{ label: 'x50', value: 50 },
										{ label: 'x100', value: 100 },
									]}
								/>
							</Group>
							{/* </Menu.Item> */}
						</Menu>
					</Group>
				</Paper>
			</Box>

			<TileDrawer
				tile={selectedTile}
				onClose={() => setSelectedTile(null)}
			/>
		</>
	);
};

export default WaveCanvas;

import React from 'react';
import WaveCanvas from '../components/WaveCanvas/WaveCanvas';
import createTilemap from './createTilemap';

const tileMap = createTilemap();

export default function MainPage() {
	return <WaveCanvas pixiTilemap={tileMap} />;
}

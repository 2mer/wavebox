import React from 'react';
import { Image, Tooltip, Box, RingProgress } from '@mantine/core';

function toColor(num) {
	num >>>= 0;
	var b = num & 0xff,
		g = (num & 0xff00) >>> 8,
		r = (num & 0xff0000) >>> 16;
	return 'rgba(' + [r, g, b, 255].join(',') + ')';
}

export default function TileImage({ tile, totalWeight }) {
	return (
		<Box sx={{ position: 'relative' }}>
			<Tooltip label={`weight: ${tile?.getWeight()}`}>
				<Image
					src={tile.texture === 'blank' ? null : tile.texture}
					withPlaceholder
					placeholder={<></>}
					width='50px'
					height='50px'
					sx={{
						backgroundColor: '#3a405a',
						imageRendering: 'pixelated',
						border: `10px solid ${toColor(tile.color)}`,
						borderRadius: '12px',
						transform: `rotate(${tile.rotation * 90}deg)`,
						boxShadow: `0 0 0 2px #3a405a`,
					}}
				/>
			</Tooltip>
			{totalWeight && (
				<Box
					sx={{
						position: 'absolute',
						bottom: '-2px',
						right: '-6px',
					}}
				>
					<RingProgress
						sections={[
							{
								value: (tile.getWeight() / totalWeight) * 100,
								color: 'blue',
							},
						]}
						size={40}
					/>
				</Box>
			)}
		</Box>
	);
}

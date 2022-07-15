import { Drawer, Stack, Text, Group, Alert } from '@mantine/core';
import React from 'react';
import TileImage from './TileImage';

export default function TileDrawer({ tile, onClose }) {
	const totalWeight =
		tile &&
		tile.probabilities
			.map((p) => p.getWeight())
			.reduce((acc, curr) => acc + curr, 0);

	return (
		<Drawer
			opened={Boolean(tile)}
			onClose={onClose}
			title='Selected Tile'
			padding='xl'
			size='xl'
			position='right'
		>
			{tile && (
				<>
					<Group noWrap>
						<Text>Position</Text>
						<Text>{`[${tile.position.x}, ${tile.position.y}]`}</Text>
					</Group>
					{tile.collapsed ? (
						<Stack>collapsed!</Stack>
					) : (
						<Stack>
							<Text>Probabilities:</Text>
							<Group>
								{!tile.probabilities.length && (
									<Alert title='No probabilities' color='red'>
										No tile fits this slot :(
									</Alert>
								)}
								{tile.probabilities.map((p, index) => (
									<TileImage
										key={index}
										tile={p}
										totalWeight={totalWeight}
									/>
								))}
							</Group>
						</Stack>
					)}
				</>
			)}
		</Drawer>
	);
}

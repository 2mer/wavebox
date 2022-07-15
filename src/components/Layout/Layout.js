import { Group, Box, Title, Image, Text } from '@mantine/core';
import React from 'react';

export default function Layout({ children }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<Group noWrap align='center' p='sm'>
				<Image src='singularity.svg' width='30px' />

				<Title order={2}>Wavebox</Title>

				<Text component='a' href='?preset=default'>
					normal
				</Text>
				<Text component='a' href='?preset=round'>
					round
				</Text>
			</Group>
			<Box sx={{ flex: 1, position: 'relative' }}>{children}</Box>
		</Box>
	);
}

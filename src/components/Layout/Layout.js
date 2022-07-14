import { Group, Box, Text, Title, Image } from '@mantine/core';
import React from 'react';

export default function Layout({ children }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			<Group noWrap align='center' p='sm'>
				<Image src='singularity.svg' width='30px' />

				<Title order={2}>Wavebox</Title>
			</Group>
			<Box sx={{ flex: 1, position: 'relative' }}>{children}</Box>
		</Box>
	);
}

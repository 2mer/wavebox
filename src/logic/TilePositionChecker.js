const offsets = {
	DOWN: [0, 1],
	UP: [0, -1],
	LEFT: [-1, 0],
	RIGHT: [1, 0],
};

const dirOrder = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

export default function checkRelatives(dirs) {
	const createRet = (dirs) => {
		return {
			build: () => {
				return Object.entries(dirs).map(([k, predicate]) => {
					const dirIndex = dirOrder.indexOf(k);

					const dir = dirOrder[dirIndex];
					const offset = offsets[dir];

					return ({ tile, formation }) => {
						const belowProbabilities = formation.get(
							tile.position.x + offset[0],
							tile.position.y + offset[1]
						);

						if (!belowProbabilities) return true;

						const data = belowProbabilities?.tile?.data;

						if (!data) {
							return true;
							// if (!belowProbabilities.length) {
							// 	return predicate({ tags: [] });
							// }

							// return belowProbabilities.probableState.some(
							// 	(t) => t?.data && predicate(t.data)
							// );
						}

						if (typeof predicate === 'function')
							return predicate(data);

						return data === predicate;
					};
				});
			},
		};
	};

	return createRet(dirs);
}

function getDirOffset(index) {
	return dirOrder[index % dirOrder.length];
}

export function createRotations(rotations, creator) {
	return rotations.map((r, index) => {
		const directions = {};

		dirOrder.forEach((dir, index) => {
			directions[dir] = getDirOffset(index + r);
		});

		return creator({ rotation: r, directions, index });
	});
}

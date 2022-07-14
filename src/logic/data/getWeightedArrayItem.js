export default function getWeightedArrayItem(array, weights) {
	weights.forEach((_, i) => {
		weights[i] += weights[i - 1] || 0;
	});

	const rand = Math.random() * weights[weights.length - 1];

	return array[weights.findIndex((w) => w >= rand)];
}

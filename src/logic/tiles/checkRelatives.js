export default function checkRelatives(ctx, directions, checks) {
	return Object.entries(checks).every(([dir, check]) => {
		const localDir = directions[dir];

		return ctx.formation.tileMissingOrCheck(
			ctx.item.position.add(localDir),
			(tile) => tile.checkCollapsed(check)
		);
	});
}

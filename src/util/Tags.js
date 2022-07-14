export default class Tags {
	tags;

	constructor(tags = []) {
		this.tags = tags.filter(Boolean);
	}

	setTags(...tags) {
		this.tags = tags.filter(Boolean);
	}

	includes(...tags) {
		return tags.filter(Boolean).every((t) => {
			if (Array.isArray(t)) {
				return t.some((tt) => this.tags.includes(tt));
			}

			return this.tags.includes(t);
		});
	}

	check(predicate) {
		return predicate(this.tags);
	}
}

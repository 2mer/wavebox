import Formation from './Formation';

export default class MatrixFormation extends Formation {
	bounds;
	_items = [];
	matrix;

	constructor(...bounds) {
		super();
		this.bounds = bounds;
		this.fill(undefined);
	}

	items() {
		return this._items;
	}

	fill(value) {
		const createArray = (dimensions, position = []) => {
			const [currentDim, ...restDims] = dimensions;

			if (restDims.length === 0) {
				return Array.from({ length: currentDim }, (_, index) => {
					const val =
						typeof value === 'function'
							? value(...[...position, index])
							: value;

					this._items.push(val);
					return val;
				});
			}

			return Array.from({ length: currentDim }, (_, index) =>
				createArray(restDims, [...position, index])
			);
		};

		this._items.length = 0;
		this.matrix = createArray(this.bounds);

		return this;
	}

	get(...position) {
		let ret = this.matrix;
		let p;

		while ((p = position.shift()) !== undefined) {
			ret = ret?.[p];

			if (!ret) return undefined;
		}

		return ret;
	}
}

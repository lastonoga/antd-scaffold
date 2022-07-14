export class Accessor {

	static name() {
		return this.name;
	}

	constructor(config) {
		this.config = config
	}

	getAtomKeys() {
		return [];
	}

	get(ctx, originValue) {
		return null;
	}

}
export class Mutator {

	static name() {
		return this.name;
	}

	constructor(config) {
		this.config = config
	}

	getAtomKeys() {
		return [];
	}

	set(ctx) {
		return null;
	}

}
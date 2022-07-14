export class Accessor {

	static name() {
		return this.name;
	}

	constructor(config) {
		this.config = config
	}

	getAtoms() {
		return [];
	}

	get(ctx) {
		return null;
	}

}
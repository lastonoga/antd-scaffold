export class Adapter {

	static getName() {
		return this.name;
	}

	constructor(config) {
		this.config = config
	}

	getAtoms() {
		return []
	}

	getAtomKeys() {
		return this.getAtoms().map(a => a.key);
	}

	component(ctx) {
	}
}
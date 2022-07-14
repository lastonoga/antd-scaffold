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

	/**
	 * State deps for particualr adapter 
	 */
	getAtomKeys() {
		return this.getAtoms().map(a => a.key);
	}

	component(ctx) {
	}
}
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
}
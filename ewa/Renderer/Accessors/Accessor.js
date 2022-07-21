import { Contextable } from "../Contextable";

export class Accessor extends Contextable {

	static name() {
		return this.name;
	}

	constructor(config) {
		super()
		this.config = config
	}

	getAtomKeys() {
		return [];
	}

	get(ctx) {
		return null;
	}

}
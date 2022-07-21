import { Contextable } from "../Contextable";

export class Mutator extends Contextable {

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

	set(ctx, originValue) {
		return null;
	}

}
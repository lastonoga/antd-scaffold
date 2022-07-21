import { Contextable } from "../Contextable";

export class Adapter extends Contextable {
	
	static getName() {
		return this.name;
	}

	constructor(config) {
		super()
		this.config = config
	}

	component(ctx) {
	}
}
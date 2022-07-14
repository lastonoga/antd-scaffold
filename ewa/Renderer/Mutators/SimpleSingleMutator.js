import { Mutator } from './Mutator'

export class SimpleSingleMutator extends Mutator {

	static name() {
		return 'SimpleSingleMutator';
	}

	constructor({ dep }) {
		super()
		this.dep = dep
	}

	getAtomKeys() {
		return [this.dep];
	}
	
	set(ctx) {
		return (value) => ctx[this.dep].set(value);
	}

}
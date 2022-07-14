import { Accessor } from './Accessor'

export class SimpleSingleAccessor extends Accessor {

	static name() {
		return 'SimpleSingleAccessor';
	}

	constructor({ dep }) {
		super()
		this.dep = dep
	}

	getAtomKeys() {
		return [this.dep];
	}

	get(ctx) {
		try {
			return ctx[this.dep].get;
		} catch(err) {
			console.error(`There is no variable:${this.dep} in context`, ctx);
			return () => null;
		}
		
	}

}
import { Accessor } from './Accessor'

export class DictAccessor extends Accessor {

	static name() {
		return 'DictAccessor';
	}

	constructor({ key, dep }) {
		super()
		this.key = key
		this.dep = dep
	}

	getAtomKeys() {
		return [this.dep];
	}

	get(ctx) {
		try {
			return ctx[this.dep].get[this.key];
		} catch(err) {
			console.error(`There is no variable:${this.dep} in context`, ctx);
			return null;
		}
		
	}

}
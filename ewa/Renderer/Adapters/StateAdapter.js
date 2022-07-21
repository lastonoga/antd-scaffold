import { Adapter } from './Adapter'
import { atom } from 'recoil';
import { hasContext } from '../store'

export class StateAdapter extends Adapter {

	static name() {
		return 'StateAdapter';
	}

	constructor({ key, value }) {
		super()
		this.key = key
		this.value = value
	}

	globalContext(ctx) {
		if(!hasContext(ctx, this.key)) {
			ctx[this.key] = atom({
				key: this.key,
				default: this.value,
			});
		} else {
			console.log(`Atom key:${this.key} is already defined. Please, use unique names for dynamic variables`);
		}
	}

	localContext(ctx) {
		
	}

}
import { Adapter } from './Adapter'

export class StateAdapter extends Adapter {

	static name() {
		return 'StateAdapter';
	}

	constructor({ key, value }) {
		super()
		this.key = key
		this.value = value
	}

	getAtoms() {
		return [{
			key: this.key,
			value: this.value,
		}]
	}

}
import { Adapter } from './Adapter'

export class ApiAdapter extends Adapter {

	static name() {
		return 'ApiAdapter';
	}

	constructor({ key, deps, config }) {
		super()
		this.key = key
		this.deps = deps
		this.config = config
	}

	getAtoms() {
		return [{
			key: this.key,
			value: {
				response: null,
				loading: false,
				error: false,
			},
		}]
	}

	init() {
		return [{
			key: this.key,
			value: {
				response: null,
				loading: false,
				error: false,
			},
		}]
	}
}
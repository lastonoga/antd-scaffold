import { Accessor } from './Accessor'
import { RenderComponents } from '../tree'

export class DomAccessor extends Accessor {

	static name() {
		return 'DomAccessor';
	}

	constructor({ children }) {
		super()
		this.children = children
	}

	get(ctx) {
		return RenderComponents([0], this.children)
	}

}
import { Accessor } from './Accessor'
import { getFromContext, createState } from '../context';

export class SimpleSingleAccessor extends Accessor {

	static name() {
		return 'SimpleSingleAccessor';
	}

	constructor({ dep }) {
		super()
		this.dep = dep
	}

	localContext(globalCtx, ctx) {
		createState(ctx, this.dep, getFromContext(globalCtx, this.dep))
	}

	get(ctx) {
		return getFromContext(ctx, this.dep).getter;
	}

}
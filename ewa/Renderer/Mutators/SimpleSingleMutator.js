import { Mutator } from './Mutator'
import { useSetRecoilState } from 'recoil';
import { getFromContext, createState } from '../context';

export class SimpleSingleMutator extends Mutator {

	static name() {
		return 'SimpleSingleMutator';
	}

	constructor({ dep }) {
		super()
		this.dep = dep
	}

	localContext(globalCtx, ctx) {
		createState(ctx, this.dep, getFromContext(globalCtx, this.dep))
	}

	set(ctx) {
		return getFromContext(ctx, this.dep).setter;
	}

}
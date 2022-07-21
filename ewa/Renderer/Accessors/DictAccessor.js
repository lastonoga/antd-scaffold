import { Accessor } from './Accessor'
import { useRecoilState } from 'recoil';
import { getFromContext, addToContext, createState } from '../context';

export class DictAccessor extends Accessor {

	static name() {
		return 'DictAccessor';
	}

	constructor({ dep }) {
		super()
		this.dep = dep
	}

	get key() {
		return this.dep.split('.')[0]
	}

	extract_value(obj) {
		return this.dep.split('.').slice(1).reduce((o,i)=> o[i], obj)
	}

	localContext(globalCtx, ctx) {
		createState(ctx, this.key, getFromContext(globalCtx, this.key))
	}

	get(ctx) {
		return this.extract_value(getFromContext(ctx, this.key).getter);
	}

}
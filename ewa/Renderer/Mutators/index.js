import { SimpleSingleMutator } from './SimpleSingleMutator';

const MUTATOR_LIST = [
	SimpleSingleMutator,
]

let MUTATOR_REGISTRY = {}

export function isMutator(obj) {
	return typeof obj === 'object' && obj.__type === 'mutator';
}

export function createMutatorRegistry(force = false) {
	if(Object.keys(MUTATOR_REGISTRY).length > 0 && !force) {
		return;
	}

	for(let mutator of MUTATOR_LIST) {
		MUTATOR_REGISTRY[mutator.name()] = mutator;
	}
}

export function mutatorFactory({ name, ...config }) {
	createMutatorRegistry();

	if(!MUTATOR_REGISTRY[name]) {
		throw Error(`There is no MUTATOR:${name} registered`);
	}

	return new MUTATOR_REGISTRY[name](config);
}
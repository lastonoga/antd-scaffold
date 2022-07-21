import { EwaConfig } from '../index';

let MUTATOR_REGISTRY = {}

export function isMutator(obj) {
	return obj !== null && typeof obj === 'object' && obj.__type === 'mutator';
}

export function createMutatorRegistry(force = false) {
	if(Object.keys(MUTATOR_REGISTRY).length > 0 && !force) {
		return;
	}

	for(let mutator of EwaConfig.mutators) {
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
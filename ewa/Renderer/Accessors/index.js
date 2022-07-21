import { EwaConfig } from '../index';

let ACCESSOR_REGISTRY = {}

export function isAccessor(obj) {
	return obj !== null && typeof obj === 'object' && obj.__type === 'accessor';
}

export function createAccessorRegistry(force = false) {
	if(Object.keys(ACCESSOR_REGISTRY).length > 0 && !force) {
		return;
	}

	for(let accessor of EwaConfig.accessors) {
		ACCESSOR_REGISTRY[accessor.name()] = accessor;
	}
}

export function accessorFactory({ name, ...config }) {
	createAccessorRegistry();

	if(!ACCESSOR_REGISTRY[name]) {
		throw Error(`There is no accessor:${name} registered`);
	}

	return new ACCESSOR_REGISTRY[name](config);
}
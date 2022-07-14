import { SimpleSingleAccessor } from './SimpleSingleAccessor';

const ACCESSOR_LIST = [
	SimpleSingleAccessor,
]

let ACCESSOR_REGISTRY = {}

export function isAccessor(obj) {
	return typeof obj === 'object' && obj.__type === 'accessor';
}

export function createAccessorRegistry(force = false) {
	if(Object.keys(ACCESSOR_REGISTRY).length > 0 && !force) {
		return;
	}

	for(let accessor of ACCESSOR_LIST) {
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
import { ApiAdapter } from './ApiAdapter'
import { StateAdapter } from './StateAdapter'

const ADAPTERS_LIST = [
	ApiAdapter,
	StateAdapter,
]

let ADAPTERS_REGISTRY = {}

export function createAdapterRegistry(force = false) {
	if(Object.keys(ADAPTERS_REGISTRY).length > 0 && !force) {
		return;
	}

	for(let adapter of ADAPTERS_LIST) {
		console.log('[Adapter:new]', `${adapter.name()}`)
		ADAPTERS_REGISTRY[adapter.name()] = adapter;
	}
}

export function adapterFactory({ name, ...config }) {
	createAdapterRegistry();

	if(!ADAPTERS_REGISTRY[name]) {
		throw Error(`There is no adapter:${name} registered`);
	}

	return new ADAPTERS_REGISTRY[name](config);
}

export function runAdapters(context, component) {
	for(let adapter of (component.adapters || [])) {
		adapterFactory(adapter).component(context);
	}
}
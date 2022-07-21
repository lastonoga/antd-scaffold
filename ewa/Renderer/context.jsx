import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
	waitForAll,
    isRecoilValue,
} from 'recoil';

import { adapterFactory } from './Adapters'
import { isAccessor, accessorFactory } from './Accessors'
import { isMutator, mutatorFactory } from './Mutators'

const log = () => {}
const warn = () => {}
const error = () => {}

const console = { log, warn, error };

/**
 * Context
 * 
 * It's needed to make it customizable what and how to store
 * The overal idea is:
 * 1. Before layout is rendered we loop through Accessors, Mutators and Adapters for all tree's nodes
 * 2. Execute globalConfig function to set whatever we want to global (For now it's only atoms)
 * 3. Run Tree Renderer
 * 4. Get local context for the rendering component
 *    - Create recoild stores
 *    - Run hooks
 *    - ...
 * 5. Make component props stateful
 * 6. Render
 * 7. Go to children
 * 8. .... Repeat .....
 */

let globalContext = {}

const TYPE_ACCESSOR = 'accessor';
const TYPE_MUTATOR = 'mutator';
const TYPE_ADAPTER = 'adapter';

// Local
export function getContext(component) {
	return createLocalContext(component)
}

export function createLocalContext(component) {
	let localContext = {};

	loopDynamic(component, (type, data) => {
		getFactoryInstance(type, data).localContext(globalContext, localContext);
	});

	return localContext;
}

// Global
export function createGlobalContext(components) {
	cleanupContext(globalContext);
	loopGlobalContext(components);
	console.log('[globalContext]', globalContext);
}

export function loopGlobalContext(components) {
	return components.map((node, i) => {
		loopDynamic(node, (type, data) => {
			getFactoryInstance(type, data).globalContext(globalContext);
		});
		loopGlobalContext(node.children || []);
	});
}

// Common
export function loopDynamic(component, callback) {
	if(isAccessor(component)) {
		callback(TYPE_ACCESSOR, component);
	}

	for(let adapter of (component.adapters || [])) {
		callback(TYPE_ADAPTER, adapter);
	}

	let options = component.options || {};
	for(let key of Object.keys(options)) {
		const option = options[key];
		if(isAccessor(option)) {
			callback(TYPE_ACCESSOR, option);
		} else if(isMutator(option)) {
			callback(TYPE_MUTATOR, option);
		}
	}
	// for(let child of (component.children || [])) {
	// 	if(isAccessor(child)) {
	// 		callback(TYPE_MUTATOR, option);
	// 		console.warn('[adapter|child]', child, adapter);
	// 	}
	// }
}

export function getFactoryInstance(type, data) {
	let instance = null;
	
	if(type === TYPE_ADAPTER) {
		instance = adapterFactory(data);
	} else if(type === TYPE_ACCESSOR) {
		instance = accessorFactory(data);
	} else if(type === TYPE_MUTATOR) {
		instance = mutatorFactory(data);
	} else {
		throw new Error(`There is no ${type} defined`);
	}

	return instance
}

// Helpers
export function hasContext(ctx, key) {
	return Object.keys(ctx).includes(key);
}

export function addToContext(ctx, key, value) {
	if(!hasContext(ctx, key)) {
		ctx[key] = value;
	} else {
		// console.warn(`Can't add to context. Variable:${key} in already defined`, ctx);
	}
}

export function getFromContext(ctx, key) {
	if(!Array.isArray(ctx)) {
		ctx = [ctx];
	}

	for(let c of ctx) {
		if(hasContext(c, key)) {
			return c[key]
		}
	}

	throw new Error(`There is no variable:${key} in context`, ctx);
}

export function cleanupContext(ctx) {
	ctx = {}
}

export function createState(ctx, key, atom) {
	const [getter, setter] = useRecoilState(atom)

	addToContext(ctx, key, {
		getter,
		setter,
	})

	return [getter, setter];
}

export function createWaitingValues(ctx, key, atoms) {
	const values = useRecoilValue(waitForAll(atoms));
	addToContext(ctx, key, values)
	return values;
}
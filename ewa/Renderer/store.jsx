import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    isRecoilValue,
} from 'recoil';

import { adapterFactory } from './Adapters'
import { isAccessor, accessorFactory } from './Accessors'
import { isMutator, mutatorFactory } from './Mutators'


export let Atoms = {}

/**
 * 1. Create page atoms
 * 2. Loop tree, find states (adapters, etc)
 */
export function createAtoms(components) {
	return components.map((node, i) => {
		createAdapterAtoms(node.adapters || []);
		createAtoms(node.children || []);
	});
}

function createAdapterAtoms(adapters) {
	for (let adapter of adapters) {
		adapter = adapterFactory(adapter);
		defineAtoms(adapter.getAtoms())
	}
}

function defineAtoms(adapterAtoms) {
    for (let adapterAtom of adapterAtoms) {
        if (adapterAtom.key.includes(Atoms)) {
            throw Error(`Atom:${adapterAtom.key} has already been defined`);
        }
        Atoms[adapterAtom.key] = atom({
            key: adapterAtom.key,
            default: adapterAtom.value,
        });
    }
}


// TMP
export function makeOptionStateful(context, options = {}) {
	let statefulOptions = {
		...options,
	};
	
	for(let key in options) {
		const option = options[key];
		if(isAccessor(option)) {
			statefulOptions[key] = accessorFactory(option).get(context);
		} else if(isMutator(option)) {
			statefulOptions[key] = mutatorFactory(option).set(context);
		}
	}

	return statefulOptions;
}

function setState(states, atomKeys) {
	atomKeys = Array.isArray(atomKeys) ? atomKeys : [atomKeys];
	
	for (let key of atomKeys) {
		let [get, set] = getState(key);
		states[key] = { get, set, };
	}

	return states;
}

function getState(key) {
	if (!Object.keys(Atoms).includes(key)) {
        throw Error(`There is no state registered: ${key}`)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useRecoilState(Atoms[key]);
}

export function getContext(component) {
	let states = {}

	if(isAccessor(component)) {
		return setState(states, accessorFactory(component).getAtomKeys());
	}

	for(let adapter of (component.adapters || [])) {
		setState(states, adapterFactory(adapter).getAtoms().map(a => a.key));
	}

	let options = component.options || {};
	for(let key of Object.keys(options)) {
		const option = options[key];
		if(isAccessor(option)) {
			setState(states, accessorFactory(option).getAtomKeys());
		} else if(isMutator(option)) {
			setState(states, mutatorFactory(option).getAtomKeys());
		}
	}
    return states;
}
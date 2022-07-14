import { isAccessor, accessorFactory } from './Accessors'
import { isMutator, mutatorFactory } from './Mutators'

export function makeOptionStateful(context, options = {}) {
	let statefulOptions = {
		// ...options,
	};
	
	for(let key in options) {
		const option = options[key];
		if(isAccessor(option)) {
			statefulOptions[key] = accessorFactory(option).get(context, option);
		} else if(isMutator(option)) {
			statefulOptions[key] = mutatorFactory(option).set(context, option);
		} else {
			statefulOptions[key] = option;
		}
	}

	return statefulOptions;
}

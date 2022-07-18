import { Field } from './Field'

export class Select extends Field {
	
	constructor(defaultValue) {
		super(defaultValue);
		this.defaultValue = defaultValue
	}

} 
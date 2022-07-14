export class State {
	constructor(name, value) {
		this.name = name
		this.value = value
	}
}

export class SimpleState extends State {

	getter(ctx) {
		return ctx[this.name][0]
	}

	setter(ctx) {
		return (value) => {
			ctx[this.name][1](value)
		}
	}

}
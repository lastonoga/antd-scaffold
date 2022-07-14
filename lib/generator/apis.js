export class APIConnector {
	constructor(name, method, url, deps) {
		this.name = name
		this.method = method
		this.url = url
		this.deps = deps
	}
}

export class SimpleAPIConnector extends APIConnector {

	request(ctx) {
		let params = {}
		
		for(let dep of this.deps) {
			params[dep.name] = ctx[dep.name][0]
		}

		return fetch(this.method, this.url, {
			params,
		})
	}

	callback(ctx) {
		this.response(ctx)
	}

	response(ctx) {
		return ctx[this.name][0].response
	}

	loading(ctx) {
		return ctx[this.name][0].loading
	}

	error(ctx) {
		return ctx[this.name][0].error
	}

}
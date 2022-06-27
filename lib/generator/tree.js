export class Component {

	constructor(tag, ...args) {
		this.tag = tag;
		this.options = {}
		this.children = []

		if(args[0]) {
			if(Array.isArray(args[0])) {
				this.children = args[0]	
			} else {
				this.options = args[0]
			}
		}

		if(args[1]) {
			if(Array.isArray(args[1])) {
				this.children = args[1]	
			} else {
				this.options = args[1]
			}
		}

    	return new Proxy(this, {
    		get(field, value) {
				console.log(field, value);
				return (a) => console.log(a)
			},
			set(field, value) {
				console.log(field, value);
				return (a) => console.log(a)
			}
		})
    }

}
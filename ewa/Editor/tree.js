export function generateAntTree(prev_index, components) {
    return components.filter(node => typeof node === 'object').map((node, i) => {
        const keys = [...prev_index, i];

        let treeNode = {
        	title: node.layer || node.component,
        	key: `${keys.join('|')}-${node.layer}-${node.component}`,
        }

        if(node.children && node.children.length > 0) {
        	treeNode.children = generateAntTree(keys, node.children || []);
        }

        return treeNode;
    })
}


export class TreeOperator {

	constructor(tree) {
		this.tree = JSON.parse(JSON.stringify(tree));
	}

	getNode(path) {
		let node = { children: this.tree }
		
		for(let i of path) {
			node = node.children[i];
		}

		return node;
	}

	moveNode(fromPath, toPath, toIndex) {
		let node = this.getNode(fromPath)

		let tmpFromPath = [...fromPath]
		let tmpToPath = [...toPath]

		let fromElementIndex = parseInt(tmpFromPath.pop())

		var isEqual = (JSON.stringify(tmpFromPath) === JSON.stringify(tmpToPath));

		if(fromElementIndex > toIndex && isEqual) {
			fromPath[fromPath.length - 1] += 1
		}

		this.insertNode(node, toPath, toIndex);
		this.removeNode(fromPath);

		return this;
	}

	removeNode(path) {
		const index = path.splice(-1, 1);
		this.getNode(path).children.splice(index, 1)

		return this;
	}

	insertNode(node, toPath, toIndex) {
		this.getNode(toPath).children.splice(toIndex, 0, node)
		console.warn(this.getNode(toPath), toIndex, node)

		return this;
	}

	appendNode(node) {
		this.insertNode(node, [], this.tree.length)
		return this;
	}

	toAnt() {
		return generateAntTree([0], this.tree)
	}

	getTree() {
		return this.tree;
	}
}
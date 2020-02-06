export const formatTreeData = ({
	package: pkg,
	dependencies
}) => {
	const children = unflatten(dependencies, pkg);

	const root = {
		name: `${pkg.name}@${pkg.version}`,
		parent: null,
		licenseInfo: {
			givenLicense: pkg.licenseInfo.givenLicense || undefined
		},
		children: [...children]
	};

	return root;
};

// create a name: node map
const unflatten = (dependencies, pkg) => {
	console.log(dependencies);

	const dependenciesArr = [];
	for (const dep in dependencies) {
		const dependency = dependencies[dep];
		if (dependency.dependencies.length > 0) {
			Object.defineProperty(
				dependency,
				'children',
				Object.getOwnPropertyDescriptor(dependency, 'dependencies')
			);
		}
		delete dependency['dependencies'];
		dependenciesArr.push(dependencies[dep]);
	}

	dependenciesArr.sort((a, b) => a.depth - b.depth)
	//reverse dependencies, reduce -> acc = prev nodes,
	// curr node=> prev nodes in dependencies? then add it
	const checkedDependencies = [`${pkg.name}@${pkg.version}`]

	let treeData = dependenciesArr
		.reverse()
		.reduce((accumulator, currentNode) => {
			// console.log(currentNode.name)
			if (currentNode.children) {
				if (currentNode.children.length > 0) {
					currentNode.children.forEach((child, i) => {
						if (checkedDependencies.indexOf(child) < 0) {
							checkedDependencies.push(child)
							currentNode.children[i] = dependencies[child];
						}
						if (accumulator.includes(dependencies[child])) {
							const index = accumulator.indexOf(dependencies[child]);
							if (index > -1) {
								accumulator.splice(index, 1);
							}
						}
					});
				}
			}
			accumulator.push(currentNode);
			return accumulator;
		}, []);
	console.log(treeData);
	return treeData;
};
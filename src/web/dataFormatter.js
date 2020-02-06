export const formatWebDataWithParents = packages => {
    const links = [];
    const nodes = [];

    for (const pkg in packages) {
        nodes.push({
            id: pkg
            // dependencies: packages[pkg].dependencies
            //   ? Object.keys(packages[pkg].dependencies).length + 1
            //   : 1
        });
        if (!packages[pkg].parent.includes('root')) {
            packages[pkg].parent.forEach((parent, i) => {
                links.push({
                    source: pkg,
                    target: `${packages[pkg].parent[i]}`
                });
            });
        }
    }
    console.log({
        nodes,
        links
    });
    // Object.keys(packages).map(pkg => {
    //   packages[pkg].parent.forEach((parent, i) => {
    //     links.push({
    //       source: pkg,
    //       target: `${packages[pkg].parent[i]}`
    //     });
    //   });
    //   return { id: pkg };
    // });
    // nodes.unshift({ id: 'root' });
    return {
        nodes,
        links
    };
};

export const formatNetworkData = data => {
    const {
        package: rootPkg,
        dependencies
    } = data;
    const links = [];
    const nodes = [];

    nodes.push({
        id: `${rootPkg.name}@${rootPkg.version}`,
        depth: 0
    });

    rootPkg.dependencies.forEach(d => links.push({
        source: `${rootPkg.name}@${rootPkg.version}`,
        target: d
    }))
    console.log(dependencies)
    for (const pkg in dependencies) {
        nodes.push({
            id: pkg,
            depth: dependencies[pkg].depth
        });
        if (dependencies[pkg].children) {
            dependencies[pkg].children.forEach((child, i) => {
                // console.log(child)
                links.push({
                    source: pkg,
                    target: child.name ? `${child.name}@${child.version}` : child
                    // target: `${dependencies[pkg].dependencies[i]}`
                });
            });
        }

    }
    console.log({
        nodes,
        links
    });

    return {
        nodes,
        links
    };
};
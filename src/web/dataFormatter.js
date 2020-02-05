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

export const formatWebDataWithChildren = data => {
    const {
        package: rootPkg,
        dependencies
    } = data;
    const links = [];
    const nodes = [];

    dependencies[`${rootPkg.name}@${rootPkg.version}`] = rootPkg;

    for (const pkg in dependencies) {
        nodes.push({
            id: pkg,
            depth: dependencies[pkg].depth
        });
        if (dependencies[pkg].dependencies) {
            dependencies[pkg].dependencies.forEach((parent, i) => {
                links.push({
                    source: pkg,
                    target: `${dependencies[pkg].dependencies[i]}`
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
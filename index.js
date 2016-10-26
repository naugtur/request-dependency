module.exports = {
    createDependencyManager(definition) {
        const moduleCache = new Map();
        return {
            register(moduleReferenceMap) {
                definition.forEach((name) => {
                    if (!moduleReferenceMap[name]) {
                        throw Error(`Required module '${name}' is missing`)
                    }
                    moduleCache.set(name, moduleReferenceMap[name])
                })
            },
            require(name) {
                if (moduleCache.size === 0) {
                    throw Error(`No modules registered`)
                }
                if (!moduleCache.has(name)) {
                    throw Error(`${name} is not available in this dependency manager`)
                }
                return moduleCache.get(name)
            }
        }
    }

}

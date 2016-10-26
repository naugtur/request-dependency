const toString = {}.toString;

const isArray = Array.isArray || function(arr) {
    return toString.call(arr) == '[object Array]';
};

module.exports = {
    createDependencyManager(definition) {
        if (typeof definition !== 'object') {
            throw Error('dependency definition must be an object with keys being required module names and values being arrays of fields/methods required on those')
        }
        const moduleCache = new Map();
        var fulfilled = false;
        return {
            register(moduleReferenceMap) {
                Object.keys(definition).forEach((name) => {
                    if (typeof moduleReferenceMap[name] === 'undefined') {
                        throw Error(`Required module '${name}' is missing`)
                    }
                    if (isArray(definition[name])) {
                        definition[name].forEach(requiredFieldName => {
                            if (typeof moduleReferenceMap[name][requiredFieldName] === 'undefined') {
                                throw Error(`Required module '${name}' is missing '${requiredFieldName}' field`)
                            }
                        })
                    }
                    moduleCache.set(name, moduleReferenceMap[name])
                })
                fulfilled = true
            },
            require(name) {
                if (!fulfilled) {
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

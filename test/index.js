const assert = require('assert')
const requestDependency = require('../index')


const dependencyManager = requestDependency.createDependencyManager({
    'name1': [],
    'name2': ['key1', 'method2'],
    'name3': 'whatevertruthy'
})

dependencyManager.register({
    name1: {},
    name2: {
        key1: null,
        method2: function() {}
    },
    name3: null
})

assert.throws(
    () => {
        dependencyManager.register({
            name2: {
                key1: null,
                method2: function() {}
            },
            name3: null
        })
    }
);

assert.throws(
    () => {
        dependencyManager.register({
            name1: {},
            name2: {
                key1: null,
                method2: function() {}
            }
        })
    }
);

assert.throws(
    () => {
        dependencyManager.register({
            name1: {},
            name2: {},
            name3: null
        })
    }
);

assert.throws(
    () => {
        dependencyManager.register({
            name1: {},
            name2: {
                method2: function() {}
            },
            name3: null
        })
    }
);

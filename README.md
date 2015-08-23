[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [<svg xmlns="http://www.w3.org/2000/svg" width="113" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="113" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h49v20H0z"/><path fill="#4c1" d="M49 0h64v20H49z"/><path fill="url(#b)" d="M0 0h113v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="24.5" y="15" fill="#010101" fill-opacity=".3">license</text><text x="24.5" y="14">license</text><text x="80" y="15" fill="#010101" fill-opacity=".3">Unlicense</text><text x="80" y="14">Unlicense</text></g></svg>](https://tldrlegal.com/license/unlicense) [<svg xmlns="http://www.w3.org/2000/svg" width="113" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="113" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h49v20H0z"/><path fill="#4c1" d="M49 0h64v20H49z"/><path fill="url(#b)" d="M0 0h113v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="24.5" y="15" fill="#010101" fill-opacity=".3">Gitter</text><text x="24.5" y="14">Gitter</text><text x="80" y="15" fill="#010101" fill-opacity=".3">Join Chat</text><text x="80" y="14">Join Chat</text></g></svg>](https://gitter.im/panchishin/geneticalgorithm)

Classic implementation of Genetic Algorithm

# *BETA*
Note : althought this code is fairly well tested, expect some of the API to change in upcoming releases.  Specifically, the call to *.evolve* is planned to move to an asynchronous and non-blocking version.

# Usage

## GeneticAlgorithm construction and configuration

### geneticalgorithm = require('geneticalgorithm')( config )
Construct an GeneticAlgorithm calculator like so:

```js
var config = {
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ /* one or more phenotypes */ ],
    populationSize: maxPopulationSize
}
var geneticalgorithm = require('geneticalgorithm')( config )
```

That creates one instance of an GeneticAlgorithm calculator which uses the initial configuration you supply.  All configuration options are optional except *population*.


[npm-url]: https://npmjs.org/package/geneticalgorithm
[npm-image]: http://img.shields.io/npm/v/geneticalgorithm.svg
[downloads-image]: http://img.shields.io/npm/dm/geneticalgorithm.svg


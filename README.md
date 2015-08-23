[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] 

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


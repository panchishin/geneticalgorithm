[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] 

Classic implementation of Genetic Algorithm

# *BETA*

[![Join the chat at https://gitter.im/panchishin/geneticalgorithm](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/panchishin/geneticalgorithm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
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


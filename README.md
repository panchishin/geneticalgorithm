
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [<svg xmlns="http://www.w3.org/2000/svg" width="113" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="113" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h49v20H0z"/><path fill="#4c1" d="M49 0h64v20H49z"/><path fill="url(#b)" d="M0 0h113v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="24.5" y="15" fill="#010101" fill-opacity=".3">license</text><text x="24.5" y="14">license</text><text x="80" y="15" fill="#010101" fill-opacity=".3">Unlicense</text><text x="80" y="14">Unlicense</text></g></svg>](https://tldrlegal.com/license/unlicense) [<svg xmlns="http://www.w3.org/2000/svg" width="113" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="113" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h49v20H0z"/><path fill="#4c1" d="M49 0h64v20H49z"/><path fill="url(#b)" d="M0 0h113v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="24.5" y="15" fill="#010101" fill-opacity=".3">Gitter</text><text x="24.5" y="14">Gitter</text><text x="80" y="15" fill="#010101" fill-opacity=".3">Join Chat</text><text x="80" y="14">Join Chat</text></g></svg>](https://gitter.im/panchishin/geneticalgorithm)

a configurable and generic implementation of the classic Genetic Algorithm

# Usage

## GeneticAlgorithm construction

### geneticalgorithm = require('geneticalgorithm')( config )
The minimal configuration for constructing an GeneticAlgorithm calculator is like so:

```js
var config = {
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ /* one or more phenotypes */ ]
}
var geneticalgorithm = require('geneticalgorithm')( config )
```

That creates one instance of an GeneticAlgorithm calculator which uses the initial configuration you supply.  All configuration options are optional except *population*.

That is all the configuration you need to get started.  You can skip the next sections on advanced configuration and jump right to [execution](#execution), [evolution](#geneticalgorithmevolve), [functions](#functions) and [examples](#example).

### complete config
Here is the complete list of configuration options

```js
var config = {
	mutationFunction : aMutationFunctionYouSupply,
	mutationProbability : aDecimal,  // defaults to 0.25 = 25%

	crossoverFunction : yourCrossoverFunction,
	crossoverProbability : aDecimal, // defaults to 0.25 = 25%

	fitnessFunction : yourFitnessFunction,
	fitnessTests : testsPerPhenotypePerEvolution, // defaults to 1

	population : [ phenotype1 , phenotype2 , ... ],
	populationSize : aNumber // defaults to 100
}
var geneticalgorithm = require('geneticalgorithm')( config )
```

### geneticalgorithm.clone( )
Create another GeneticAlgorithm calculator based off of an existing configuration.

```js
var anotherGA = geneticalgorithm.clone()
```

### geneticalgorithm.clone( config )
Create another GeneticAlgorithm calculator based off of an existing configuration and override some or all of the configuration

```js
var anotherWithLargePopulation = geneticalgorithm.clone({
	populationSize : 1000
})
```

### geneticalgorithm.config()
Get the current configuration of a GeneticAlgorithm.  All defaults will be populated.  Can be used for debugging or populating a new or clone GeneticAlgorithm.  A clone GeneticAlgorithm with 10% larger population size could be created like so:
```js
var size = geneticalgorithm.config().populationSize
var biggerGeneticAlgorithm = geneticalgorithm.config({
	populationSize = size * 1.10
})
```

## Execution

### geneticalgorithm.evolve( )
Do one generation of evolution like so
```js
geneticalgorithm.evolve( )
```
The *.evolve()* moves the calculator ahead by one generation.  Depending on the population size and the speed of the functions you provide in the configuration this coupld be quick or take some time.

### geneticalgorithm.evolve( config )
Same as *.evolve()* but change the configuration prior to running the evolution calculations.  In this example the mutationProbability is changed to 10%:
```js
geneticalgorithm.evolve( {
	mutationProbability : 0.1
} )
```

### geneticalgorithm.best()
Retrieve the Phenotype with the highest fitness score like so
```js
var best = geneticalgorithm.best()
```


## Functions
This is the specification of the configuration functions you pass to GeneticAlgorithm

### mutationFunction(phenotype)
The mutation function that you provide.  It is a synchronous function that mutates the phenotype that you provide like so:
```js
function mutationFunction (oldPhenotype) {
	var resultPhenotype = {}
	// use oldPhenotype and some random
	// function to make a change to your
	// phenotype
	return resultPhenotype
}
```

### crossoverFunction : function(PhenotypeA,PhenoTypeB)
The crossover function that you provide.  It is a synchronous function that swaps random sections between two phenotypes.  Construct it like so:
```js
function crossoverFunction(phenotypeA,phenoTypeB) {
	var result1 = {} , result2 = {}
	// use phenotypeA and B to create phenotype result 1 and 2
	return [result1,result2]
}
```

###  fitnessFunction : function(phenotype) { 0 },
```js
function fitnessFunction(phenotype) {
	var fitness = 0
	// use phenotype and possibly some other information
	// to determine the fitness number.  Higher is better, lower is worse.
	return fitness;
}
```

## Phenotype
What is a phenotype?  Any json object you want.  GeneticAlgorithm doesn't care.  Chose something that works well for your particular problem and your helper functions: mutation, crossover, and fitness.  A phenotype could be a list of numbers, a dictionary of words, or a matric of boolean values.  It must be a json object though.


# Example
If you have installed this as a npm dependency first change directory to *node_modules/geneticalgorithm/*.

## Fixed Number Array
Execute the *Fixed Number Array* example.  This example shows how to use the basic configurations.  It starts with one array of zeros.  The objective is to evolve the array of zeros to an array of 50's. Run the example using the command line like so:

```bash
# use the default of 10 numbers in the number array
node example/fixedNumberArray.js

# change the array to be 30 numbers long
node example/fixedNumberArray.js 30
```

# FAQ
**What is a phenotype?**  A phenotype is a fancy name for the thing you want to evolve.  Perhaps it is a list of numbers or a configuration file or a micro-instruction language.  The key is that it is a json object and is the thing you want to evolve.  It is just data.  If it was called 'the data' instead of phenotype then it would get confusing when we want to talk about other data besides the thing we are trying to evolve.  The name phenotype comes from evolution.  If you are interested in that sort of thing Wikipedia has a great write up.

**Why is there a fitnessFunction but not a comparePhenotypesFunction?**  Good question.  I'm looking at adding that to the configuration options and having it be asynchronous, because you may have to run a simulation possibly even on another server to resolve battling phenotypes.  Stay tuned.  If this is something you are looking for please use the Gitter link at the top to tell me about it.


# References

* [Instructor: Patrick Winston from MIT](https://www.youtube.com/watch?v=STjW3eH0Cik)
* [Wikipedia entry for Minimax](https://en.wikipedia.org/wiki/Genetic_Algorithm)


[npm-url]: https://npmjs.org/package/geneticalgorithm
[npm-image]: http://img.shields.io/npm/v/geneticalgorithm.svg
[downloads-image]: http://img.shields.io/npm/dm/geneticalgorithm.svg

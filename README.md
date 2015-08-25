[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![license][license-image]][license-url] [![Auto Test Status][travis-image]][travis-url] [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/panchishin/geneticalgorithm?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)

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
It must return a phenotype

### crossoverFunction (PhenotypeA,PhenoTypeB)
The crossover function that you provide.  It is a synchronous function that swaps random sections between two phenotypes.  Construct it like so:
```js
function crossoverFunction(phenotypeA,phenoTypeB) {
	var result1 = {} , result2 = {}
	// use phenotypeA and B to create phenotype result 1 and 2
	return [result1,result2]
}
```
It must return a list of two phenotypes.

###  fitnessFunction (phenotype)
```js
function fitnessFunction(phenotype) {
	var fitness = 0
	// use phenotype and possibly some other information
	// to determine the fitness number.  Higher is better, lower is worse.
	return fitness;
}
```
It must return a number.

## Phenotype
What is a phenotype?  Any json object you want.  GeneticAlgorithm doesn't care.  Chose something that works well for your particular problem and your helper functions: mutation, crossover, and fitness.  A phenotype could be a list of numbers, a dictionary of words, or a matric of boolean values.  It must be a json object though.


# Example
If you have installed this as a npm dependency first change directory to *node_modules/geneticalgorithm/*.

## Template
The template is a boiler plate of how to get started.  It has a dummy phenotype and all the functions stubbed out.  Execute it like so:
```
node examples/template.js 
```

## Fixed Number Array
Execute the *Fixed Number Array* example.  This example shows how to use the basic configurations.  It starts with one array of zeros.  The objective is to evolve the array of zeros to an array of 50's. Run the example using the command line like so:

```
# use the default of 10 numbers in the number array
node example/fixedNumberArray.js

# change the array to be 30 numbers long
node example/fixedNumberArray.js 30
```

## Variable Number Array
This is similar to the Fixed Number Array.  The key difference is that the number array can mutate to be longer or shorter.  It starts as the list [0,0,0].  The objective is to evolve the array to the target size with all values equal to 50.  This is a great example if you are searching for a list of values but you also don't know how long the list needs to be.  Run the example using the command line like so:
```
# use the default of 5 as the target length
node examples/variableNumberArray.js

# use 15 as the target length
node examples/variableNumberArray.js 15
```


# FAQ
**What is a phenotype?**  A phenotype is a fancy name for the thing you want to evolve.  Perhaps it is a list of numbers or a configuration file or a micro-instruction language.  The key is that it is a json object and is the thing you want to evolve.  It is just data.  If it was called 'the data' instead of phenotype then it would get confusing when we want to talk about other data besides the thing we are trying to evolve.  The name phenotype comes from evolution.  If you are interested in that sort of thing Wikipedia has a great write up.

**Why is there a fitnessFunction but not a comparePhenotypesFunction?**  Good question.  I'm looking at adding that to the configuration options and having it be asynchronous, because you may have to run a simulation possibly even on another server to resolve battling phenotypes.  Stay tuned.  If this is something you are looking for please use the Gitter link at the top to tell me about it.


# References

* [Instructor: Patrick Winston from MIT](http://www.youtube.com/v/kHyNqSnzP8Y)
* [Wikipedia entry for Minimax](https://en.wikipedia.org/wiki/Genetic_Algorithm)


[npm-url]: https://npmjs.org/package/geneticalgorithm
[npm-image]: http://img.shields.io/npm/v/geneticalgorithm.svg
[downloads-image]: http://img.shields.io/npm/dm/geneticalgorithm.svg

[travis-url]: https://travis-ci.org/panchishin/geneticalgorithm
[travis-image]: http://img.shields.io/travis/panchishin/geneticalgorithm.svg

[license-image]: https://img.shields.io/badge/license-Unlicense-green.svg
[license-url]: https://tldrlegal.com/license/unlicense


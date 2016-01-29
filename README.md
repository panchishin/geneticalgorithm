[![Issues][issues-image]][issues-url] [![Downloads][downloads-image]][downloads-url] [![Auto Test Status][travis-image]][travis-url] [![license][license-image]][license-url] [![Gitter chat][gitter-image]][gitter-url]

Genetics, aka genes, are the code of life.  Evolution is the process by which improvement is made to the genes of a population by iteratively removing less fit members of a population then replacing them with clones, mutants, and crossovers of the remaining population.  Applied in nature this accounts for all of animal and plant diversity.  Applied in a controlled way different animal and plant populations have been changed by humans to be stronger, faster, calmer, juicer, and better milk producers (just to name a few).

Genetic Algorithms are an attempt to mimic the benefits of Evolution.  This package provides the calculation framework to execute and mimic artificial evolution.  Genetic Algorithms have been used to solve many problems in Engineering and Mathmatics both for fun and profit.

Section Links : [Construction](#construction) , [Execution](#execution) , [Examples](#example) , [Phenotype](#phenotype) , [FAQ](#faq) , [Related](#related-ai-projects) , and [References](#references)

# Construction
### GeneticAlgorithm constructor
```js
var GeneticAlgorithmConstructor = require('geneticalgorithm')
var geneticalgorithm = GeneticAlgorithmConstructor( config )
```
The minimal configuration for constructing an GeneticAlgorithm calculator is like so:

```js
var config = {
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ /* one or more phenotypes */ ]
}
var GeneticAlgorithmConstructor = require('geneticalgorithm')
var geneticalgorithm = GeneticAlgorithmConstructor( config )
```

That creates one instance of an GeneticAlgorithm calculator which uses the initial configuration you supply.  All configuration options are optional except *population*.  If you don't specify a crossover function then GeneticAlgorithm will only do mutations and similarly if you don't specify the mutation function it will only do crossovers.  If you don't specify either then no evolution will happen, go figure.

That is all the configuration you need to get started.  You can skip the next sections on advanced configuration and jump right to [execution](#execution), [functions](#functions) and [examples](#example).

### complete config
Here is the complete list of configuration options

```js
var config = {

	mutationFunction : aMutationFunctionYouSupply,
	crossoverFunction : yourCrossoverFunction,

	fitnessFunction : yourFitnessFunction,
	fitnessProbability : theChanceOfATestPerPhenotypePerEvolution, // defaults to 1.00 = 100%
	fitnessTests : testsPerPhenotypePerEvolution, // defaults to 1

	population : [ phenotype1 , phenotype2 , ... ],
	populationSize : aNumber // defaults to 100

}
var GeneticAlgorithmConstructor = require('geneticalgorithm')
var geneticalgorithm = GeneticAlgorithmConstructor( config )
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

# Execution

### geneticalgorithm.evolve( )
Do one generation of evolution like so
```js
geneticalgorithm.evolve( )
```
The *.evolve()* moves the calculator ahead by one generation.  Depending on the population size and the speed of the functions you provide in the configuration this coupld be quick or take some time.
*.evolve()* changes the geneticalgorithm and also returns it.  This is for simplicity so that you could do chain calls like so
```js
geneticalgorithm.evolve().evolve().best()
```
to do two evolutions and then get the best phenoType (see *.best()* below).

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

### geneticalgorithm.bestScore()
Retrieve the score of the best Phenotype like so
```js
var best = geneticalgorithm.bestScore()
```

### geneticalgorithm.population()
Retrieve the whole population like so
```js
var phenotypeList = geneticalgorithm.population()
```

### geneticalgorithm.scoredPopulation()
Retrieve the whole population wrapped in a score object like so
```js
var scoreList = geneticalgorithm.scoredPopulation()
console.log( scoreList[0].phenotype )
console.log( scoreList[0].score )
```
The result of *.scoredPopulation* is the following data structure
```js
result = { phenotype : anItem , score : aNumber }
```

# Functions
This is the specification of the configuration functions you pass to GeneticAlgorithm

### mutationFunction(phenotype)
> Must return a phenotype

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

### crossoverFunction (PhenoTypeA,PhenoTypeB)
> Must return an array [] with 2 phenotypes

The crossover function that you provide.  It is a synchronous function that swaps random sections between two phenotypes.  Construct it like so:
```js
function crossoverFunction(phenoTypeA,phenoTypeB) {
	var result1 = {} , result2 = {}
	// use phenoTypeA and B to create phenotype result 1 and 2
	return [result1,result2]
}
```

###  fitnessFunction (phenotype)
> Must return a number

```js
function fitnessFunction(phenotype) {
	var fitness = 0
	// use phenotype and possibly some other information
	// to determine the fitness number.  Higher is better, lower is worse.
	return fitness;
}
```

# Example
If you have installed this as a npm dependency first change directory to *node_modules/geneticalgorithm/*.

### Template
The template is a boiler plate of how to get started.  It has a dummy phenotype and all the functions stubbed out.  Execute it like so:
```
node examples/template.js 
```

### Fixed Number Array
Execute the *Fixed Number Array* example.  This example shows how to use the basic configurations.  It starts with one array of zeros.  The objective is to evolve the array of zeros to an array of 50's. Run the example using the command line like so:

```
# use the default of 10 numbers in the number array
node example/fixedNumberArray.js

# change the array to be 30 numbers long
node example/fixedNumberArray.js 30
```

### Variable Number Array
This is similar to the Fixed Number Array.  The key difference is that the number array can mutate to be longer or shorter.  It starts as the list [0,0,0].  The objective is to evolve the array to the target size with all values equal to 50.  This is a great example if you are searching for a list of values but you also don't know how long the list needs to be.  Run the example using the command line like so:
```
# use the default of 5 as the target length
node examples/variableNumberArray.js

# use 15 as the target length
node examples/variableNumberArray.js 15
```

### Islands
One issue that arrises is when there are local maxima and the genetic algorithm gets stuck on it and does not explore and find the global maxima.  In this example there are 25 local maxima but only one global maxima.  One phenotype starts near the worst local maxima and after a few generations the genetic algorithm is able to find the global maxima.
```
node examples/islandHop.js
```

# Phenotype
What is a phenotype?  Any json object you want.  GeneticAlgorithm doesn't care.  Chose something that works well for your particular problem and your helper functions: mutation, crossover, and fitness.  A phenotype could be a list of numbers, a dictionary of words, or a matric of boolean values.  It must be a json object though.

# FAQ
**What is a phenotype?**  A phenotype is a fancy name for the thing you want to evolve.  Perhaps it is a list of numbers or a configuration file or a micro-instruction language.  The key is that it is a json object and is the thing you want to evolve.  It is just data.  If it was called 'the data' instead of phenotype then it would get confusing when we want to talk about other data besides the thing we are trying to evolve.  The name phenotype comes from evolution.  If you are interested in that sort of thing Wikipedia has a great write up.

**Why is there a fitnessFunction but not a comparePhenotypesFunction?**  Good question.  I'm looking at adding that to the configuration options and having it be asynchronous, because you may have to run a simulation possibly even on another server to resolve battling phenotypes.  Stay tuned.  If this is something you are looking for please use the Gitter link at the top to tell me about it.

# Related AI Projects
This is part of a set of related projects.

* [AlphaBeta](https://www.npmjs.com/package/alphabeta)
* [Boosting](https://www.npmjs.com/package/boosting)
* [GeneticAlgorithm](https://www.npmjs.com/package/geneticalgorithm)
* [NearestNeighbour](https://www.npmjs.com/package/nearestneighbour)
* [NeuralNet](https://www.npmjs.com/package/neuralnet)

# References

* [Instructor: Patrick Winston from MIT](http://www.youtube.com/v/kHyNqSnzP8Y)
* [Wikipedia entry for Minimax](https://en.wikipedia.org/wiki/Genetic_Algorithm)


[issues-url]: https://github.com/panchishin/geneticalgorithm/issues
[issues-image]: https://img.shields.io/github/issues/panchishin/geneticalgorithm.svg

[gitter-url]: https://gitter.im/panchishin/geneticalgorithm
[gitter-image]: https://badges.gitter.im/panchishin/geneticalgorithm.png

[downloads-image]: http://img.shields.io/npm/dm/geneticalgorithm.svg
[downloads-url]: https://www.npmjs.com/~panchishin

[travis-url]: https://travis-ci.org/panchishin/geneticalgorithm
[travis-image]: http://img.shields.io/travis/panchishin/geneticalgorithm.svg

[license-image]: https://img.shields.io/badge/license-Unlicense-green.svg
[license-url]: https://tldrlegal.com/license/unlicense


module.exports = function geneticAlgorithmConstructor(options) {

    var settingDefaults = {
 
        mutationFunction : function(phenotype) { return phenotype },
        mutationProbability : 0.25,
 
        crossoverFunction : function(a,b) { return [a,b] },
        crossoverProbability : 0.25,
 
        fitnessFunction : function(phenotype) { 0 },
        fitnessTests : 1,
 
        population : [],
        populationSize : 100,
    }

    function settingWithDefaults( settings , defaults ) {
        settings = settings || {}

        settings.mutationFunction = settings.mutationFunction || defaults.mutationFunction
        settings.mutationProbability = settings.mutationProbability || defaults.mutationProbability

        settings.crossoverFunction = settings.crossoverFunction || defaults.crossoverFunction
        settings.crossoverProbability = settings.crossoverProbability || defaults.crossoverProbability

        settings.fitnessFunction = settings.fitnessFunction || defaults.fitnessFunction
        settings.fitnessTests = settings.fitnessTests || defaults.fitnessTests
        if ( settings.fitnessTests <= 0 ) throw "fitnessTests must be greater than 0"

        settings.population = settings.population || defaults.population
        if ( settings.population.length <= 0 ) throw "population must be an array and contain at least 1 phenotypes"

        settings.populationSize = settings.populationSize || defaults.populationSize
        if ( settings.populationSize <= 0 ) throw "populationSize must be greater than 0"

        return settings
    }

    var settings = settingWithDefaults(options,settingDefaults)

    function populate () {
        var size = settings.population.length
        while( settings.population.length < settings.populationSize ) {
            settings.population.push( cloneJSON( settings.population[ Math.floor( Math.random() * size ) ] ))
        }
    }

    function calculateFitness () {
        for( var index in settings.population ) {
            var phenotype = settings.population[index];
            phenotype.score = settings.fitnessFunction(phenotype);
        }
    }

    function crossover () {
        var nextGeneration = []
        var children;
        for( var p = 0; p < settings.population.length - 1; p += 2 ) {
            var parent1 = settings.population[p];
            var parent2 = settings.population[p + 1];
            
            if (settings.crossoverProbability < Math.random()) {
                children = settings.crossoverFunction(parent1, parent2);
            }
            else {
                children = [ cloneJSON(parent1),cloneJSON(parent2) ]
            }
            nextGeneration.push(children[0]);
            nextGeneration.push(children[1]);
        }
        if (nextGeneration.length < settings.population.length) {
            nextGeneration.push(settings.population[settings.population.length - 1]);
        }
        settings.population = nextGeneration;
    }

    function mutate( ) {
        var nextGeneration = []
        for( var index in settings.population ) {
            if (Math.random() < settings.mutationProbability) {
                nextGeneration.push(settings.mutationFunction(settings.population[index]))
            } else {
                nextGeneration.push(cloneJSON(settings.population[index]));
            }
        }
        settings.population = nextGeneration;
    }

    function cloneJSON( object ) {
        return JSON.parse ( JSON.stringify ( object ) )
    }

    function compete( ) {
        var nextGeneration = []

        for( var p in settings.population ) {
            var phenotype = settings.population[p];
            for( var competition = 0 ; competition < settings.fitnessTests ; competition++ ) {
                var competitor = settings.population[ Math.floor(Math.random() * settings.population.length) ]
                phenotype = phenotype.score >= competitor.score ? phenotype : competitor
            }
            nextGeneration.push(phenotype)
        }

        settings.population = nextGeneration;
    }



    function randomizePopulationOrder( ) {
        for( var index in settings.population ) {
            var otherIndex = Math.floor( Math.random() * settings.population.length )
            var temp = settings.population[otherIndex]
            settings.population[otherIndex] = settings.population[index]
            settings.population[index] = temp
        }
    }

    return {
        evolve : function (options) {
            if ( options) { 
                settings = settingWithDefaults(options,settings)
            }
            populate()
            randomizePopulationOrder()
            crossover()
            mutate()
            calculateFitness()
            compete()
        },
        best : function() {
            var best = settings.population[0];
            for( var p in settings.population ) {
                if (settings.population[p] && settings.population[p].score > best.score) {
                    best = settings.population[p];
                }
            }
            return best;
        },
        population : function() {
            return settings.population;
        },
        config : function() {
            return cloneJSON( settings )
        },
        clone : function(options) {
            return geneticAlgorithmConstructor( settingWithDefaults(options,settings) )
        }
    }
}

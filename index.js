module.exports = function geneticAlgorithmConstructor(options) {

    function settingDefaults() { return {
 
        mutationFunction : function(phenotype) { return phenotype },
 
        crossoverFunction : function(a,b) { return [a,b] },
 
        fitnessFunction : function(phenotype) { return 0 },

        doesABeatBFunction : undefined,
 
        population : [],
        populationSize : 100,
    }}

    function settingWithDefaults( settings , defaults ) {
        settings = settings || {}

        settings.mutationFunction = settings.mutationFunction || defaults.mutationFunction
        settings.crossoverFunction = settings.crossoverFunction || defaults.crossoverFunction
        settings.fitnessFunction = settings.fitnessFunction || defaults.fitnessFunction

        settings.doesABeatBFunction = settings.doesABeatBFunction || defaults.doesABeatBFunction

        settings.population = settings.population || defaults.population
        if ( settings.population.length <= 0 ) throw Error("population must be an array and contain at least 1 phenotypes")

        settings.populationSize = settings.populationSize || defaults.populationSize
        if ( settings.populationSize <= 0 ) throw Error("populationSize must be greater than 0")

        return settings
    }

    var settings = settingWithDefaults(options,settingDefaults())

    function populate () {
        var size = settings.population.length
        while( settings.population.length < settings.populationSize ) {
            settings.population.push(
                mutate(
                    cloneJSON( settings.population[ Math.floor( Math.random() * size ) ] )
                )
            )
        }
    }

    function cloneJSON( object ) {
        return JSON.parse ( JSON.stringify ( object ) )
    }

    function mutate(phenotype) {
        return settings.mutationFunction(cloneJSON(phenotype))
    }

    function crossover(phenotype) {
        phenotype = cloneJSON(phenotype)
        var mate = settings.population[ Math.floor(Math.random() * settings.population.length ) ]
        mate = cloneJSON(mate)
        return settings.crossoverFunction(phenotype,mate)[0]
    }

    function doesABeatB(a,b) {
        var doesABeatB = false;
        if ( settings.doesABeatBFunction ) {
            return settings.doesABeatBFunction(a,b)
        } else {
            return settings.fitnessFunction(a) >= settings.fitnessFunction(b)
        }
    }

    function compete( ) {
        var nextGeneration = []

        for( var p = 0 ; p < settings.population.length - 1 ; p+=2 ) {
            var phenotype = settings.population[p];
            var competitor = settings.population[p+1];

            nextGeneration.push(phenotype)
            if ( doesABeatB( phenotype , competitor )) {
                if ( Math.random() < 0.5 ) {
                    nextGeneration.push(mutate(phenotype))
                } else {
                    nextGeneration.push(crossover(phenotype))
                }
            } else {
                nextGeneration.push(competitor)
            }
        }

        settings.population = nextGeneration;
    }



    function randomizePopulationOrder( ) {

        for( var index = 0 ; index < settings.population.length ; index++ ) {
            var otherIndex = Math.floor( Math.random() * settings.population.length )
            var temp = settings.population[otherIndex]
            settings.population[otherIndex] = settings.population[index]
            settings.population[index] = temp
        }
    }

    return {
        evolve : function (options) {

            if ( options ) { 
                settings = settingWithDefaults(options,settings)
            }
            
            populate()
            randomizePopulationOrder()
            compete()
            return this
        },
        best : function() {
            var scored = this.scoredPopulation()
            var result = scored.reduce(function(a,b){
                return a.score >= b.score ? a : b
            },scored[0]).phenotype
            return cloneJSON(result)
        },
        bestScore : function() {
            return settings.fitnessFunction( this.best() )
        },
        population : function() {
            return cloneJSON( this.config().population )
        },
        scoredPopulation : function() {
            return this.population().map(function(phenotype) {
                return {
                    phenotype : cloneJSON( phenotype ),
                    score : settings.fitnessFunction( phenotype )
                }
            })
        },
        config : function() {
            return cloneJSON( settings )
        },
        clone : function(options) {
            return geneticAlgorithmConstructor( 
                settingWithDefaults(options, 
                    settingWithDefaults( this.config(), settings ) 
                    )
                )
        }
    }
}

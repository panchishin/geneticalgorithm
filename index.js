module.exports = function geneticAlgorithmConstructor(options) {

    function settingDefaults() { return {
 
        mutationFunction : function(phenotype) { return phenotype },
 
        crossoverFunction : function(a,b) { return [a,b] },
 
        fitnessFunction : function(phenotype) { return 0 },
        fitnessProbablity : 1.0,
        fitnessTests : 1,

        diversityFunction : function(a,b) { return 0 },
 
        population : [],
        populationSize : 100,
    }}

    function settingWithDefaults( settings , defaults ) {
        settings = settings || {}

        settings.mutationFunction = settings.mutationFunction || defaults.mutationFunction
        settings.crossoverFunction = settings.crossoverFunction || defaults.crossoverFunction
        settings.fitnessFunction = settings.fitnessFunction || defaults.fitnessFunction
        settings.fitnessProbablity = settings.fitnessProbablity || defaults.fitnessProbablity
        settings.fitnessTests = settings.fitnessTests || defaults.fitnessTests
        if ( settings.fitnessTests <= 0 ) throw Error("fitnessTests must be greater than 0")

        settings.diversityFunction = settings.diversityFunction || defaults.diversityFunction

        settings.population = settings.population || defaults.population
        if ( settings.population.length <= 0 ) throw Error("population must be an array and contain at least 1 phenotypes")

        settings.scoredPopulation = []
        for( var index in settings.population ) {
            settings.scoredPopulation.push({
                'phenotype' : settings.population[index]
            })
        }

        settings.populationSize = settings.populationSize || defaults.populationSize
        if ( settings.populationSize <= 0 ) throw Error("populationSize must be greater than 0")

        return settings
    }

    var settings = settingWithDefaults(options,settingDefaults())

    function populate () {
        var size = settings.scoredPopulation.length
        while( settings.scoredPopulation.length < settings.populationSize ) {
            settings.scoredPopulation.push( 
                cloneJSON( settings.scoredPopulation[ Math.floor( Math.random() * size ) ] )
            )
        }
    }

    function calculateFitness () {
        for( var index in settings.scoredPopulation ) {
            var item = settings.scoredPopulation[index];
            item.score = settings.fitnessFunction(item.phenotype);
        }
    }

    function cloneJSON( object ) {
        return JSON.parse ( JSON.stringify ( object ) )
    }

    function mutate(scoredPhenotype) {
        scoredPhenotype = cloneJSON(scoredPhenotype)
        return {  phenotype : settings.mutationFunction(scoredPhenotype.phenotype) }
    }

    function crossover(scoredPhenotype) {
        scoredPhenotype = cloneJSON(scoredPhenotype)
        var mate = settings.scoredPopulation[ Math.floor(Math.random() * settings.scoredPopulation.length ) ]
        mate = cloneJSON(mate)
        return { phenotype : settings.crossoverFunction(scoredPhenotype.phenotype,mate.phenotype)[0] }
    }

    function compete( ) {
        var nextGeneration = []

        for( var p = 0 ; p < settings.scoredPopulation.length - 1 ; p+=2 ) {
            var phenotype = settings.scoredPopulation[p];
            var competitor = settings.scoredPopulation[p+1];
            if ( Math.random() < settings.fitnessProbablity ) {
                phenotype.score = settings.fitnessFunction(phenotype.phenotype);
                competitor.score = settings.fitnessFunction(competitor.phenotype);

                var best = phenotype.score >= competitor.score ? phenotype : competitor
                nextGeneration.push(best)

                if ( Math.random() < 0.5 ) {
                    nextGeneration.push(mutate(best))
                } else {
                    nextGeneration.push(crossover(best))
                }

            } else {
                nextGeneration.push(phenotype)
                nextGeneration.push(competitor)
            }
        }

        settings.scoredPopulation = nextGeneration;
    }



    function randomizePopulationOrder( ) {
        for( var index in settings.scoredPopulation ) {
            var otherIndex = Math.floor( Math.random() * settings.scoredPopulation.length )
            var temp = settings.scoredPopulation[otherIndex]
            settings.scoredPopulation[otherIndex] = settings.scoredPopulation[index]
            settings.scoredPopulation[index] = temp
        }
    }

    function setBest( ) {
        if ( ! settings.best ) {
            var best = settings.scoredPopulation[0];
            for( var p in settings.scoredPopulation ) {
                if ( settings.scoredPopulation[p] && 
                    settings.scoredPopulation[p].score && 
                    settings.scoredPopulation[p].score > best.score
                ) {
                    best = settings.scoredPopulation[p];
                }
            }
            settings.best = best
        }
    }

    return {
        evolve : function (options) {
            settings.population = []
            delete settings.best

            if ( options ) { 
                settings = settingWithDefaults(options,settings)
            }
            
            populate()
            for( var competition = 0 ; competition < settings.fitnessTests ; competition++ ) {
                randomizePopulationOrder()
                compete()
            }
            return this
        },
        best : function() {
            calculateFitness()
            setBest()
            return cloneJSON( settings.best.phenotype )
        },
        bestScore : function() {
            setBest()
            return settings.best.score
        },
        population : function() {
            return cloneJSON( this.config().population )
        },
        scoredPopulation : function() {
            calculateFitness()
            return cloneJSON( settings.scoredPopulation )
        },
        config : function() {
            var result = cloneJSON( settings )
            result.population = []
            for( var i in result.scoredPopulation ) {
                result.population.push( result.scoredPopulation[i].phenotype )
            }
            delete result.scoredPopulation
            delete result.best
            return result
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

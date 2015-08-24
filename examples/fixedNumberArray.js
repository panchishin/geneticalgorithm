var GeneticAlgorithm = require('../index')

if ( !process.argv[2] ) { console.log("No argument found.  Using default of 10 as the Phenotype size.") }
var PhenotypeSize = process.argv[2] || 10;

function mutationFunction(phenotype) {
    var gene = Math.floor( Math.random() * phenotype.numbers.length );
    phenotype.numbers[gene] += Math.random() * 20 - 10;
    return phenotype;
}

function crossoverFunction(a, b) {
    function cloneJSON( item ) {
        return JSON.parse ( JSON.stringify ( item ) )
    }

    var x = cloneJSON(a), y = cloneJSON(b), cross = false;

    for (var i in a.numbers) {
        if ( Math.random() * a.numbers.length <= 1 ) { cross = !cross }
        if (cross) {
            x.numbers[i] = b.numbers[i];
            y.numbers[i] = a.numbers[i];
        }
    }
    return [ x , y ];
}

function fitnessFunction(phenotype) {
    var sumOfPowers = 0;
    for (var i in phenotype.numbers) {
        // assume perfect solution is '50.0' for all numbers
        sumOfPowers += Math.pow( 50 - phenotype.numbers[i], 2);
    }
    return 1 / Math.sqrt(sumOfPowers);
}

function createEmptyPhenotype() {
    var data = [];
    for (var i = 0; i < PhenotypeSize; i += 1) {
        data[i] = 0
    }
    return { numbers : data }
}

var ga = GeneticAlgorithm({
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ createEmptyPhenotype() ],
    populationSize: PhenotypeSize * 10
});

for( var i = 0 ; i < 20 * PhenotypeSize ; i++ ) ga.evolve()
console.log(ga.best());

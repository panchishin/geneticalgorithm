var GeneticAlgorithm = require('../index')

console.log("\nTest to see how well GeneticAlgorithm does with islands.\n")
console.log("There are 25 islands located at [0.5,0.5], [2.5,0.5] ... [8.5,8.5].")
console.log("One phenotype starts at [0.1,0.1] which is close to the first island.")
console.log("The first island is the least desirable and island [8.5,8.5] is the most.")
console.log("The space inbetween the islands is very undesirable.")
console.log("The mutation function allows mutations that have a small chance of crossing islands.\n")

function mutationFunction(phenotype) {
    var gene = Math.floor( Math.random() * phenotype.numbers.length );
    phenotype.numbers[gene] += 2.5*(Math.random()*2 - 1)*(Math.random()*2 - 1);
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

// this makes a 5x5 grid of hotspots with [0.5,0.5] being the lowest and [8.5,8.5] being the hottest
function fitnessFunction(phenotype) {
    var score = Math.sin( phenotype.numbers[0] * Math.PI ) *
        Math.sin( phenotype.numbers[1] * Math.PI )

    score *= ( 10 + phenotype.numbers[0] + phenotype.numbers[1] ) / 10

    if ( phenotype.numbers[0] < 0 || phenotype.numbers[0] > 10 ||
        phenotype.numbers[1] < 0 || phenotype.numbers[1] > 10 ) {
        score = 0
    }
    return score
}

function createEmptyPhenotype() {
    return { numbers : [ 0.1 , 0.1 ] }
}

var ga = GeneticAlgorithm({
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ createEmptyPhenotype() ]
});

function finished() {
    return Math.round(ga.best().numbers[0] * 10) == 85 && Math.round(ga.best().numbers[1] * 10) == 85 
}
var done = finished()
for( var loop = 1 ; loop <= 200 && !done; loop++ ) {
    ga.evolve()
    if ( loop % 10 == 0 ) {
        process.stdout.write("Completed " + loop + " evolutions : ")
        console.log(ga.best());
        done = finished()
    }
}

if ( finished() ) { 
    console.log("\nSuccessfully hopped evolutionaryly difficult islands.\n")
} else {
    console.log("\nFailed to hop evolutionaryly difficult islands.\n")
}

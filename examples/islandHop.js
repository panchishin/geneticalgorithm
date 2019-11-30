var GeneticAlgorithm = require('../index')

console.log("\nTest to see how well GeneticAlgorithm does with islands.\n")
console.log("There are 10 islands located at [0.5,0.5], [2.5,0.5] ... [8.5,8.5], like so")
console.log("+----------------+")
console.log("| A  B  D  E  G  |")
console.log("| C              |")
console.log("| F              |")
console.log("| H              |")
console.log("| I           X  |")
console.log("+----------------+")
console.log("A = [0.5,0.5] and is the least valuable genetic island.")
console.log("X = [8.5,8.5] is the most valuable, but it is very far from anything.")
console.log("One phenotype starts at [0.3,0.5] which is close to island A.")
console.log("The space inbetween the islands is very undesirable.")
console.log("The mutation function allows mutations that have a small chance of crossing")
console.log("islands and is not large enough to reach X.\n")


let islands = [[0.5,0.5],                                // upper left
               [2.5,0.5],[4.5,0.5],[6.5,0.5],[8.5,0.5],  // x column 
               [0.5,2.5],[0.5,4.5],[0.5,6.5],[0.5,8.5],  // y column
               [8.5,8.5]];                               // sweet spot


Math.sqr = function(x) { return Math.pow(x,2) }
function cloneJSON( item ) { return JSON.parse ( JSON.stringify ( item ) ) }




// ********************** GENETIC ALGO FUNCTIONS *************************


function mutationFunction(phenotype) {
    phenotype.x += 3*(Math.random()*2 - 1)*(Math.random()*2 - 1)*(Math.random()*2 - 1);
    phenotype.y += 3*(Math.random()*2 - 1)*(Math.random()*2 - 1)*(Math.random()*2 - 1);
    return phenotype;
}

function crossoverFunction(a, b) {
    let x = cloneJSON(a)
    let y = cloneJSON(b)
    x.x = b.x;
    y.y = a.y;
    return Math.random() < .5 ? [x,y] : [y,x];
}

function positionScore(x,y){
    return islands.map(function(island) {
        let islandValue = island[0]/2.+island[1]
        let distance = Math.sqrt( (Math.sqr(x - island[0]) + Math.sqr(y - island[1])) / 2 )
        if (distance > .4) { return -10 }
        return Math.min(.4,.5 - distance) * islandValue
    }).reduce(function(a,b) { return Math.max(a,b) })*10
}

function fitnessFunction(phenotype) {
    return positionScore(phenotype.x,phenotype.y)
}


//  This function implements genetic diversity.
function doesABeatBFunction(a,b) {
    let aScore = fitnessFunction(a)
    let bScore = fitnessFunction(b)
    let distance = Math.sqrt(Math.sqr(a.x - b.x) + Math.sqr(a.y - b.y))

    // if b isn't on an island and 'a' is, then a wins
    if (aScore >= 0 && bScore < 0) return aScore

    // if a isn't on an island, it can't beat b
    if (aScore < 0) return 0

    // if it is far away, then there is little chance
    if (distance > 2 && Math.random() > .1/distance ) return 0

    // otherwise, a beats b by the margin of difference
    return aScore - bScore
}


let ga = GeneticAlgorithm({
        mutationFunction: mutationFunction,
        crossoverFunction: crossoverFunction,
        fitnessFunction: fitnessFunction,
        doesABeatBFunction: doesABeatBFunction,
        population: [ { x: .3 , y: .5 } ],
        populationSize: 500
    });


function finished() {
    best_frog = ga.best();
    return best_frog.x > 8 && best_frog.x < 9 && best_frog.y > 8 && best_frog.y < 9 ;
}

var done = finished()

for( var loop = 1 ; loop <= 1000 && !done; loop++ ) {
    ga.evolve()
    if ( loop % 50 == 0 ) {
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

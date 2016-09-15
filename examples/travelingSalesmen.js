var mutationFunction = function( phenotype ) {
    var gene1_index = Math.floor(Math.random() * phenotype.length )
    var gene2_index = Math.floor(Math.random() * phenotype.length )
    var temp = phenotype[ gene1_index ]
    phenotype[ gene1_index ] = phenotype[ gene2_index ]
    phenotype[ gene2_index ] = temp
    //console.log("mutant = " + JSON.stringify(phenotype))
    return phenotype
}

function helper_concat(index,phenotypeA,phenotypeB) {
    return phenotypeA.slice(0,index).concat( phenotypeB.slice(index) ).concat( phenotypeA.slice(index) )
}

function helper_removeDuplicates(phenotype) {
    var duplicates = {}
    return phenotype.filter( function( item ) { 
        if ( duplicates[JSON.stringify(item)] ) { return false }
        else { duplicates[JSON.stringify(item)] = true ; return true }
    })
}

function crossoverFunction(phenotypeA, phenotypeB) {
    var index = Math.round( Math.random() * phenotypeA.length )


    phenotypeX = helper_removeDuplicates( helper_concat(index,phenotypeA,phenotypeB) )
    phenotypeY = helper_removeDuplicates( helper_concat(index,phenotypeB,phenotypeA) )

    // move, copy, or append some values from a to b and from b to a
    return [ phenotypeX , phenotypeY ]
}


var fitnessFunction = function( phenotype ) {

    var calculateDistance = function( a , b ) {
        return Math.sqrt( Math.pow( a.x - b.x , 2 ) + Math.pow( a.y - b.y , 2 ) )
    }

    var prev = phenotype[ 0 ]
    //console.log("The phenotype are " + JSON.stringify(phenotype))
    var distances = phenotype.slice(1).map( function( item ) { result = [prev,item] ; prev = item ; return result } )
    //console.log("The distances are " + JSON.stringify(distances))
    var distance = distances.reduce( function( total, item ) { 
        //console.log("item = " + JSON.stringify(item) )
        return total + calculateDistance(item[0],item[1])
    } , 0 )
    //console.log("total = " + distance )
    return -1 * distance
}

// outline a large square but not in order.
var firstPhenotype = []
for (i=2;i<10;i++) {
    firstPhenotype.push( {x:i,y:1} )
    firstPhenotype.push( {x:1,y:i} )
    firstPhenotype.push( {x:i,y:10} )
    firstPhenotype.push( {x:10,y:i} )
}

var geneticAlgorithmConstructor = require('../index')
var geneticAlgorithm = geneticAlgorithmConstructor({
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ firstPhenotype ],
    populationSize:1000
});

console.log("Starting with:")
console.log( firstPhenotype )
var best = []
var previousBestScore = 0
for( var a = 0 ; a < 100 ; a++ ) {
    for( var i = 0 ; i < 25 ; i++ ) geneticAlgorithm.evolve()
    var score = geneticAlgorithm.bestScore()
    if ( score == previousBestScore ) {
        break;
    }
    previousBestScore = score
    console.log("Distance is " + -1 * score)
    
}
best = geneticAlgorithm.best()
console.log("Finished with:")
console.log(best)
console.log("Distance is " + -1 * fitnessFunction(best))


function mutationFunction(phenotype) {
    phenotype = cloneJSON(phenotype)
    var chance = Math.random()
    var index = Math.floor( Math.random() * phenotype.numbers.length )


    // remove one number
    if ( chance < 0.1 && phenotype.numbers.length > 0 ) {
	phenotype.numbers.splice( index , 1 )
	return phenotype

    // add one number
    } else if ( chance < 0.2 ) { 
	var numbers = phenotype.numbers.slice( 0 , index )
		.concat( phenotype.numbers.slice( index , index+1 ) )
		.concat( phenotype.numbers.slice( index ) )
	phenotype.numbers = numbers
	return phenotype

    // mutate
    } else {
    	phenotype.numbers[index] += Math.random() * 20 - 10;
    	return phenotype;
    }
}

function cloneJSON( item ) {
    return JSON.parse ( JSON.stringify ( item ) )
}

function crossoverFunction(a, b) {

    if ( a.numbers.length > b.numbers.length ) {
	var temp = a
	a = b
	b = temp
    }
    
    var x = cloneJSON(a), y = cloneJSON(b), cross = false, offset = 0;

    for (var i in a.numbers) {
	if ( a.numbers.length + offset < b.numbers.length ) {
		offset += Math.random() * a.numbers.length <= 1 ? 1 : 0	
	}
        if ( Math.random() * a.numbers.length <= 1 ) { cross = !cross }
        if (cross) {
            x.numbers[i] = b.numbers[i];
            y.numbers[i+offset] = a.numbers[i];
        }
    }
    return [ x , y ];
}

function fitnessFunction(phenotype) {
    if ( phenotype.numbers.length == 0 ) { return 0 }
    var sumOfPowers = 0;
    for (var i in phenotype.numbers) {
        // assume perfect solution is '50.0' for all numbers
        sumOfPowers += Math.pow( 50 - phenotype.numbers[i], 2);
    }
    var result = 1 / Math.sqrt(sumOfPowers)
    result /= Math.max( Math.pow(0.01,TARGET_LENGTH) , Math.abs( phenotype.numbers.length - TARGET_LENGTH ) )
    return result
}

function createEmptyPhenotype() {
    return { numbers : [ 0 ] }
}

if ( ! process.argv[2] ) {
  console.log("No arguments found.  Using default of '5' for target length.")
}

var TARGET_LENGTH = process.argv[2] || 5;

var geneticAlgorithm = require('../index')({
    mutationFunction: mutationFunction,
    crossoverFunction: crossoverFunction,
    fitnessFunction: fitnessFunction,
    population: [ { numbers : [ 0 , 0 , 0 ] } ]
});

for( var i = 0 ; i < 40 * TARGET_LENGTH ; i++ ) geneticAlgorithm.evolve()
console.log(geneticAlgorithm.best());

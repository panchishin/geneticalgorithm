
var geneticAlgorithmConstructor = require("../index.js")

module.exports = {


    'solve genetic diversity problem' : function(beforeExit, assert) {

	    function cloneJSON( item ) {
	        return JSON.parse ( JSON.stringify ( item ) )
	    }

		function mutationFunction(phenotype) {
			var result = cloneJSON(phenotype)

		    result.number[Math.floor(Math.random() * 2)] += (Math.random()*2-1)*2;
		    return result;
		}

		function crossoverFunction(a, b) {
		    var x = { number : [ a.number[0] , b.number[1] ]}
		    var y = { number : [ b.number[0] , a.number[1] ]}
		    return Math.random() > 0.5 ? [ x , y ] : [ y , x ]
		}

		function score(phenotype) {
			var score = Math.sin( phenotype.number[0] * Math.PI ) *
			Math.sin( phenotype.number[1] * Math.PI )
			score *= ( 10 + phenotype.number[0] + phenotype.number[1] ) / 10
			return Math.abs(score)
		}

		function fitnessFunction(phenotype) {
		    if ( phenotype.number[0] < 0 || phenotype.number[0] > 10 ||
		        phenotype.number[1] < 0 || phenotype.number[1] > 10 ) {
		        return 0
		    }
		    if ( phenotype.number[0] > 7.5 && phenotype.number[1] > 7.5 ) {
		    	return score(phenotype)
		    }
		    if ( phenotype.number[0] > 1 && phenotype.number[1] > 1 ) {
		    	return 0
		    }
		    return score(phenotype)
		}

		function distance(a,b) {
			return Math.abs( a.number[0] - b.number[0] ) + Math.abs( a.number[1] - b.number[1] )
		}

		function doesABeatBFunction(a,b) {
			var doesABeatB = ( distance(a,b) < 2 ) &&
				( fitnessFunction(a) >= fitnessFunction(b) )
			return doesABeatB
		}

        var ga = geneticAlgorithmConstructor({
            mutationFunction: mutationFunction,
            crossoverFunction: crossoverFunction,
            fitnessFunction: fitnessFunction,
            doesABeatBFunction: doesABeatBFunction,
            population: [ { number : [.1,.1] } ]
        });

        ga.evolve()
        var best = ga.best()

		for( var tries = 0 ; tries < 20 && ( best.number[0] < 3 || best.number[1] < 3 ) ; tries++ ) {
	        for( var i = 0 ; i < 2000 ; i++ ) {
	            ga.evolve()
	        }
	        best = ga.best()
    	}
        assert.equal( true , best.number[0] >= 3 && best.number[1] >= 3 , 
        	"Error : untrue : " + best.number[0] + " >= 3 && " + best.number[1] + " >= 3 : " + JSON.stringify(ga.best()));
    }

}


var geneticAlgorithmConstructor = require("../geneticalgorithm.js")

module.exports = {


	'geneticalgorithm is a function' : function(beforeExit, assert) {
		assert.equal('function', typeof geneticAlgorithmConstructor)
	},

	'constructor creates basic config' : function(beforeExit, assert) {

		var geneticAlgorithm = geneticAlgorithmConstructor( { population : [ {} ] } );

		assert.equal('object' , typeof geneticAlgorithm )
	},

	'complete successfully for evolutions' : function(beforeExit, assert) {

		var config = {
		    mutationFunction: function(phenotype) { return phenotype },
		    crossoverFunction: function(a,b) { return [a,b] },
		    fitnessFunction: function(phenotype) { return 0 },
		    population: [ { name : "bob" } ]
		}
		var geneticalgorithm = geneticAlgorithmConstructor( config )

		geneticalgorithm.evolve()
		assert.equal( "bob" , geneticalgorithm.best().name )
	}


}

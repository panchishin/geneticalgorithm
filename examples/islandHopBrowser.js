const canvas = document.getElementById("canvas");
const madeit = document.getElementById("madeit");
const context = canvas.getContext('2d');

MAX_SIZE = 600;

let islands = [[0.5,0.5],[2.5,0.5],[4.5,0.5],[6.5,0.5],[8.5,0.5],
[0.5,2.5],[0.5,4.5],[0.5,6.5],[0.5,8.5],[8.5,8.5]];



function positionScore(x,y){
    return islands.map(function distance(island) {
        return (island[0]/2.+island[1]) * ( 1 - Math.sqrt(Math.square(x - island[0]) + Math.square(y - island[1])/2) )
    }).reduce(function(a,b) { return Math.max(a,b) })
}


function drawCircle(x,y,s,color) {
    context.fillStyle = "hsla("+color+",90%,40%,1)";
    context.strokeStyle = "hsla("+color+",100%,20%,1)";
    context.beginPath();
    context.arc(x*MAX_SIZE/10., y*MAX_SIZE/10., s*MAX_SIZE/10., 0, Math.PI * 2, true);
    context.fill();
    context.stroke();
}


function drawIsland(x,y) {
    drawCircle(x,y,.4,90)
    context.fillStyle = "hsla(0,0%,0%,1)";
    context.strokeStyle = "hsla(0,0%,0%,1)";
    context.moveTo(x*MAX_SIZE/10., y*MAX_SIZE/10.);
    context.fillText(Math.round(10*positionScore(x,y)),x*MAX_SIZE/10., y*MAX_SIZE/10.);
}


function drawFrog(x,y) {
    drawCircle(x,y,.1,270)
}


function draw() {
    // clear the screen
    context.fillStyle = "hsla(180,90%,40%,1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();

    for(island of islands) {
        drawIsland(island[0],island[1])
    }

    for(frog of ga.population()) {
        drawFrog(frog.pos[0],frog.pos[1])
    }
    window.requestAnimationFrame(draw);
}

window.onload = function() {
    window.requestAnimationFrame(draw);
}


/********************************/


function mutationFunction(phenotype) {
    phenotype.pos[0] += 3*(Math.random()*2 - 1)*(Math.random()*2 - 1)*(Math.random()*2 - 1);
    phenotype.pos[1] += 3*(Math.random()*2 - 1)*(Math.random()*2 - 1)*(Math.random()*2 - 1);
    return phenotype;
}

function crossoverFunction(a, b) {
    function cloneJSON( item ) {
        return JSON.parse ( JSON.stringify ( item ) )
    }

    var x = cloneJSON(a), y = cloneJSON(b), cross = false;

    for (var i in a.pos) {
        if ( Math.random() * a.pos.length <= 1 ) { cross = !cross }
        if (cross) {
            x.pos[i] = b.pos[i];
            y.pos[i] = a.pos[i];
        }
    }
    return [ x , y ];
}

Math.square = function(x) { return Math.pow(x,2) }
// this makes a 5x5 grid of hotspots with [0.5,0.5] being the lowest and [8.5,8.5] being the hottest
function fitnessFunction(phenotype) {
    return positionScore(phenotype.pos[0],phenotype.pos[1])
}

function doesABeatBFunction(a,b) {
    let aScore = fitnessFunction(a)
    let bScore = fitnessFunction(b)

    if ((aScore >= 0)&&(bScore < 0)) return true

    let distance = Math.sqrt(Math.square(a.pos[0] - b.pos[0]) + Math.square(a.pos[1] - b.pos[1]))

    if (distance > 2 && Math.random() > .1/distance ) return false

    return aScore > bScore
}

function createEmptyPhenotype() {
    return { pos : [ 0.1 , 0.1 ] }
}


function finished() {
    return Math.round(ga.best().pos[0] * 10) == 85 && Math.round(ga.best().pos[1] * 10) == 85 
}

var doSimulation = false

setInterval(function(){
    if (doSimulation) {
        for(let x=0 ; x<10; x++) ga.evolve()
        madeit.innerText = ga.population().map(function(p){
            return Math.abs(p.pos[0]-8.5) < 1 && Math.abs(p.pos[1]-8.5) < 1 ? 1 : 0
        }).reduce(function(a,b){ return a+b }) + " of " + ga.population().length
    }
},100)


let ga = geneticAlgorithmConstructor({
        mutationFunction: mutationFunction,
        crossoverFunction: crossoverFunction,
        fitnessFunction: fitnessFunction,
        //doesABeatBFunction: doesABeatBFunction,
        population: [ createEmptyPhenotype() ],
        populationSize: 500
    });


function basic_ga() {
    ga = geneticAlgorithmConstructor({
        mutationFunction: mutationFunction,
        crossoverFunction: crossoverFunction,
        fitnessFunction: fitnessFunction,
        //doesABeatBFunction: doesABeatBFunction,
        population: [ createEmptyPhenotype() ],
        populationSize: 500
    });
}

function diversity_ga() {
    ga = geneticAlgorithmConstructor({
        mutationFunction: mutationFunction,
        crossoverFunction: crossoverFunction,
        // fitnessFunction: fitnessFunction,
        doesABeatBFunction: doesABeatBFunction,
        population: [ createEmptyPhenotype() ],
        populationSize: 500
    });
}
/**
 * Example-26: Robot Arm and Particles Demo
 *
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 26 March, 2019
 */



import {Engine } from '../libs/ECC-CGP-Engine';
const engine = new Engine({
    graphics:{
        sceneType:"env",
        ambientLight: {
            enabled: true
        },
        pointLight: {
            enabled: true,
            intensity: 5
        },
        directionalLight: {
            enabled: false
        }
    },
    physics:{
        debug:{
            enabled: false
        },
        enabled: false
    }
});

engine.init( {
    envPath: 'images/snow',
    models: [
        'models/arm001.gltf',
    ]
}).then( () => {
    userInit();
    engine.setCameraPosition(0, 10, 40);
    engine.start( callback );
});


let Targets = [];

/**
 * RobotArm class
 */
function RobotArm( engine, x, y, z ) {

    this.joints = [];
    this.pivots = [];
    this.alpha  = 0;
    this.delta  = 0.01 + Math.random()/50;

    const parts = [];
    parts.push(engine.getMeshByName("Base"));
    parts.push(engine.getMeshByName("J000"));
    parts.push(engine.getMeshByName("J001"));
    parts.push(engine.getMeshByName("J002"));

    const THREE = Engine.GRAPHICS;

    //let pv_base = new THREE.Object3D();
    //pv_base.position.y = 4.2;
    // parts[3].position.x -= 6;
    // parts[0].add(parts[1]);
    // parts[1].add(parts[2]);
    // parts[2].add(parts[3]);
    //pv_base.add(parts[1])

    Targets.push(parts[0]);
    Targets.push(parts[1]);
    Targets.push(parts[2]);
    Targets.push(parts[3]);


    // var position = new Engine.GRAPHICS.Vector3();
    // position.setFromMatrixPosition(Targets[Targets.length-1].matrixWorld );
}

RobotArm.prototype.update = function() {
    this.pivots[0].rotation.y = Math.cos(this.alpha/4) * Math.PI;
    this.pivots[1].rotation.z = Math.PI/2 + Math.sin(this.alpha);
    this.pivots[2].rotation.z = Math.cos(this.alpha);
    this.pivots[3].rotation.z = Math.sin(this.alpha) - Math.cos(this.alpha/2);
    this.alpha+=this.delta;
    //var position = new Engine.GRAPHICS.Vector3();
    //position.setFromMatrixPosition( this.pivots[this.pivots.length-1].matrixWorld );
}


//!! Global variables
let Robot1;
function userInit() {
    Robot1 = new RobotArm( engine, 0, 0, 0 );
    //engine.getMeshByName("ecclogo").visible = false;

    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);

}


let Mouse = {
    down: false,
    drag: false,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0
};


function mouseDown(evt) {
    evt.stopPropagation()
    evt.preventDefault();
    Mouse.x = evt.clientX;
    Mouse.y = evt.clientY;
    Mouse.down = true;

    performRay();
}
function mouseUp(evt) {
    evt.stopPropagation()
    evt.preventDefault();
    Mouse.down = false;
    Mouse.x = evt.clientX;
    Mouse.y = evt.clientY;
}
function mouseMove(evt) {
    if( Mouse.down == true && Mouse.drag == true) {
        evt.stopPropagation()
        evt.preventDefault();
        Mouse.dx = Mouse.x - evt.clientX;
        Mouse.dy = Mouse.y - evt.clientY;
        doMove(Mouse.dx, Mouse.dy);
    }
}

let targetName = null;
function performRay() {
    var ints = engine.getRayIntersec();

    // Check & Filter
    if(ints != null) {
        var name = ints.object.name;
        if(name == 'Base' || name == 'J000' || name == 'J001' || name == 'J002') {
            console.log('Target name: ' + name);
            targetName = name;
        } else {
            targetName = null;
        }
    }
    else {
        targetName = null;
    }

    console.log('targetName: ' + targetName);
}

function callback( arg ) {

    if(engine.getKeyDown('d', 20)) {
        Mouse.drag = true;
        engine.getControl().enabled = false; // Disable control
    }
    if(engine.getKeyDown('f', 20)) {
        Mouse.drag = false;
        engine.getControl().enabled = true; // Enable control
    }
    if(engine.getKeyDown('r', 20)) {

        var ints = engine.getRayIntersec();

        // Check & Filter
        if(ints != null) {
            var name = ints.object.name;
            if(name == 'Base' || name == 'J000' || name == 'J001' || name == 'J002') {
                console.log('Target name: ' + name);
            }
        }
    }
}



function doMove(dx, dy) {
    console.log(dx, dy);

    let target2move = null;

    if(targetName != null) {

        if(targetName == 'Base') {
            target2move = Targets[0];
            target2move.rotation.y = Math.PI * (dy / 1000);
        }
        else if(targetName == 'J000') {
            target2move = Targets[0];
            target2move.rotation.y = Math.PI * (dy / 1000);
        }
        else if(targetName == 'J001') {
            target2move = Targets[1];
            target2move.rotation.z = Math.PI * (dy / 1000);
        }
        else if(targetName == 'J002') {
            target2move = Targets[2];
            target2move.rotation.z = Math.PI * (dy / 1000);
        }
    }
}

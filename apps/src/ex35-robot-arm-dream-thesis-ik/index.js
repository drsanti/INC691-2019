/**
 * Example-35: robot-arm-dream-thesis-ik
 *
 * Asst.Prof.Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 28 October 2020
 */



import {Engine, THREE } from '../libs/ECC-CGP-Engine';

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
    parts.push(engine.getMeshByName("Base")); // 0
    parts.push(engine.getMeshByName("J000")); // 1
    parts.push(engine.getMeshByName("J001")); // 2
    parts.push(engine.getMeshByName("J002")); // 3
    parts.push(engine.getMeshByName("Ball")); // 4

    const THREE = Engine.GRAPHICS;

    Targets.push(parts[0]);
    Targets.push(parts[1]);
    Targets.push(parts[2]);
    Targets.push(parts[3]);
    Targets.push(parts[4]);
}

RobotArm.prototype.update = function() {
    this.pivots[0].rotation.y = Math.cos(this.alpha/4) * Math.PI;
    this.pivots[1].rotation.z = Math.PI/2 + Math.sin(this.alpha);
    this.pivots[2].rotation.z = Math.cos(this.alpha);
    this.pivots[3].rotation.z = Math.sin(this.alpha) - Math.cos(this.alpha/2);
    this.alpha+=this.delta;
}


//!! Global variables
let Robot1;
function userInit() {
    Robot1 = new RobotArm( engine, 0, 0, 0 );
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
}


/**
 * Mouse
 */
let Mouse = {
    down: false,
    drag: false,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0
};


function getMousePos(evt) {
   let px = evt.clientX;
   let py = evt.clientY;
   return {x: px, y:py}
}

function mouseUpdate(evt) {
    evt.stopPropagation()
    evt.preventDefault();
    let p = getMousePos(evt);
    Mouse.x = p.x;
    Mouse.y = p.y;
}

function mouseDown(evt) {
    mouseUpdate(evt);
    Mouse.down = true;
    performRay();
}

function mouseUp(evt) {
    mouseUpdate(evt);
    Mouse.down = false;
}

function mouseMove(evt) {
    if( Mouse.down == true && Mouse.drag == true) {
        evt.stopPropagation()
        evt.preventDefault();
        let mp = getMousePos(evt);

        Mouse.dx = Mouse.x - mp.x;
        Mouse.dy = Mouse.y - mp.y;
        doMove(Mouse.dx, Mouse.dy);
        mouseUpdate(evt);
    }
}

let targetName = null;
function performRay() {

    var ints = engine.getRayIntersec();

    // Check & Filter
    if(ints != null) {
        var name = ints.object.name;
        if(name == 'Base' || name == 'J000' || name == 'J001' || name == 'J002'|| name == 'Ball') {
            console.log('Target Ray: ' + name);
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

/**
 * Engine Callback
 */
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
            if(name == 'Base' || name == 'J000' || name == 'J001' || name == 'J002' || name == 'Ball') {
                console.log('Target name: ' + name);
            }
        }
    }
}

function deg2rad(deg) {
    return THREE.Math.degToRad(deg);
}

function rad2deg(rad) {
    return THREE.Math.radToDeg(rad);
}


// Called by mouseMove()
function doMove(dx, dy) {
    if(targetName != null && targetName == 'Ball') {
        moveBallJ02(dx, dy);
        moveJ02J01(dx, dy);
        moveJ01J00(dx, dy);
        moveEnd(dx, dy);
    }
}

function limitAngle(rad) {
    if(rad >= 1.5)   rad = 1.5
    if(rad <= -1.5)  rad = -1.5;

    return rad;
}

function moveBallJ02(dx, dy) {

    let Ball  = Targets[4];
    let J002  = Targets[3];

    //--- 1) Move the target (Ball)
    Ball.position.x -= dx/20;
    Ball.position.y += dy/20;


    //--- 2) Compute the angle of the part
    let delta_x = J002.position.x - Ball.position.x;
    let delta_y = J002.position.y - Ball.position.y;
    let rad = Math.atan(delta_y/delta_x);

    //rad = limitAngle(rad);
    if(rad >= 1.5)   rad = 1.5
    if(rad <= -1.5)  rad = -1.5;

    //--- 3) Rotate the J002 to the specific angle
    J002.rotation.z = rad;

    //--- 4) Compute head position of the J002
    let head_posX = J002.position.x + 6*Math.cos(rad);
    let head_posY = J002.position.y + 6*Math.sin(rad);

    //--- 5) Compute the offset of the J002
    let armShiftX = Ball.position.x - head_posX;
    let armShiftY = Ball.position.y - head_posY;


    //--- 6) Move the J002 to the specific location
    J002.position.x += armShiftX;
    J002.position.y += armShiftY;
}

function moveJ02J01(dx, dy)
{

    let J002 = Targets[3];
    let J001 = Targets[2];

    //--- 2) Compute the angle of the J001
    let delta_x = J001.position.x - J002.position.x;
    let delta_y = J001.position.y - J002.position.y;
    let rad = Math.atan(delta_y/delta_x);

    //rad = limitAngle(rad);
    if(rad >= 1.5)   rad = 1.5
    if(rad <= -1.5)  rad = -1.5;

    console.log(rad);

    //--- 3) Rotate the J001 to the specific angle
    J001.rotation.z = rad;


    //--- 4) Compute head position of the J001
    let head_posX = J001.position.x + 6*Math.cos(rad);
    let head_posY = J001.position.y + 6*Math.sin(rad);

    //--- 5) Compute the offset of the J001
    let armShiftX = J002.position.x - head_posX;
    let armShiftY = J002.position.y - head_posY;

    //--- 6) Move the J002 to the specific location
    J001.position.x += armShiftX;
    J001.position.y += armShiftY;
}

function moveJ01J00(dx, dy)
{

    let J001 = Targets[2];
    let J000 = Targets[1];

    //--- 2) Compute the angle of the J000
    let delta_x = J000.position.x - J001.position.x;
    let delta_y = J000.position.y - J001.position.y;
    let rad = Math.atan(delta_y/delta_x);

    //rad = limitAngle(rad);
    if(rad >= 1.5)   rad = 1.5
    if(rad <= -1.5)  rad = -1.5;

    //--- 3) Rotate the J000 to the specific angle
    J000.rotation.z = rad;


    //--- 4) Compute head position of the J000
    let head_posX = J000.position.x + 6*Math.cos(rad);
    let head_posY = J000.position.y + 6*Math.sin(rad);

    //--- 5) Compute the offset of the J000
    let armShiftX = J001.position.x - head_posX;
    let armShiftY = J001.position.y - head_posY;

    //--- 6) Move the J001 to the specific location
    J000.position.x += armShiftX;
    J000.position.y += armShiftY;
}

function moveEnd(dx, dy) {
    let Base = Targets[0];
    let J000  = Targets[1];

    //--- 1) Allow Base to be moved
    if(0){
        Base.position.copy(J000.position);
    }
    else {
        let offset_x = J000.position.x - Base.position.x;
        let offset_y = J000.position.y - Base.position.y;
        let offset_z = J000.position.z - Base.position.z;
        for(let i=1; i<=3; i++) {
            Targets[i].position.x -= offset_x;
            Targets[i].position.y -= offset_y;
            Targets[i].position.z -= offset_z;
        }
    }

}

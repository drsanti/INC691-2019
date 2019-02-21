
//!! EX4

import { Engine, CANNON } from 'ecc-cgp-engine';



//!! Create the engine
const engine = new Engine({
    
    graphics: {
        grids:{
            color: 0xffaaaa,
        }
    },

    physics: {
        enabled: true,
        useDebug: true

    }
});


//!! Options
const initOpts = {
    envPath: 'images/Bridge2',
    models:[
        'models/cube_ground.gltf',
    ],
}

const TARGET_NAME = 'Cube';
const GROUND_NAME = 'StaticCube';


//!! Target (global variable)
var target = undefined;

//!! Initialise the engine
engine.init(initOpts).then( (args) => {
    userInit();
    engine.start( loop );
});

//!! User funtion used to initilise our scene
function userInit() {

    //!! Get the rigid body ftom the physics world
    const rigidBody = engine.physics.bodyUtils.getBodyByMeshName( TARGET_NAME );

    //!! The taget will be used in the loop, see below
    target = rigidBody;

    target.mass = 2;

    // don't sleep
    target.allowSleep = false;

    //!! Add axes to all meshes
    engine.graphics.meshUtils.addAxesToAllMeshes(2);


    //!!
    //!! Create ground material
    //!!

    //!! 1) Ground material
    const groundMaterial  = engine.physics.createGroundMaterial( 0.3, 0.1 );

    //!! 2) Add the material to the ground
    const groundBody = engine.physics.bodyUtils.getBodyByMeshName( GROUND_NAME );
    groundBody.material = groundMaterial;


    //!!
    //!! Create object material
    //!!

    //!! 1) Object material
    const objectMaterial  = engine.physics.createObjectMaterial( 0.0, 0.2 , groundMaterial);

    //!! 2) Add the material to the ground
    const targetBody    = engine.physics.bodyUtils.getBodyByMeshName( TARGET_NAME );
    targetBody.material = objectMaterial;
}   


//!! Animation loop
function loop() {

    if(!target) return;

    const KEY_DELAY = 20;

    if( engine.keyboard.getKeyDown( 'w', KEY_DELAY ) ) {
        addForce( new CANNON.Vec3( 0, 0, +1 ) );   
    }
    if( engine.keyboard.getKeyDown( 's', KEY_DELAY ) ) {
        addForce( new CANNON.Vec3( 0, 0, -1 ) );
    }
    if( engine.keyboard.getKeyDown( 'd', KEY_DELAY ) ) {
        addForce( new CANNON.Vec3( +1, 0, 0 ) );
    }
    if( engine.keyboard.getKeyDown( 'a', KEY_DELAY ) ) {
        addForce( new CANNON.Vec3( -1, 0, 0 ) );
    }
    if( engine.keyboard.getKeyDown( ' ', KEY_DELAY ) ) {
        addForce( new CANNON.Vec3( 0, +3, 0 ) );
    }
}

const FORCE = 50;
function addForce(direction) {
    const point = new CANNON.Vec3( 0, 0, 0 );
    point.copy(target.position);
    const forceVector = direction.mult (FORCE);
    target.applyForce( forceVector, point );
}




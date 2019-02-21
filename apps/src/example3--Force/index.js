
import { Engine, CANNON } from './libs/ECC-CGP-Engine';


//!! Create the engine
const engine = new Engine();


//!! Options
const initOpts = {
    envPath: 'images/Bridge2',
    models:[
        'models/cube_ground.gltf',
    ],
}

//!! Target (global variable)
var target = undefined;

//!! Initialise the engine
engine.init(initOpts).then( (args) => {
    userInit();
    engine.start( loop );
});

//!! User funtion used to initilise our scene
function userInit() {

    //!! Target name, the mesh name
    const meshName = 'Cube';

    //!! Get the rigid body ftom the physics world
    const rigidBody = engine.physics.bodyUtils.getBodyByMeshName( meshName );

    //!! The taget will be used in the loop, see below
    target = rigidBody;

    //
    target.allowSleep = false;


    engine.graphics.meshUtils.addAxesToAllMeshes(4);
}


//!! Animation loop
function loop() {

    if(!target) return;

    const KEY_DELAY = 500;
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
        addForce( new CANNON.Vec3( 0, +1, 0 ) );
    }
}

const FORCE = 500;
function addForce(direction) {
    const point = new CANNON.Vec3( 0, 0, 0 );
    point.copy(target.position);
    point.y -= 0.9;
    const forceVector = direction.mult (FORCE);
    target.applyLocalForce( forceVector, point );
}




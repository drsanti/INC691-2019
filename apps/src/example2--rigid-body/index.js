
//!! Import the libraries
import { Engine, CANNON } from 'ecc-cgp-engine';

//!! Create the engine
const engine = new Engine();


//!! Options
const initOpts = {
    envPath: 'images/Bridge2',
    models:[
        'models/scene.gltf',
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
}



//!! RAD
var angle = 0.0;

//!! Animation loop
function loop() {

    if( target ) {
        target.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), angle);
        angle+=0.02;
    }
}



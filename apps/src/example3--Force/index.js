//!! example3--Force


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



//!! Animation loop
function loop() {

    if(!target) return;

    if( engine.keyboard.getKeyDown( 'f' ) ) {

        //!! Force location (the center)
        const worldPoint = new CANNON.Vec3( 0, 0, 0 );

        //!! Force
        const force = 100;
        var forceVector = new CANNON.Vec3( force, 0, 0 );

        //!! Apply the forceVector to the worldPoint
        target.applyForce( forceVector, worldPoint );
    }
    
}



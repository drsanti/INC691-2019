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

    //
    target.allowSpeep = false;
}


//!! Animation loop
function loop() {

    if(!target) return;

    if( engine.keyboard.getKeyDown( 'f', 500 ) ) {

        //!! Force location (the center)
        const worldPoint = new CANNON.Vec3( 0, 0, 0 );

        //!! Force
        const force = 500;
        var forceVector = new CANNON.Vec3( 0, force, 0 );

        //!! Apply the forceVector to the worldPoint
        target.applyForce( forceVector, worldPoint );
    }

    if( engine.keyboard.getKeyDown( 'g' ) ) {

        //!! Force location (the center of the target)
        const targetPoint = new CANNON.Vec3( 0, 0, 0 );
        targetPoint.clone( target.position );
        console.log(target.position);

        //!! Force
        const force = 50;
        var forceVector = new CANNON.Vec3( 0, force, 0 );

        //!! Apply the forceVector to the worldPoint
        target.applyForce( forceVector, targetPoint );
    }
    
}



/**
 * Example02 -- Rigid Body
 */

 //!! Import the libraries
import { Engine, CANNON } from 'ecc-cgp-engine';

//!! Create a new Engine
const engine = new Engine();


//!! Options
const initOpts = {
    models: ['models/scene.gltf'], //!! 
}

//!! Initialse the ening
engine.init(initOpts, function( args ){
    //!! Check the target mesh name in the console window

    const meshName = 'Cube';

    var rigidBody = engine.physics.bodyUtils.getBodyByMeshName( meshName );

    console(rigidBody);

    engine.start(); 
});




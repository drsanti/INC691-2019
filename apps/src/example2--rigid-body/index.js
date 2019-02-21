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
    //!! Check the mesh name(s)
    console.log(args.graphics.scene);


    const meshName = 'Cube';

    engine.start(); 
});




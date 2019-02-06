/**
* Example 01 -- Using three.graphics
* 
* Dr.Santi Nuratch
* 06 February, 2019
*/

import {Engine, CANNON, Keyboard} from './lib/ecc-cg-scene';

const options = {
    envPath:   'images/Park2/',
    modelPath: 'models/basic_geometry.gltf'
}
 
const engine = new Engine( {usePhysics: true} );
const input  = new Keyboard();

engine.init( options ).then( ( params ) => {
    userInit( params );
    engine.setGravity( new CANNON.Vec3(0, -9.8, 0) );
    engine.start( loop );
});

var body = null;

function userInit( params ) {
    
    body = engine.getBodyByMeshName('Cube');
    var ground = engine.getBodyByMeshName('StaticCube');

    var groundMat = engine.createGroundMaterial(0.200, 0.5);  //!! friction, restitution
    var objectMat = engine.createObjectMaterial(0.001, 0.0, groundMat);
    
    ground.material = groundMat;
    body.material   = objectMat;

    body.mass = 10;

    engine.addAxesToMesh(body.threemesh, 3);
}


function applyImpulse(dir) {
    const worldPoint = new CANNON.Vec3 ( 0 , 0, 0 );
    const force = new CANNON.Vec3 ( 50*dir, 0, 0 );
    body.applyForce(force, worldPoint); 
}

function loop() {
    if( input.getKeyDown( 'd' ) ) {
        applyImpulse(+1);   
    }
    if( input.getKeyDown( 'a' ) ) {
        applyImpulse(-1);     
    }  
}


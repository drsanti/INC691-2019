import {Engine, CANNON} from './lib/ecc-cg-scene';


let engine = new Engine({usePhysics: true, fogColor: 0xaaaaaa});
var body;   // physics
engine.init({
    envPath:   'images/Park2/',
    modelPath: 'models/hello.gltf'
}).then( function(param){
    engine.setGravity(new CANNON.Vec3(0, -9.8, 0));
    body  = engine.getBodyByMeshName('Cube');
    body.mass = 2;
    engine.start( update );

    engine.on('keydown', addForce);

});

function addForce(evt) {
    if(evt.key == 'w') {
        var p = new CANNON.Vec3(0, 0, 0);
        var f = new CANNON.Vec3(0, 0, 1000);
        body.applyForce(f, p);
    }
    else if(evt.key == 's') {
        var p = new CANNON.Vec3(0, 0, 0);
        var f = new CANNON.Vec3(0, 0, -1000);
        body.applyForce(f, p);
    }
}

function update ( deltaT, frameCnt ) {
    
}









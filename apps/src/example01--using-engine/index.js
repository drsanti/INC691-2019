
import { Engine, CANNON } from 'ecc-cgp-engine';

const engine = new Engine();

const initOpts = {
    envPath: 'images/Bridge2',
    models:[
        'models/scene.gltf',
        'models/prebuilds/boxes/box1.gltf',
        'models/prebuilds/boxes/box2.gltf',
        'models/prebuilds/boxes/box3.gltf',
        'models/colliders/balls.gltf',
        'models/cube_flower.gltf',
    ],
}

var target = undefined;

engine.init(initOpts).then( (args) => {
    userInit();
    engine.start( loop );
});

function userInit() {
    engine.actorLoader.load('models/colliders/character_torus.gltf', function( actor ){
        target = actor.body;
    });
}



var angle = 0.0;

function loop() {

    if(target) {
        target.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), angle);
        angle+=0.01;
    }


    if( engine.keyboard.getKeyDown('x', 500) === true) {
        console.dir( engine.graphics.scene.children );
        console.dir( engine.physics.world.bodies );
    }
}



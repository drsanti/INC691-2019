import { Engine, CANNON } from './libs/ecc-cgp-engine';
const engine = new Engine({ sceneType: 'env'});

engine.init( {envPath:'./images/Bridge2/'} ).then((params) => {
    userInit(params);
    engine.setGravity(new CANNON.Vec3(0, -9.8, 0));
    engine.start();
}); 

var body = null;

function userInit( params ) {
    body = engine.getBodyByMeshName('Cube');
    var ground = engine.getBodyByMeshName('StaticCube');
    var groundMat = engine.createGroundMaterial(0.200, 0.5);
    var objectMat = engine.createObjectMaterial(0.001, 0.0, groundMat);

    ground.material = groundMat;    /* Apply ground material 		*/
    body.material = objectMat;      /* Apply object material 		*/
    body.mass = 0.2;			    /* Change mass of the object	*/
    engine.on('keydown', onKeyDown);


    var rot = new CANNON.Vec3(1,0,0);
    ground.quaternion.setFromAxisAngle(rot,(Math.PI/20))
}


function onKeyDown(event) {
    if (event.key == 'f') {
        applyForce();
    }
}
/* Apply force vector to the world-point*/
function applyForce() {
    const worldPoint = new CANNON.Vec3(0, 0, 0);
    const force = new CANNON.Vec3(15, 0, 0);
    body.applyForce(force, worldPoint);
}

function callback(args) {

}
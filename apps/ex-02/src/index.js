
//!! Import Engine used classes
import { Engine, THREE, CANNON, Keyboard } from './libs/ecc-cgp-engine';

//!! Create the engine w/ simple scene
const engine = new Engine({ 
    sceneType: 'fog',       //!! 'env', 'fog', 'basic'
    useReflection: false,    //!! true, false,
    usePhysics: true,
    useDebug: true
});


//!! Initialise the engine with the environment and initial scene
engine.init( {
    envPath:   './images/Bridge2/',         //!! images directory
    modelPath: './models/container.gltf'    //!! model file name
}).then((params) => {                       //!! params is an object containing graphics and physics objects
    userInit( params );                     //!! user function used as initialized function
    engine.setGravity(new CANNON.Vec3(0, -9.8, 0)); //!! set gravity vector pointing down (-y)
    engine.start( callback );                         //!! start the engine
}); 

//!! 
var body = null;        //!! Target
var ground = null;       //!! Plane/Ground


//!! User initial function
function userInit( params ) {

    //!! Target
    body = engine.getBodyByMeshName('Cube');

    //!! Plane/Ground
    ground = engine.getBodyByMeshName('StaticCubeGround');
    
    //!! Ground Material
    var groundMat = engine.createGroundMaterial(0.100, 0.5);
    
    //!! Target object material
    var objectMat = engine.createObjectMaterial(0.001, 0.5, groundMat);

    //!
    ground.material = groundMat;    /* Apply ground material 		*/
    body.material = objectMat;      /* Apply object material 		*/
    
    body.mass = 0.2;			        /* Change mass of the object	*/
    

    engine.on('keydown', function(e){
        
        if(e.key == 'f') {
            applyForce(1, 0, 0); 
        }
    });
}


//!! Apply force vector to the world-point
function applyForce(dirx, diry, dirz) {

    //!! Create a world point vector
    const worldPoint = new CANNON.Vec3(0, 0, 0);

    const fx = 10;     //!! Right-Left
    const fy = 200;       //!! Jump (+y)
    const fz = 10;       //!! Forward-Backward

    //!! Create force vector
    const force = new CANNON.Vec3(dirx*fx, diry*fy, dirz*fz);

    //!! Apply the force to a point, pointed by the worldPoint vector
    body.applyLocalForce(force, worldPoint);
}

//!!
function callback(args) {
    //!!
    if(container) {
        container.rotation.x += 0.1;
    }
}
/**
 * Example-26: Robot Arm and Particles Demo
 *
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 26 March, 2019
 */



import {Engine, SPE} from '../libs/ECC-CGP-Engine';
import WebGui from '../libs/ECC-Web-Gui';

const engine = new Engine({
    graphics:{
        sceneType:"env",
        ambientLight: {
            enabled: true
        },
        pointLight: {
            enabled: true,
            intensity: 5
        },
        directionalLight: {
            enabled: false
        }
    },
    physics:{
        debug:{
            enabled: false
        },

    }
});

engine.init( {
    envPath: 'images/snow',
    models: [
        'models/arm001.gltf',
    ]
}).then( () => {
    userInit();
    engine.setCameraPosition(0, 10, 40);
    engine.start( callback );
});


/**
 * RobotArm class
 */
function RobotArm( engine, x, y, z ) {

    const THREE  = Engine.GRAPHICS;
    this.joints = [];
    this.pivots = [];
    this.alpha  = 0;
    this.delta  = 0.01 + Math.random()/50;

    const parts = [];
    parts.push(engine.getMeshByName("Base"));
    parts.push(engine.getMeshByName("J000"));
    parts.push(engine.getMeshByName("J001"));
    parts.push(engine.getMeshByName("J002"));

    for(let i=0; i<parts.length; i++) {
        parts[i].visible = true;
        this.joints.push(parts[i].clone());
        this.pivots.push(new THREE.Object3D());
        parts[i].visible = false;
    }

    for( let i=0; i<this.pivots.length; i++) {
        this.pivots[i].add( this.joints[i] );
        if( i>0 ) {
            this.joints[i].position.x = 0;
            this.pivots[i-1].add( this.pivots[i] );

        }
        if( i>1 ) {
            this.pivots[i].position.x = 6;
        }
    }
    //!! The last one, the tip
    this.pivots.push(new THREE.Object3D());

    // Position and add to the parent
    this.pivots[this.pivots.length-1].position.x = 6;
    this.pivots[this.pivots.length-2].add(this.pivots[this.pivots.length-1]);

    //!! The base position
    this.pivots[0].position.set( x, y, z );

    //!! Add to the scene
    engine.getScene().add( this.pivots[0] );

}

RobotArm.prototype.update = function() {
    this.pivots[0].rotation.y = Math.cos(this.alpha/4) * Math.PI;
    this.pivots[1].rotation.z = Math.PI/2 + Math.sin(this.alpha);
    this.pivots[2].rotation.z = Math.cos(this.alpha);
    this.pivots[3].rotation.z = Math.sin(this.alpha) - Math.cos(this.alpha/2);
    this.alpha+=this.delta;
    //var position = new Engine.GRAPHICS.Vector3();
    //position.setFromMatrixPosition( this.pivots[this.pivots.length-1].matrixWorld );
}


//!! Global variables
let Robot1;
function userInit() {
    Robot1 = new RobotArm( engine, 0, 0, 0 );
    engine.getMeshByName("ecclogo").visible = false;
}

function callback( arg ) {
    Robot1.update();
}

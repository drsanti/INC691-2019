/**
 * Example-32: Animations
 *
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 14 November, 2019
 */

const MODEL_NAME = 'mousey'; /* ortiz mulan doozy mousey nancy pubg */



//!! Your animation code
function loop(animator, engine) {
    let character = animator.character;
    //character.rotation.y += 0.01;
}

//!! Your initial code
function init(animator, engine) {
    let character = animator.character;
}







/*************************************************************************************
 *                                      Engine Setup
 *************************************************************************************/
import {
    THREE,
    Engine
} from '../libs/ECC-CGP-Engine';

const engine = new Engine({
    physics: {
        enabled: true, //!! Enable the physics engine
        debug: {
            enabled: false //!! Disable mesh debugging
        }
    },
    graphics: {
        useReflection: true,
        axes: {
            enabled: true,
        },
        renderer: {
            antialias: false,
        }
    },
});

let _animator;

engine.init({
    envPath: "images/bridge",
    models: [

        //!! Character
        `models/animations/toon/characters_and_animations/${MODEL_NAME}/${MODEL_NAME}.glb`,

        //!! Environment
        "models/scene001.gltf"
    ]
}).then((obj) => {
    system_init(obj.glTFs);
    _animator = new Animator(obj.glTFs, engine);
    engine.setCameraPosition(2, 2, 4)
    engine.start(system_loop);
});

function system_loop(arg) {
    _animator.updateAnimationFrame();
    _animator.checkAnimationKey();
    loop(_animator, engine);
}

function system_init(arg) {

}


/*************************************************************************************
 *                                      Animator class
 *************************************************************************************/
function Animator(glTFs, engine) {
    this.engine = engine;
    this.mixer = null;
    this.clipActions = [];
    this.character;
    this.animationClips = [];
    //!!
    //!! Get animations included in the models and push into the animationClips array
    //!!
    glTFs.forEach(gltf => {
        let animations = gltf.animations;
        animations.forEach(anim => {
            //console.log('"' + gltf.scene.name + '" : ' + anim.name);
            this.animationClips.push(anim);
        });
    });


    //!! Get scene of character
    for (var i = 0; i < glTFs.length; i++) {
        //console.log('name:' + glTFs[i].scene.name);
        if (glTFs[i].scene.name.includes(MODEL_NAME)) {
            this.character = glTFs[i].scene;
            var name = this.character.name.split("_")[2]; //_scene_NAME
            engine.printInfo(`"${name}" is loaded`)
            var m = engine.getMeshByName(MODEL_NAME).material;
            break;
        }
    }

    //!! Create Mixer
    this.mixer = new THREE.AnimationMixer(this.character);

    //!! Get Clip actions from the mixer
    this.animationClips.forEach(ac => {
        this.clipActions.push(this.mixer.clipAction(ac));
    });

    //!! Check if the mode includes animation
    if (this.animationClips.length < 1) {
        console.warn(`There is no animation of the loaded model`);
        return;
    }

    //!! Play the first animation
    this.clipActions[0].play();

    init(this.character, this.engine);
}

/**
 * Stop all animations
 */
Animator.prototype.stopAllAnimations = function () {
    this.clipActions.forEach(ac => {
        ac.stop();
    });
}

/**
 * lay animation by id
 */
Animator.prototype.playAnimationById = function (id) {
    if (id >= 0 && id < this.clipActions.length) {
        this.stopAllAnimations();
        this.clipActions[id].play();
        console.log(`key: ${id} > playing: ${this.clipActions[id]._clip.name}`);
    } else {
        console.warn(`No animation id ${id}!`);
    }
}

/**
 * Update animation frame (refresh)
 */
Animator.prototype.updateAnimationFrame = function () {
    if (this.mixer) {
        this.mixer.update(engine.core.properties.timing.deltaTime / 2000.0);
    }
}

Animator.prototype.checkAnimationKey = function () {
    //!! Animation by key 0, 1, 2, 3, 4,...
    for (let i = 0; i < this.clipActions.length; i++) {
        if (this.engine.getKeyDown(i + '', 200)) {
            this.playAnimationById(i);
        }
    }
}
Animator.prototype.getCharacter = function () {
    return this.character;
}

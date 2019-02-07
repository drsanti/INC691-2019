import {Engine} from './lib/ecc-cg-scene';

let engine = new Engine({usePhysics: false});

engine.init({
    envPath:   'images/Park2/',
    modelPath: 'models/box.gltf'
}).then( function(param){
    engine.start();
});





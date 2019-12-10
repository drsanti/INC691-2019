/**
 * Example-33: Simple Robot Arm Control
 *
 * Dr.Santi Nuratch
 * Embedded Computing and Control Laboratory
 * 10 December, 2019
 */

import { Engine } from '../libs/ECC-CGP-Engine';

const TargetNames = ["Motor", "Arm1", "Arm2", "Arm3"];
const Targets = [];

const engine = new Engine({
    physics: {
        enabled: false,
        debug: {
            enabled: false
        }
    },
    graphics: {
        axes: {
            enabled: false,
        },
        renderer: {
            antialias: true,
        },
        sceneType: 'basic'
    },
});

engine.init({
    models: ["models/dream/BasicArm.glb"]
}).then((obj) => {
    init(obj.glTFs);
    engine.setCameraPosition(1, 2, 5).setSceneBackgroundColor(0xFFFFFF);
    engine.start(callback);
});
function init(gltfs) {
    TargetNames.map(tg => Targets.push(engine.getMeshByName(tg)));
}



let time = 0;
function callback(arg) {
    if (!Targets.length) return;

    time += engine.getDeltaTime();

    Targets[1].rotation.z = 2 * Math.PI * Math.sin(time / 1500);
    let r1 = 1;
    let x1 = r1 * Math.cos(Targets[1].rotation.z);
    let y1 = r1 * Math.sin(Targets[1].rotation.z);

    Targets[2].position.x = x1;
    Targets[2].position.y = y1;
    Targets[2].rotation.z = 2 * Math.PI * Math.sin(time / 1800);

    let r2 = 1.5;
    let x2 = r2 * Math.cos(Targets[2].rotation.z);
    let y2 = r2 * Math.sin(Targets[2].rotation.z);

    Targets[3].position.x = x1 + x2;
    Targets[3].position.y = y1 + y2;
    Targets[3].rotation.z = Math.PI * Math.sin(time / 1200);

}

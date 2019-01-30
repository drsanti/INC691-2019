
import {scene, camera, renderer, box, wall1Mesh, wall2Mesh, floorMesh} from './init';
import * as THREE from 'three';


var brickTexture = new THREE.TextureLoader().load( 'images/brick.jpg' );
var brickMaterial = new THREE.MeshPhongMaterial( { map: brickTexture } );
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set( 4, 4 );


box.material       = brickMaterial;
wall1Mesh.material = brickMaterial;
wall2Mesh.material = brickMaterial;
floorMesh.material = brickMaterial;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);



var btn = document.getElementById('btn');
/*
var boxes = [];
var pos = 1;
btn.addEventListener('click', function() {

    var b = box.clone();
    b.position.x = pos*1.5;  
    pos++; 
    boxes.push(b);
    scene.add(b);
});
*/
box.scale.x = 0.2;
box.scale.y = 0.2;
box.scale.z = 0.2;
box.visible = false;

var dir = 1;
var holder = new THREE.Object3D();
btn.addEventListener('click', function() {
    dir *= -1;
});

var boxes = [];
var POINTS = 50;
for(var i=0; i< POINTS; i++) {
    var b = box.clone();
    b.visible = true;
    b.position.x = i*0.1 - 4;
    b.position.y =  2.2 + 2 * Math.sin(Math.PI * 2 * i / POINTS);
    boxes.push(b);
    holder.add(b); 
}







scene.add(holder);

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );

    // boxes.forEach(b => {
    //     b.rotation.x += 0.01;
    //     b.position.y = 2.2 + 2 * Math.sin(t * Math.PI * 4);
    // });
    holder.rotation.y += 0.01 * dir;

    boxes[7].rotation.y += 0.1;

}
animate();









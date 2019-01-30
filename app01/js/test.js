
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


function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    box.rotation.z += 0.001;
    box.rotation.y += 0.02;
    box.rotation.x += 0.01;

    brickTexture.offset.y += 0.001;
}
animate();









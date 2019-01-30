
import {scene, camera, renderer, box} from './init';
import * as THREE from 'three';

var texture = new THREE.TextureLoader().load( 'images/brick.jpg' );
var material = new THREE.MeshBasicMaterial( { map: texture } );
console.log(material);

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    box.rotation.z += 0.001;
    box.rotation.y += 0.02;
    box.rotation.x += 0.01;
}
animate();










import {scene, camera, renderer, box} from './init';




function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    box.rotation.z += 0.001;
    box.rotation.y += 0.02;
    box.rotation.x += 0.01;
}
animate();









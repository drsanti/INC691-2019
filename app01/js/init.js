
import * as THREE from 'three';
import OrbitControls from 'threejs-orbit-controls';

var scene  = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 
                window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
var boxMaterial = new THREE.MeshPhongMaterial( { color: 0x888888, wireframe : false } );
var box = new THREE.Mesh( boxGeometry, boxMaterial );
box.position.y = 1.2;
box.castShadow = true;
scene.add(box);


camera.position.z = 20;

scene.add(camera);

var axes = new THREE.AxesHelper(2);
scene.add(axes);

// var ambientLight = new THREE.AmbientLight(0xff8888, 2);
// scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(4, 2, 4);
pointLight.castShadow = true;
pointLight.distance = 20;
scene.add(pointLight);


var greenLight = new THREE.PointLight(0x00ff00, 2);
greenLight.position.set(-4, 0.5, -4);
greenLight.castShadow = true;
greenLight.distance = 2;
scene.add(greenLight);



// Floor
var floorGeo = new THREE.PlaneGeometry(10, 10, 5, 5);
var floorMat = new THREE.MeshPhongMaterial({ color: 0x888888});
var floorMesh = new THREE.Mesh(floorGeo, floorMat);
floorMesh.rotation.x = -Math.PI/2;
floorMesh.receiveShadow = true;
scene.add(floorMesh);

// Wall1
var wall1Geo = new THREE.PlaneGeometry(10, 10, 5, 5);
var wall1Mat = new THREE.MeshPhongMaterial({ color: 0x88cc88});
var wall1Mesh = new THREE.Mesh(wall1Geo, wall1Mat);
wall1Mesh.position.z = -5;
wall1Mesh.position.y = +5;
wall1Mesh.receiveShadow = true;
scene.add(wall1Mesh);

//Wall2
var wall2Geo = new THREE.PlaneGeometry(10, 10, 5, 5);
var wall2Mat = new THREE.MeshPhongMaterial({ color: 0xcc8888, side: THREE.DoubleSide});
var wall2Mesh = new THREE.Mesh(wall2Geo, wall2Mat);
wall2Mesh.rotation.y = Math.PI/2;
wall2Mesh.position.x = -5;
wall2Mesh.position.y = +5;
wall2Mesh.receiveShadow = true;
scene.add(wall2Mesh);



export { scene, camera, renderer, 
    wall1Mesh, wall2Mesh, box, floorMesh };



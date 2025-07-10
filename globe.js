import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('earth_uv.webp');
const cloudTexture = textureLoader.load('earthCloud.png');
const bumpTexture = textureLoader.load('bumpMap.jpg');


//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.05, 1000);
camera.position.set(0,0,1);

//controls
const controls = new OrbitControls(camera, document.body);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

//geometry
const geometry = new THREE.SphereGeometry(0.5,50,50);
const cloudGeometry = new THREE.SphereGeometry(0.51,50,50);

//ligting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(100,100,100);
scene.add(directionalLight);

//material
const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: bumpTexture,
    bumpScale: 1
});
const cloudMaterial = new THREE.MeshLambertMaterial({
    map: cloudTexture,
    transparent: true,
    depthWrite: false
});
const sphere = new THREE.Mesh(geometry, material);
const cloudSphere = new THREE.Mesh(cloudGeometry, cloudMaterial);

//renderer
const renderer =new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
scene.add(sphere);
scene.add(cloudSphere);

document.body.appendChild(renderer.domElement);


//animate
function animate() {
    sphere.rotation.x += 0.0001;
    sphere.rotation.y += 0.0001;
    cloudSphere.rotation.x += 0.0001;
    cloudSphere.rotation.y += 0.0001;
    controls.update();
    renderer.render( scene, camera );
}
    renderer.setAnimationLoop(animate);

    
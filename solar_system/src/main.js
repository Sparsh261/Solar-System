import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {addSlider} from './ControlPanel.js'
import { createPlanets } from './CreatePlanets.js';
import rings from './Orbits.js';

// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 16;

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating sun
const sunGeo = new THREE.SphereGeometry(1.2, 32, 32);
const sunMat = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,               // The Sun emits white light in space
  emissive: 0xFFF5E1,            // Soft warm white to simulate glow
  emissiveIntensity: 30,         // High intensity to simulate brightness
  metalness: 0.0,                // No metal-like reflection
  roughness: 0.2,                // Slight smoothness for stylized surface
});
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.position.set(0, 0, 0);
scene.add(sun);

// creating all planets
const planets = createPlanets();

// adding orbits
rings();

// adding speed sliders
addSlider();

// adding lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  requestAnimationFrame(animate);
  sun.rotation.x += 0.01;
  sun.rotation.y += 0.01;

  planets.forEach(planet => {
    planet.pivot.rotation.y += planet.speed;
    planet.mesh.rotation.y += 0.01;
  });

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

export {scene,planets};
// src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Setup scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFF00,
  emissive: 0xFFFF33, // makes it glow
  emissiveIntensity: 1.5,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
scene.add(sun);

function createPlanet(radius, orbitDistance, color, speed) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshStandardMaterial({color});
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = orbitDistance;

  const pivot = new THREE.Object3D();
  pivot.add(mesh);
  scene.add(pivot);

  return { pivot, mesh, speed };
}

const planets = [
  createPlanet(0.2, 2,  0xbfb8a5, 0.03), // Mercury (gray)
  createPlanet(0.25, 2.8, 0xe6d6a8, 0.025), // Venus (beige)
  createPlanet(0.3, 4,  0x2a5bff, 0.02), // Earth (blue)
  createPlanet(0.28, 5.2, 0xff3300, 0.015), // Mars (red)
  createPlanet(0.6, 7.5, 0xf0c87e, 0.01), // Jupiter (light orange)
  createPlanet(0.5, 9,  0xd8c58c, 0.007), // Saturn (pale yellow)
  createPlanet(0.35, 10.5, 0x7fdbff, 0.005), // Uranus (light blue)
  createPlanet(0.33, 12, 0x426eff, 0.004)  // Neptune (blue)
];


const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);
  

function createOrbitRing(radius, color = 0xffffff) {
  const curve = new THREE.EllipseCurve(
    0, 0,             // ax, aY (center)
    radius, radius,   // xRadius, yRadius
    0, 2 * Math.PI,   // startAngle, endAngle
    false,            // clockwise
    0                 // rotation
  );

  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });
  const ellipse = new THREE.LineLoop(geometry, material);
  ellipse.rotation.x = Math.PI/2; // Face the camera horizontally
  scene.add(ellipse);
}


const orbitRadii = [2, 2.8, 4, 5.2, 7.5, 9, 10.5, 12];
orbitRadii.forEach(r => createOrbitRing(r, 0xffffff));



























// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
function animate() {
  requestAnimationFrame(animate);
  sun.rotation.x += 0.01;
  sun.rotation.y += 0.01;
  
  planets.forEach(planet => {
  planet.pivot.rotation.y += planet.speed;
  planet.mesh.rotation.y += 0.01; // spin on axis
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

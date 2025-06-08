import * as THREE from 'three';
import { scene } from "./main";
import { makeTextSprite } from './PlanetLabel';

function loadTexture(path) {
    const loader = new THREE.TextureLoader();
    return loader.load(path);
}

function Planet(name, radius, orbitDistance, textureFile, speed, hasRings = false) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);

    const material = new THREE.MeshStandardMaterial({
        map: textureFile ? loadTexture(`src/assets/Textures/${textureFile}`) : null,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = orbitDistance;

    const pivot = new THREE.Object3D();
    pivot.add(mesh);

    const label = makeTextSprite(name, { fontsize: 85, textColor: 'white' });
    label.position.set(orbitDistance + radius + 0.5, 0.5, 0);
    pivot.add(label);

    if (hasRings) {
         let innerRadius = radius * 1.3;
    let outerRadius = radius * 2.5;
    let segments = 64;

    if (name === 'Saturn') {
        innerRadius = radius * 1.3;
        outerRadius = radius * 3.0;
        segments = 128; 
    } else if (name === 'Uranus') {
        innerRadius = radius * 1.1;
        outerRadius = radius * 1.6;
        segments = 32; 
    } else if (name === 'Jupiter') {
        innerRadius = radius * 1.1;
        outerRadius = radius * 1.3;
        segments = 24;
    } else if (name === 'Neptune') {
        innerRadius = radius * 1.05;
        outerRadius = radius * 1.4;
        segments = 24;
    }
        const ringGeometry = new THREE.RingGeometry(radius * 1.2, radius * 2.2, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.copy(mesh.position);
        pivot.add(ring);
    }
    scene.add(pivot);
    return { name, pivot, mesh, speed };
}

const createPlanets = () => {
    return [
        Planet('Mercury', 0.2, 2, '2k_mercury.jpg', 0.03),
        Planet('Venus', 0.25, 2.8, '2k_venus_surface.jpg', 0.025),
        Planet('Earth', 0.3, 4, '2k_earth_daymap.jpg', 0.02),
        Planet('Mars', 0.28, 5.2, '2k_mars.jpg', 0.015),
        Planet('Jupiter', 0.6, 7.5, '2k_jupiter.jpg', 0.01,true),
        Planet('Saturn', 0.5, 9, '2k_saturn.jpg', 0.007, true),
        Planet('Uranus', 0.35, 10.5, '2k_uranus.jpg', 0.005,true),
        Planet('Neptune', 0.33, 12, '2k_neptune.jpg', 0.004,true)
    ];
};


export { createPlanets };
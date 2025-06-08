import { scene } from "./main";
import * as THREE from 'three';
import { makeTextSprite } from './PlanetLabel';

function Planet(name, radius, orbitDistance, color, speed) {
    const geo = new THREE.SphereGeometry(radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color, emissive: 0x000000 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.x = orbitDistance;

    const pivot = new THREE.Object3D();
    pivot.add(mesh);

    const label = makeTextSprite(name, { fontsize: 85, textColor: 'white' });
    label.position.set(orbitDistance + radius + 0.5, 0.5, 0); 
    pivot.add(label);


    scene.add(pivot);

    return { name, pivot, mesh, speed };
}

const createPlanets = () => {

    const planets = [
        Planet('Mercury', 0.2, 2, 0xbfb8a5, 0.03),
        Planet('Venus', 0.25, 2.8, 0xe6d6a8, 0.025),
        Planet('Earth', 0.3, 4, 0x2a5bff, 0.02),
        Planet('Mars', 0.28, 5.2, 0xff3300, 0.015),
        Planet('Jupiter', 0.6, 7.5, 0xf0c87e, 0.01),
        Planet('Saturn', 0.5, 9, 0xd8c58c, 0.007),
        Planet('Uranus', 0.35, 10.5, 0x7fdbff, 0.005),
        Planet('Neptune', 0.33, 12, 0x426eff, 0.004)
    ];
    return planets;
}
export { createPlanets };
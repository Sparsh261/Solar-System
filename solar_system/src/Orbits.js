import * as THREE from 'three';
import { scene } from './main';
function createOrbitRing(radius, color = 0xffffff) {
    const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false,
        0
    );
    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color });
    const ellipse = new THREE.LineLoop(geometry, material);
    ellipse.rotation.x = Math.PI / 2; 
    scene.add(ellipse);
}
const rings = () => {
    const orbitRadii = [2, 2.8, 4, 5.2, 7.5, 9, 10.5, 12];
    orbitRadii.forEach(r => createOrbitRing(r, 0xffffff));
}
export default rings;
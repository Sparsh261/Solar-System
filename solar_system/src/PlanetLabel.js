
import * as THREE from 'three';

export function makeTextSprite(message, parameters = {}) {
  const fontface = parameters.fontface || "Arial";
  const fontsize = parameters.fontsize || 100;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  context.font = `${fontsize}px ${fontface}`;
  context.fillStyle = parameters.textColor || "white";
  context.fillText(message, 0, fontsize);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture});
  const sprite = new THREE.Sprite(spriteMaterial);

  sprite.scale.set(2.5, 1, 1);
  return sprite;
}

import { planets } from "./main";

const controlPanel = document.getElementById('controlPanel');

const addSlider = () => {

    planets.forEach((planet, index) => {
        const label = document.createElement('label');
        label.innerText = `${planet.name}: `;
        label.style.display = 'block';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0.001;
        slider.max = 0.05;
        slider.step = 0.001;
        slider.value = planet.speed;
        slider.style.width = '100px';

        slider.addEventListener('input', () => {
            planet.speed = parseFloat(slider.value);
        });

        label.appendChild(slider);
        controlPanel.appendChild(label);
    });

}
export { addSlider };
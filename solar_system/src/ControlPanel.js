import { planets } from "./main";

const controlPanel = document.getElementById('controlPanel');

const addSlider = () => {
    
    const container = document.createElement('div');
    container.style.display = 'none';
    const button = document.createElement('button');

    button.textContent = "Change speed";
    button.style.margin = "5px";
    button.addEventListener('click',()=>{
        button.textContent = button.textContent == 'Change speed' ? 'Close' : 'Change speed';
        container.style.display = container.style.display == 'none' ? 'block' : 'none';
    });
    controlPanel.appendChild(button);

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
        container.appendChild(label);
    });
    controlPanel.appendChild(container);

}
export { addSlider };
const simpleModeButton = document.getElementById('simple-mode');
const simpleModeElements = document.querySelectorAll('[data-simple-mode]');
const speedInputLabel = document.querySelector('.speed-input label');
const speedInputSVG = document.querySelector('.speed-input .svg-container');
const form = document.querySelector('form');
const baseSpeedTitle = document.querySelector('[data-simple-mode-title="base-speed"]');
const cyclesTitle = document.querySelector('[data-simple-mode-title="cycles"]');

let simpleModeState = localStorage.getItem('simpleModeState') === 'true';

toggleSimpleMode(simpleModeState);

simpleModeButton.addEventListener('click', () => {  
  simpleModeState = !simpleModeState;
  localStorage.setItem('simpleModeState', simpleModeState);
  toggleSimpleMode(simpleModeState);
  form.reset();
});

function toggleSimpleMode(isActive) {
  simpleModeElements.forEach(element => {
    element.style.display = isActive ? 'none' : '';
  });

  if (isActive) {
    simpleModeButton.classList.add('simple-mode');
    baseSpeedTitle.textContent = '1. Type the total speed';
    cyclesTitle.textContent = '2. Choose the number of cycles';
  } else {
    simpleModeButton.classList.remove('simple-mode');
    baseSpeedTitle.textContent = '1. Choose the base speed';
    cyclesTitle.textContent = '3. Choose the number of cycles';
  }

  speedInputLabel.textContent = isActive ? 'Total speed' : 'Base speed';
  speedInputLabel.prepend(speedInputSVG);
}

const simpleModeButton = document.getElementById('simple-mode');
const simpleModeElements = document.querySelectorAll('[data-simple-mode]');
const speedInputLabel = document.querySelector('.speed-input label');
const speedInputSVG = document.querySelector('.speed-input .svg-container');

let simpleModeState = localStorage.getItem('simpleModeState') === 'true';

toggleSimpleMode(simpleModeState);

simpleModeButton.addEventListener('click', () => {
  simpleModeState = !simpleModeState;
  localStorage.setItem('simpleModeState', simpleModeState);
  toggleSimpleMode(simpleModeState);
});

function toggleSimpleMode(isActive) {
  simpleModeElements.forEach(element => {
    element.style.display = isActive ? 'none' : '';
  });

  speedInputLabel.textContent = isActive ? 'Total speed' : 'Base speed';
  speedInputLabel.prepend(speedInputSVG);
}
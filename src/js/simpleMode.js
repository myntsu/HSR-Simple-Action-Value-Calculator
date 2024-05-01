const simpleModeButton = document.getElementById('simple-mode');
const simpleModeElements = document.querySelectorAll('[data-simple-mode]');
const speedInputLabel = document.querySelector('.speed-input label');
const speedInputSVG = document.querySelector('.speed-input .svg-container');
const form = document.querySelector('form');

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
  } else {
    simpleModeButton.classList.remove('simple-mode');
  }

  speedInputLabel.textContent = isActive ? 'Total speed' : 'Base speed';
  speedInputLabel.prepend(speedInputSVG);
}

import { handlePresetButtons } from './cyclesBonusPresets.js';

fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    let container = document.querySelector('#characters-preset');
    
    data.forEach(character => {
      let temporaryButton = document.createElement('button');
      temporaryButton.classList.add('presets-buttons');
      temporaryButton.setAttribute('data-cycles', character.speed);
      temporaryButton.setAttribute('data-traces', character.traces || 0);
      temporaryButton.setAttribute('data-input', 'character');
      temporaryButton.setAttribute('data-name', character.character.toLowerCase());

      let img = document.createElement('img');
      img.classList.add('character-image');
      let imageName = character.image.replace(/[()]/g, '').replace(/\./g, '').replace(/&/g, 'and').replace(/[^a-zA-Z0-9]/g, '_');
      img.src = `./characters/${imageName}.webp`;
      img.alt = character.character;
      if (character.stars === 'five') {
        img.classList.add('five-stars');
      } else if (character.stars === 'four') {
        img.classList.add('four-stars');
      }

      temporaryButton.appendChild(img);
      container.appendChild(temporaryButton);
    });

    handlePresetButtons();
  })
  .catch(error => console.error('Error:', error));

let searchField = document.querySelector('#searchCharacter');
searchField.addEventListener('input', function() {
  let searchTerm = this.value.toLowerCase();
  let presetButtons = document.querySelectorAll('.presets-buttons');

  presetButtons.forEach(presetButton => {
    let characterName = presetButton.getAttribute('data-name');
    if (characterName) {
      if (characterName.includes(searchTerm)) {
        presetButton.style.display = 'block';
      } else {
        presetButton.style.display = 'none';
      }
    }
  });

  let svgContainer = document.querySelector('[data-search-svg]');
  if (this.value) {
    svgContainer.style.display = 'block';
  } else {
    svgContainer.style.display = 'none';
  }
});

document.querySelector('.x-button').addEventListener('click', function(event) {
  event.preventDefault();
  let searchField = document.querySelector('#searchCharacter');
  searchField.value = '';
  searchField.dispatchEvent(new Event('input'));
});

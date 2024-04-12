import { handlePresetButtons } from './cyclesBonusPresets.js';

fetch('characters.json')
.then(response => response.json())
.then(data => {
  let container = document.querySelector('#characters-preset');
  
  data.forEach(character => {
    let button = document.createElement('button');
    button.classList.add('presets-buttons');
    button.setAttribute('data-cycles', character.speed);
    button.setAttribute('data-input', 'character');
    button.setAttribute('data-name', character.character.toLowerCase());
    
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
    
    button.appendChild(img);
    container.appendChild(button);
  });

  handlePresetButtons();
})
.catch(error => console.error('Error:', error));

let searchField = document.querySelector('#searchCharacter');
searchField.addEventListener('input', function() {
  let searchTerm = this.value.toLowerCase();
  let buttons = document.querySelectorAll('.presets-buttons');

  buttons.forEach(button => {
    let characterName = button.getAttribute('data-name');
    if (characterName.includes(searchTerm)) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });
});

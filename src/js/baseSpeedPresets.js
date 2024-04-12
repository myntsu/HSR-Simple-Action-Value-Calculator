// Fetch the JSON data
fetch('characters.json')
  .then(response => response.json())
  .then(data => {
    let container = document.querySelector('#characters-preset');

    data.forEach(character => {
      let button = document.createElement('button');
      button.classList.add('presets-buttons');
      button.setAttribute('data-cycles', character.speed);
      button.setAttribute('data-input', 'character');

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
  })
  .catch(error => console.error('Error:', error));
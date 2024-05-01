export function handlePresetButtons() {
  let presetButtons = document.querySelectorAll('.presets-buttons');
  let resetButton = document.querySelector('#simple-mode');

  presetButtons.forEach(presetButton => {
    presetButton.setAttribute('aria-pressed', 'false');

    presetButton.addEventListener('click', function(event) {
      event.preventDefault();

      let inputId = this.getAttribute('data-input');
      let input = document.querySelector(`input#${inputId}`);
      let sameGroupButtons = document.querySelectorAll(`.presets-buttons[data-input='${inputId}']`);

      if (inputId === 'percentSpeed') {
        let cycles = parseInt(this.getAttribute('data-cycles'));
        let currentValue = parseInt(input.value) || 0;

        if (this.classList.contains('pressed')) {
          this.classList.remove('pressed');
          this.setAttribute('aria-pressed', 'false');
          updateInputValue(input, currentValue - cycles);
        } else {
          this.classList.add('pressed');
          this.setAttribute('aria-pressed', 'true');
          updateInputValue(input, currentValue + cycles);
        }
      } else {
        if (this.classList.contains('pressed')) {
          this.classList.remove('pressed');
          updateInputValue(input, 0);
          this.setAttribute('aria-pressed', 'false');
          return;
        }

        sameGroupButtons.forEach(otherButton => {
          if (otherButton !== this) {
            otherButton.classList.remove('pressed');
            otherButton.setAttribute('aria-pressed', 'false');
          }
        });

        this.classList.add('pressed');

        let cycles = this.getAttribute('data-cycles');

        updateInputValue(input, cycles);

        this.setAttribute('aria-pressed', 'true');
      }

      if (input) {
        input.focus();
      }
    });
  });

  resetButton.addEventListener('click', function() {
    // When the reset button is clicked, deselect any selected buttons
    presetButtons.forEach(button => {
      if (button.classList.contains('pressed')) {
        button.classList.remove('pressed');
        button.setAttribute('aria-pressed', 'false');
      }
    });
  });

  let inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      // When the user types into the input field, deselect any selected buttons
      let sameGroupButtons = document.querySelectorAll(`.presets-buttons[data-input='${this.id}']`);
      sameGroupButtons.forEach(button => {
        if (button.classList.contains('pressed')) {
          button.classList.remove('pressed');
          button.setAttribute('aria-pressed', 'false');
        }
      });
    });
  });
}

function updateInputValue(input, value) {
  if (input) {
    input.value = value;
  }
}

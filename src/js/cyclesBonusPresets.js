export function handlePresetButtons() {
  let presetButtons = document.querySelectorAll('.presets-buttons');

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
}

function updateInputValue(input, value) {
  if (input) {
    input.value = value;
  }
}

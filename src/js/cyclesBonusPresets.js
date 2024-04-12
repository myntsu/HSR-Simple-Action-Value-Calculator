export function handlePresetButtons() {
  let presetButtons = document.querySelectorAll('.presets-buttons');

  presetButtons.forEach(presetButton => {
    // Set aria-pressed to false initially
    presetButton.setAttribute('aria-pressed', 'false');

    presetButton.addEventListener('click', function(event) {
      event.preventDefault();

      let inputId = this.getAttribute('data-input');
      let input = document.querySelector(`input#${inputId}`);
      let sameGroupButtons = document.querySelectorAll(`.presets-buttons[data-input='${inputId}']`);

      if (this.classList.contains('pressed')) {
        this.classList.remove('pressed');
        updateInputValue(this, 0);
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

      updateInputValue(this, cycles);

      if (input) {
        input.focus();
      }

      this.setAttribute('aria-pressed', 'true');
    });
  });
}

function updateInputValue(button, value) {
  let inputId = button.getAttribute('data-input');
  let input = document.querySelector(`input#${inputId}`);
  if (input) {
    input.value = value;
  }
}

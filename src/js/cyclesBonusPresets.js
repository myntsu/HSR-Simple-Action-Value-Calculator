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
      let traces = parseInt(this.getAttribute('data-traces')) || 0;

      if (inputId === 'percentSpeed') {
        let cycles = parseInt(this.getAttribute('data-cycles'));
        let currentValue = parseInt(input.value) || 0;

        if (this.classList.contains('pressed')) {
          this.classList.remove('pressed');
          this.setAttribute('aria-pressed', 'false');
          updateInputValue(input, currentValue - cycles);
          updateTracesInput(0);
        } else {
          this.classList.add('pressed');
          this.setAttribute('aria-pressed', 'true');
          updateInputValue(input, currentValue + cycles);
          updateTracesInput(traces);
        }
      } else {
        if (this.classList.contains('pressed')) {
          this.classList.remove('pressed');
          updateInputValue(input, 0);
          this.setAttribute('aria-pressed', 'false');
          let anyPressed = false;
          sameGroupButtons.forEach(otherButton => {
            if (otherButton.classList.contains('pressed')) {
              anyPressed = true;
              updateTracesInput(parseInt(otherButton.getAttribute('data-traces')) || 0);
            }
          });
          if (!anyPressed) {
            updateTracesInput(0);
          }
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
        updateTracesInput(traces);
      }

      if (input) {
        input.focus();
      }
    });
  });

  resetButton.addEventListener('click', function() {
    presetButtons.forEach(button => {
      if (button.classList.contains('pressed')) {
        button.classList.remove('pressed');
        button.setAttribute('aria-pressed', 'false');
      }
    });
    updateTracesInput(0);
  });

  let inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
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

function updateTracesInput(traces) {
  let tracesInput = document.querySelector('input#traces');
  if (tracesInput) {
    tracesInput.value = traces || 0;
  }
}

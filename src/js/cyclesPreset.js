let presetButtons = document.querySelectorAll('.presets-buttons');

presetButtons.forEach(presetButton => {
  presetButton.addEventListener('click', function(event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // If this button is already pressed, remove the 'pressed' class and set input to 0
    if (this.classList.contains('pressed')) {
      this.classList.remove('pressed');
      updateInputValue(this, 0);
      return;
    }

    // Remove 'pressed' class from all other buttons
    presetButtons.forEach(otherButton => {
      if (otherButton !== this) {
        otherButton.classList.remove('pressed');
      }
    });

    // Add 'pressed' class to the clicked button
    this.classList.add('pressed');

    // Get the value from the 'data-cycles' attribute
    let cycles = this.getAttribute('data-cycles');

    // Update the input value to the number of cycles
    updateInputValue(this, cycles);
  });
});

// Function to update the input value
function updateInputValue(button, value) {
  let inputId = button.getAttribute('data-input');
  let input = document.querySelector(`input#${inputId}`);
  if (input) {
    input.value = value;
  }
}

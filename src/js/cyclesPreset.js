function updateInputValue(button, value) {
    let inputId = button.getAttribute('data-input');
    let input = document.querySelector(`input#${inputId}`);
    if (input) {
      input.value = value;
    }
  }
  
  let cycleButtons = document.querySelectorAll('.cycles-preset');
  
  cycleButtons.forEach(cycleButton => {
    cycleButton.addEventListener('click', function(event) {
      event.preventDefault();
  
      if (this.classList.contains('pressed')) {
        this.classList.remove('pressed');
        updateInputValue(this, 0);
        return;
      }
  
      cycleButtons.forEach(otherButton => {
        if (otherButton !== this) {
          otherButton.classList.remove('pressed');
        }
      });
  
      this.classList.add('pressed');
  
      let cycles = this.getAttribute('data-cycles');
  
      updateInputValue(this, cycles);
    });
  });
  
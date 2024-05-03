function validateInputValues() {
  let characterInput = document.querySelector('#character');
  let flatSpeedInput = document.querySelector('#flatSpeed');
  let percentSpeedInput = document.querySelector('#percentSpeed');
  let subStatsInput = document.querySelector('#substats');
  let advanceForwardInput = document.querySelector('#advanceForward');
  let cyclesInput = document.querySelector('#cycles');

  [characterInput, flatSpeedInput, percentSpeedInput, subStatsInput, advanceForwardInput, cyclesInput].forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (!isNumericInput(e) && !isModifierKey(e)) {
        e.preventDefault();
      }
    });
  });

  characterInput.addEventListener('change', enforceMinMaxValue(50, 200));
  flatSpeedInput.addEventListener('change', enforceMinMaxValue(0, 1000));
  percentSpeedInput.addEventListener('change', enforceMinMaxValue(0, 100));
  subStatsInput.addEventListener('change', enforceMinMaxValue(0, 100));
  advanceForwardInput.addEventListener('change', enforceMinMaxValue(0, 100));
  cyclesInput.addEventListener('change', enforceMinMaxValue(0, 100));
}

function isNumericInput(event) {
  const key = event.key;
  return (key >= '0' && key <= '9') || key == '.' || key == '-';
}

function isModifierKey(event) {
  const key = event.key;
  return key == 'Backspace' || key == 'Delete' || key == 'Tab' || event.ctrlKey || event.metaKey;
}

function enforceMinMaxValue(min, max) {
  return function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < min) {
      this.value = min;
    } else if (value > max) {
      this.value = max;
    }
  };
}

validateInputValues();

document.getElementById('submit').addEventListener('click', () => {
  // Extracting input value
  const baseSpeed = Number(document.getElementById('character').value);
  const flatSpeed = Number(document.getElementById('flatSpeed').value);
  const percentSpeed = Number(document.getElementById('percentSpeed').value) / 100;
  const totalCycles = Number(document.getElementById('cycles').value);

  // Calculating speed/action value
  let totalSpeed = baseSpeed * (1 + percentSpeed) + flatSpeed;
  let actionValue = 10000 / totalSpeed;

  // Calculating AV per cycle
  let remainder = 0;
  let totalActions = 0;
  let cyclesContainer = document.getElementById('cycles-container');
  cyclesContainer.innerHTML = ''; // Clear the container

  for (let i = 0; i <= totalCycles; i++) {
    let cycleValue = (i === 0) ? 150 : 100;
    let rawActions = cycleValue / actionValue;
    let baseActions = Math.floor(rawActions);
    remainder += rawActions - baseActions;

    let bonusActions = 0;
    if (remainder >= 1) {
      bonusActions = Math.floor(remainder);
      remainder -= bonusActions;
    }

    // If there is more than 1 action, consider it bonus
    if (baseActions >= 2) {
      bonusActions += baseActions - 1;
      baseActions = 1;
    }

    let totalActionsCycle = baseActions + bonusActions;
    totalActions += totalActionsCycle;

    // Create a new div for the cycle
    let cycleDiv = document.createElement('div');
    cycleDiv.classList = 'result-data';
    cycleDiv.innerHTML = `<span>Cycle ${i}</span> ${totalActionsCycle} action(s) [${baseActions} normal + ${bonusActions} bonus]`;

    // Append the div to the container
    cyclesContainer.appendChild(cycleDiv);
  }

  // Display the total speed, action value, and total actions
  document.getElementById('total-speed').innerHTML = `<span>Total speed</span> ${totalSpeed}`;
  document.getElementById('action-value').innerHTML = `<span>Action value</span> ${actionValue}`;
  document.getElementById('total-actions').innerHTML = `<span>Total actions</span> ${totalActions}`;
});

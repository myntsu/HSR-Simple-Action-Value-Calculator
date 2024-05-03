document.getElementById('submit').addEventListener('click', () => {
  const baseSpeed = Number(document.getElementById('character').value);
  const flatSpeed = Number(document.getElementById('flatSpeed').value);
  const percentSpeed = Number(document.getElementById('percentSpeed').value) / 100;
  const advanceForward = Number(document.getElementById('advanceForward').value) / 100; // New input field
  const totalCycles = Number(document.getElementById('cycles').value);

  let totalSpeed = baseSpeed * (1 + percentSpeed) + flatSpeed;
  let actionValue = 10000 / totalSpeed;

  let cyclesContainer = document.getElementById('cycles-container');
  cyclesContainer.innerHTML = '';

  let remainder = 0;
  let totalActions = 0;

  for (let i = 0; i <= totalCycles; i++) {
    let cycleValue = (i === 0) ? 150 : 100;
    let currentActionValue = actionValue;
    let totalActionsCycle = 0; // Define totalActionsCycle here

    // Apply Advance Forward on the first turn
    if (i === 0 && advanceForward > 0) {
      let adjustedAV = actionValue * (1 - advanceForward);
      let adjustedCycleValue = cycleValue - adjustedAV;
      let rawActions = adjustedCycleValue / actionValue;
      let baseActions = Math.floor(rawActions);
      remainder += rawActions - baseActions;
      totalActionsCycle = baseActions + 1; // Add 1 for the advanced action
      totalActions += totalActionsCycle; // Update totalActions here
    } else {
      let rawActions = cycleValue / currentActionValue;
      let baseActions = Math.floor(rawActions);
      remainder += rawActions - baseActions;

      let bonusActions = 0;
      if (remainder >= 1) {
        bonusActions = Math.floor(remainder);
        remainder -= bonusActions;
      }

      totalActionsCycle = baseActions + bonusActions;
      totalActions += totalActionsCycle;
    }

    let startColor = 85;
    let endColor = 70;
    let colorStep = (endColor - startColor) / (totalCycles - 1);
    let cycleColor = startColor + colorStep * i;

    let actionWord = (totalActionsCycle === 1) ? 'action' : 'actions';

    let cycleDiv = document.createElement('div');
    cycleDiv.classList = 'result-data';
    cycleDiv.innerHTML = `<span class="title-value" style="background-color: hsl(49, 85%, ${cycleColor}%)">Cycle ${i}</span> ${totalActionsCycle} ${actionWord}`;

    cyclesContainer.appendChild(cycleDiv);
  }

  document.getElementById('total-speed').innerHTML = `<span>Total speed</span> ${totalSpeed.toFixed(2)}`;
  document.getElementById('action-value').innerHTML = `<span>Action value</span> ${actionValue.toFixed(2)}`;
  document.getElementById('total-actions').innerHTML = `<span>Total actions</span> ${totalActions}`;
});

document.getElementById('submit').addEventListener('click', () => {
  const baseSpeed = Number(document.getElementById('character').value);
  const flatSpeed = Number(document.getElementById('flatSpeed').value);
  const percentSpeed = Number(document.getElementById('percentSpeed').value) / 100;
  const totalCycles = Number(document.getElementById('cycles').value);

  let totalSpeed = baseSpeed * (1 + percentSpeed) + flatSpeed;
  let actionValue = 10000 / totalSpeed;

  let remainder = 0;
  let totalActions = 0;
  let cyclesContainer = document.getElementById('cycles-container');
  cyclesContainer.innerHTML = '';

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

    if (baseActions >= 2) {
      bonusActions += baseActions - 1;
      baseActions = 1;
    }

    let totalActionsCycle = baseActions + bonusActions;
    totalActions += totalActionsCycle;

    let startColor = 85;
    let endColor = 70;
    let colorStep = (endColor - startColor) / (totalCycles - 1);
    let cycleColor = startColor + colorStep * i;

    let actionWord = (totalActionsCycle === 1) ? 'action' : 'actions';

    let cycleDiv = document.createElement('div');
    cycleDiv.classList = 'result-data';
    cycleDiv.innerHTML = `<span class="title-value" style="background-color: hsl(49, 85%, ${cycleColor}%)">Cycle ${i}</span> ${totalActionsCycle} ${actionWord}`;

    // [${baseActions} normal + ${bonusActions} bonus]

    cyclesContainer.appendChild(cycleDiv);
  }

  document.getElementById('total-speed').innerHTML = `<span>Total speed</span> ${totalSpeed.toFixed(2)}`;
  document.getElementById('action-value').innerHTML = `<span>Action value</span> ${actionValue.toFixed(2)}`;
  document.getElementById('total-actions').innerHTML = `<span>Total actions</span> ${totalActions}`;
});

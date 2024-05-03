let inputs = document.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('input', calculateTotalSpeed);
});

function calculateTotalSpeed() {
  const baseSpeed = Number(document.getElementById('character').value);
  const flatSpeed = Number(document.getElementById('flatSpeed').value);
  const percentSpeed = Number(document.getElementById('percentSpeed').value) / 100;
  const substats = Number(document.getElementById('substats').value);
  const totalSpeed = baseSpeed * (1 + percentSpeed) + flatSpeed + substats;

  document.getElementById('total-speed').innerHTML = `<span>Total speed</span> ${totalSpeed.toFixed(2)}`;
}
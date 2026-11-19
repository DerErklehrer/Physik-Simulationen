const fullTurn = 360;
const threeQuarterTurn = 270;

export function bindRotationAngle(slider, readout, button, redraw) {
  function setAngle(degrees, notify = true) {
    slider.value = String(degrees);
    const angle = slider.valueAsNumber;
    const quarterRemoved = angle === threeQuarterTurn;
    readout.textContent = angle + '°';
    button.textContent = quarterRemoved ? 'Körper schließen' : 'Ein Viertel herausschneiden';
    if (notify) redraw(angle);
  }

  slider.addEventListener('input', () => setAngle(slider.valueAsNumber));
  button.addEventListener('click', () => {
    setAngle(slider.valueAsNumber === threeQuarterTurn ? fullTurn : threeQuarterTurn);
  });
  setAngle(slider.valueAsNumber, false);
  return setAngle;
}

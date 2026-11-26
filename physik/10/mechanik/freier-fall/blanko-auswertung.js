const form = document.querySelector("#blanko-form");
const heightInput = form.querySelector("#blanko-height");
const timeInputs = [...form.querySelectorAll(".blanko-times input")];
const countOutput = form.querySelector("#blanko-count");
const meanOutput = form.querySelector("#blanko-mean");
const gravityOutput = form.querySelector("#blanko-gravity");
const error = form.querySelector("#blanko-error");
const numberFormat = new Intl.NumberFormat("de-DE", { maximumSignificantDigits: 4 });

function readMeasurement(input) {
  const text = input.value.trim();
  if (!text) {
    input.removeAttribute("aria-invalid");
    return null;
  }

  const number = /^(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(text)
    ? Number(text.replace(",", "."))
    : NaN;
  const valid = Number.isFinite(number) && number > 0;
  if (valid) input.removeAttribute("aria-invalid");
  else input.setAttribute("aria-invalid", "true");
  return valid ? number : NaN;
}

function updateResults() {
  const height = readMeasurement(heightInput);
  const times = timeInputs.map(readMeasurement).filter(value => value !== null);
  const validTimes = times.filter(Number.isFinite);
  const invalidTime = validTimes.length !== times.length;
  const invalidHeight = Number.isNaN(height);
  const mean = validTimes.reduce((total, time) => total + time / validTimes.length, 0);
  const gravity = height / mean / mean * 2;

  countOutput.value = validTimes.length;
  meanOutput.value = !invalidTime && mean > 0 ? numberFormat.format(mean) : "–";
  gravityOutput.value = !invalidTime && height > 0 && Number.isFinite(gravity) && gravity > 0
    ? numberFormat.format(gravity)
    : "–";

  error.hidden = !invalidTime && !invalidHeight;
  error.textContent = error.hidden ? "" : "Gib in den markierten Feldern eine Zahl größer als null ein.";
}

form.addEventListener("input", updateResults);
form.addEventListener("submit", event => event.preventDefault());
updateResults();

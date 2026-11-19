const format = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 2,
});
const formatPrecise = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 4 });
const formatMass = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function drawDiagram(canvas, time, acceleration, maxValue, tickSize, calculate) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  const left = 35;
  const right = canvas.width - 25;
  const top = 16;
  const bottom = canvas.height - 39;
  const x = (t) => left + (right - left) * t / 3;
  const y = (value) => bottom - (bottom - top) * value / maxValue;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "14px system-ui";
  ctx.fillStyle = "#263544";
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#dbe1e6";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let value = 0; value <= maxValue; value += tickSize) {
    ctx.beginPath();
    ctx.moveTo(left, y(value));
    ctx.lineTo(right, y(value));
    ctx.stroke();
    ctx.fillText(value, left - 8, y(value));
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  for (let t = 0; t <= 3; t += 1) {
    ctx.beginPath();
    ctx.moveTo(x(t), top);
    ctx.lineTo(x(t), bottom);
    ctx.stroke();
    ctx.fillText(t, x(t), bottom + 6);
  }
  ctx.textAlign = "right";
  ctx.fillText("t in s", right, bottom + 20);

  ctx.strokeStyle = "#435567";
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, bottom);
  ctx.lineTo(right, bottom);
  ctx.stroke();

  ctx.strokeStyle = "#9c2946";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x(0), y(0));
  for (let point = 1; point <= 60; point += 1) {
    const t = point / 20;
    ctx.lineTo(x(t), y(calculate(acceleration, t)));
  }
  ctx.stroke();

  const markerX = x(time);
  const markerY = y(calculate(acceleration, time));
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "#435567";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(markerX, top);
  ctx.lineTo(markerX, bottom);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#9c2946";
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.arc(markerX, markerY, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  return true;
}

function showMotion(panel) {
  const time = panel.querySelector("#motion-time");
  const acceleration = panel.querySelector("#motion-acceleration");
  const distanceChart = panel.querySelector("#distance-chart");
  const speedChart = panel.querySelector("#speed-chart");
  const distanceAt = (a, t) => 0.5 * a * t ** 2;
  const speedAt = (a, t) => a * t;

  function update() {
    const t = time.valueAsNumber;
    const a = acceleration.valueAsNumber;
    const distance = formatPrecise.format(distanceAt(a, t));
    const speed = format.format(speedAt(a, t));
    panel.querySelector("#time-value").value = format.format(t);
    panel.querySelector("#acceleration-value").value = format.format(a);
    panel.querySelector("#distance-value").value = distance;
    panel.querySelector("#motion-speed-value").value = speed;
    const hasDistanceChart = drawDiagram(distanceChart, t, a, 18, 3, distanceAt);
    const hasSpeedChart = drawDiagram(speedChart, t, a, 12, 2, speedAt);
    return hasDistanceChart && hasSpeedChart;
  }

  if (!update()) return;
  time.addEventListener("input", update);
  acceleration.addEventListener("input", update);
  panel.hidden = false;
  document.querySelector("#static-motion-charts").hidden = true;
}

function showEnergy(panel) {
  const speed = panel.querySelector("#energy-speed");
  const speedValue = panel.querySelector("#energy-speed-value");
  const energyValue = panel.querySelector("#energy-value");
  const meter = panel.querySelector("#energy-meter");

  function update() {
    const velocity = speed.valueAsNumber;
    const energy = 0.5 * 0.5 * velocity ** 2;
    speedValue.value = format.format(velocity);
    energyValue.value = formatPrecise.format(energy);
    meter.value = energy;
  }

  speed.addEventListener("input", update);
  update();
  panel.hidden = false;
}

function showCart(panel) {
  const mass = panel.querySelector("#cart-mass");
  const massValue = panel.querySelector("#cart-mass-value");
  const accelerationValue = panel.querySelector("#cart-acceleration-value");
  const distanceValue = panel.querySelector("#cart-distance-value");
  const cart = panel.querySelector("#variable-cart");
  const reference = panel.querySelector("#reference-cart");
  const replay = panel.querySelector("#cart-replay");
  const force = 1;
  const time = 0.4;
  const trackLength = 1.6;
  const distanceAt = (acceleration) => 0.5 * acceleration * time ** 2;
  const position = (distance) => `${100 * distance / trackLength}%`;
  const referenceDistance = distanceAt(force / 0.2);

  function update() {
    const acceleration = force / mass.valueAsNumber;
    const distance = distanceAt(acceleration);
    cart.getAnimations().forEach((animation) => animation.cancel());
    reference.getAnimations().forEach((animation) => animation.cancel());
    massValue.value = formatMass.format(mass.valueAsNumber);
    accelerationValue.value = format.format(acceleration);
    distanceValue.value = format.format(distance);
    cart.style.left = position(distance);
    reference.style.left = position(referenceDistance);
  }

  mass.addEventListener("input", update);
  update();
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    replay.hidden = false;
    replay.addEventListener("click", () => {
      update();
      [[cart, distanceAt(force / mass.valueAsNumber)], [reference, referenceDistance]]
        .forEach(([vehicle, distance]) => {
          const frames = Array.from({ length: 21 }, (_, step) => ({
            left: position(distance * (step / 20) ** 2),
          }));
          vehicle.animate(frames, { duration: 1200 });
        });
    });
  }
  panel.hidden = false;
}

const motionPanel = document.querySelector("#motion-panel");
const energyPanel = document.querySelector("#energie-interaktiv");
const cartPanel = document.querySelector("#rollwagen-interaktiv");

if (motionPanel) showMotion(motionPanel);
if (energyPanel) showEnergy(energyPanel);
if (cartPanel) showCart(cartPanel);

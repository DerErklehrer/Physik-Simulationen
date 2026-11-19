const height = 10.25;
const acceleration = 9.81;
const landingTime = Math.sqrt(2 * height / acceleration);
const sliderEnd = Math.ceil(landingTime * 1000);
const frameInterval = 0.25;
const playbackDuration = 4200;

const slider = document.querySelector("#fall-time");
const play = document.querySelector("#fall-play");
const eraser = document.querySelector("#fall-eraser");
const frames = document.querySelector("#fall-frames");
const trail = document.querySelector("#fall-trail");
const intervals = document.querySelector("#fall-intervals");
const intervalRows = document.querySelector("#fall-interval-rows");
const timeOutput = document.querySelector("#fall-time-value");
const distanceOutput = document.querySelector("#fall-distance-value");
const speedOutput = document.querySelector("#fall-speed-value");

const decimals = (digits) => new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
});
const timeFormat = decimals(3);
const distanceFormat = decimals(2);
const stepTimeFormat = decimals(2);
const distanceAt = (time) => 0.5 * acceleration * time ** 2;
const positionAt = (time) => `${Math.min(100, 100 * distanceAt(time) / height)}%`;

const snapshots = [];
for (let time = 0; time < landingTime; time += frameInterval) {
  const marker = document.createElement("span");
  marker.className = "fall-snapshot";
  marker.style.top = positionAt(time);
  trail.append(marker);
  snapshots.push({ time, marker });

  if (time === 0) continue;
  const previousTime = time - frameInterval;
  const interval = intervalRows.insertRow();
  interval.insertCell().textContent = `${stepTimeFormat.format(previousTime)}–${stepTimeFormat.format(time)}`;
  interval.insertCell().textContent = distanceFormat.format(distanceAt(time) - distanceAt(previousTime));
}

function render() {
  const time = Math.min(landingTime, slider.valueAsNumber / 1000);
  const timeText = timeFormat.format(time);
  timeOutput.value = timeText;
  slider.setAttribute("aria-valuetext", `${timeText} Sekunden`);
  distanceOutput.value = distanceFormat.format(Math.min(height, distanceAt(time)));
  speedOutput.value = distanceFormat.format(acceleration * time);
  eraser.style.top = positionAt(time);

  for (const snapshot of snapshots) {
    snapshot.marker.hidden = !frames.checked || snapshot.time > time;
  }
  intervals.hidden = !frames.checked;
}

let animation = null;

function stopPlayback() {
  if (animation !== null) cancelAnimationFrame(animation);
  animation = null;
  play.textContent = "Zeitlupe abspielen";
}

play.addEventListener("click", () => {
  if (animation !== null) {
    stopPlayback();
    return;
  }

  if (slider.valueAsNumber === sliderEnd) slider.value = 0;
  const offset = slider.valueAsNumber;
  const start = performance.now();
  play.textContent = "Pause";
  animation = requestAnimationFrame(function advance(now) {
    slider.value = Math.min(sliderEnd, Math.round(offset + sliderEnd * (now - start) / playbackDuration));
    render();
    if (slider.valueAsNumber === sliderEnd) {
      stopPlayback();
      return;
    }
    animation = requestAnimationFrame(advance);
  });
});

slider.addEventListener("input", () => {
  stopPlayback();
  render();
});
frames.addEventListener("change", render);

slider.max = sliderEnd;
render();
document.querySelector("#fall-interaktiv").hidden = false;

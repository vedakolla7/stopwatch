
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapNumber = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateDisplay, 10);
        startStopBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(intervalId);
        startStopBtn.textContent = "Start";
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    isRunning = false;
    laps.innerHTML = "";
    lapNumber = 0;
}

function recordLap() {
    if (isRunning) {
        lapNumber++;
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement("div");
        lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

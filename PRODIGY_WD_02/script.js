let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1000 / 60);
        startStopButton.textContent = 'Stop';
        startStopButton.style.backgroundColor = '#dc3545';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = '#28a745';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#28a745';
    difference = 0;
    running = false;
    lapsList.innerHTML = '';
    lapCount = 0;
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = new Date().getTime() - startTime;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapElement);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

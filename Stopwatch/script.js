document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const lapButton = document.getElementById('lapButton');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const millisecondsDisplay = document.getElementById('milliseconds');
    const lapsContainer = document.getElementById('laps');

    let startTime, updateTime, intervalId;
    let elapsedTime = 0;
    let isRunning = false;

    function startStopwatch() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            intervalId = setInterval(updateStopwatch, 10);
            isRunning = true;
            toggleButtons(true);
        }
    }

    function pauseStopwatch() {
        if (isRunning) {
            clearInterval(intervalId);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
            toggleButtons(false);
        }
    }

    function resetStopwatch() {
        clearInterval(intervalId);
        elapsedTime = 0;
        isRunning = false;
        updateDisplay(0, 0, 0, 0);
        lapsContainer.innerHTML = '';
        toggleButtons(false);
    }

    function updateStopwatch() {
        elapsedTime = Date.now() - startTime;
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / 60000) % 60);
        let hours = Math.floor(elapsedTime / 3600000);

        updateDisplay(hours, minutes, seconds, milliseconds);
    }

    function updateDisplay(hours, minutes, seconds, milliseconds) {
        hoursDisplay.textContent = String(hours).padStart(2, '0');
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
        millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
    }

    function toggleButtons(running) {
        startButton.disabled = running;
        pauseButton.disabled = !running;
        resetButton.disabled = running;
        lapButton.disabled = !running;
    }

    startButton.addEventListener('click', startStopwatch);
    pauseButton.addEventListener('click', pauseStopwatch);
    resetButton.addEventListener('click', resetStopwatch);
});

let hoursInput = document.getElementById('hours');
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');
let timeDisplay = document.getElementById('timeDisplay');
let intervalId;
let isRunning = false;
let originalHours = 0;
let originalMinutes = 0;
let originalSeconds = 0;

function start() {
    if (!isRunning) {
        // Change the button icon and title when starting
        const startButton = document.querySelector('.star button');
        startButton.innerHTML = '<i class="fa-solid fa-pause red" title="PAUSE"></i>';
        isRunning = true;

        let hours = parseInt(hoursInput.value) || 0;
        let minutes = parseInt(minutesInput.value) || 0;
        let seconds = parseInt(secondsInput.value) || 0;

        originalHours = hours;
        originalMinutes = minutes;
        originalSeconds = seconds;

        let totalTime = hours * 3600 + minutes * 60 + seconds;

        if (totalTime > 0) {
            hoursInput.disabled = true;
            minutesInput.disabled = true;
            secondsInput.disabled = true;

            intervalId = setInterval(function () {
                if (totalTime <= 0) {
                    clearInterval(intervalId);
                    timeDisplay.textContent = '00:00:00';
                    hoursInput.disabled = false;
                    minutesInput.disabled = false;
                    secondsInput.disabled = false;
                } else {
                    let hoursRemaining = Math.floor(totalTime / 3600);
                    let minutesRemaining = Math.floor((totalTime % 3600) / 60);
                    let secondsRemaining = totalTime % 60;

                    timeDisplay.textContent = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
                    totalTime--;
                }
            }, 1000);
        }
    } else {
        // Pause the timer
        clearInterval(intervalId);
        const startButton = document.querySelector('.star button');
        startButton.innerHTML = '<i class="fa-solid fa-play green" title="START"></i>';
        isRunning = false;
    }
}

function reset() {
    clearInterval(intervalId);
    timeDisplay.textContent = '00:00:00';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    hoursInput.disabled = false;
    minutesInput.disabled = false;
    secondsInput.disabled = false;

    // Change the button icon to "START"
    const startButton = document.querySelector('.star button');
    startButton.innerHTML = '<i class="fa-solid fa-play green" title="START"></i>';
    isRunning = false; // Ensure the timer is not running after reset
}


function restart() {
    reset();

    // Change the button icon to "PAUSE" when restarting
    const startButton = document.querySelector('.star button');
    startButton.innerHTML = '<i class="fa-solid fa-pause red" title="PAUSE"></i>';
    isRunning = true; // Ensure the timer is in the running state after restarting

    let totalTime = originalHours * 3600 + originalMinutes * 60 + originalSeconds;

    if (totalTime > 0) {
        hoursInput.disabled = true;
        minutesInput.disabled = true;
        secondsInput.disabled = true;

        intervalId = setInterval(function () {
            if (totalTime <= 0) {
                clearInterval(intervalId);
                timeDisplay.textContent = '00:00:00';
                hoursInput.disabled = false;
                minutesInput.disabled = false;
                secondsInput.disabled = false;

                // Change the button icon to "START" when the timer completes
                const startButton = document.querySelector('.star button');
                startButton.innerHTML = '<i class="fa-solid fa-play green" title="START"></i>';
                isRunning = false; // Ensure the timer is not running
            } else {
                let hoursRemaining = Math.floor(totalTime / 3600);
                let minutesRemaining = Math.floor((totalTime % 3600) / 60);
                let secondsRemaining = totalTime % 60;

                timeDisplay.textContent = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
                totalTime--;
            }
        }, 1000);
    }
}


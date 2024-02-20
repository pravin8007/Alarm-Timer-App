let activeTimer = 0;
const text = document.getElementById("text");
let timers = [];
let timeID = 1;

function startTimer(hours, minutes, seconds) {
    let totalTime = hours * 3600 + minutes * 60 + seconds;

    const activeTimersSection = document.querySelector(".active-timers-section");
    const timerElement = document.createElement("div");
    const timerId = `timer${timeID}`;
    timerElement.id = timerId;
    timerElement.innerHTML = `<div class="timer-Left-section">
                              <div>Time Left :</div>
                              <div class="Timer-left">
                              <div> 00  : </div>
                              <div> &nbsp00  :  </div>
                              <div> &nbsp00  </div>
                              </div>
                              <button class="Delete">Delete</button>
                              </div>`;

    activeTimersSection.appendChild(timerElement);
    timeID++;

    let intervalId = setInterval(() => {
        if (totalTime == 0) {
            clearInterval(intervalId);
            timerElement.innerHTML = `<div class="Timer-Up">
                                        <div></div>
                                        <div>Timer Is Up !</div> 
                                        <button class="Stop" onclick="stopAudio()">Stop</button>
                                        </div>`;
            handleTimerEnd();
        } else {
            totalTime--;
            createTimerDisplay(totalTime, timerElement);
        }
    }, 1000);

    const deleteButton = timerElement.querySelector(".Delete");
    deleteButton.addEventListener("click", () => {
        clearInterval(intervalId);
        timerElement.remove();
        activeTimer--;
        if (activeTimer === 0) {
            text.innerText = "You have no timers currently!";
        }
        timers = timers.filter(timer => timer.timerId !== timerId);
    });

    activeTimer++;
    if (activeTimer >= 1) {
        text.innerText = "";
    }
    // Store the interval ID for later reference
    timers.push({ timerId, intervalId });
}

// Function to update the timer display
function createTimerDisplay(timeRemaining, timerElement) {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    // Format hours, minutes, and seconds as strings with leading zeros if necessary
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Update the timer display HTML element
    let timer = timerElement.querySelector(".Timer-left");
    timer.textContent = `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`;
}

const audio = new Audio("Assest/mixkit-classic-alarm-995.wav");
function handleTimerEnd() {
    audio.play();
}

function stopAudio() {
    text.innerText = "You have no timers currently!";
    audio.pause();
    const stop = document.querySelector(".Stop");
    stop.parentElement.parentElement.remove();
}

const setButton = document.getElementById("set");
setButton.addEventListener("click", (event) => {
    event.preventDefault();
    const hoursInput = document.getElementById("Hour").value;
    const minutesInput = document.getElementById("minute").value;
    const secondsInput = document.getElementById("second").value;

    startTimer(hoursInput, minutesInput, secondsInput);
    const form = document.getElementById("form");
    form.reset();
});

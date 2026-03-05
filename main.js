const secondEl = document.getElementById('timer');

let second = Number(secondEl.innerText);

const btn15 = document.getElementById('btn15');
const btn30 = document.getElementById('btn30');
const btn60 = document.getElementById('btn60'); 
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');
const btnPause = document.getElementById('btnPause');
const sound = document.getElementById("timerSound");


let selectedSeconds = 0;
let remainingSeconds = 0;
let intervalId = null;

//main countdown function

function startCountdown(totalSeconds) {
  if (intervalId !== null) 
    return;
    remainingSeconds = totalSeconds;

  intervalId = setInterval(() => {
    if (remainingSeconds < 0) {
      clearInterval(intervalId);
      intervalId = null;
      secondEl.innerText = "Time is up!";
      sound.play();
      selectedSeconds = 0;
      remainingSeconds = 0;
      return;
    }

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    secondEl.innerText = `${h}:${m}:${s}`;
    console.log(`${h}:${m}:${s}`);

    remainingSeconds--; // passa 1 secondo
  }, 1000);
}


//buttons


btn15.addEventListener("click", function() {
  selectedSeconds = 15 * 60;
  secondEl.innerText = "00:15:00";
});


btn30.addEventListener("click", function() {
  selectedSeconds = 30 * 60;
  secondEl.innerText = "00:30:00";
});

btn60.addEventListener("click", function() {
  selectedSeconds = 60 * 60;
  secondEl.innerText = "01:00:00";
});


btnStart.addEventListener("click", function() {
  const startFrom = remainingSeconds > 0 ? remainingSeconds : selectedSeconds;
  if (startFrom > 0) startCountdown(startFrom);
});

btnReset.addEventListener("click", function() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  remainingSeconds = 0;
  selectedSeconds = 0;
  isPaused = false;
  btnPause.innerText = "Pause";
  secondEl.innerText = "00:00:00";
});

let isPaused = false;

btnPause.addEventListener("click", function() {
  if (intervalId===null && !isPaused) {
    return;
  }

  if (!isPaused) {
    clearInterval(intervalId);
    intervalId = null;
    isPaused = true;
    btnPause.innerText = "Resume";
  } else {
    isPaused = false;
    btnPause.innerText = "Pause";
    startCountdown(remainingSeconds);
  }
});


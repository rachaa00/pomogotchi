
// as of now, i just want to create a timer of 30 seconds when i click on the button and when the 30s are done, i want a string that say time is up.
// then i will add all the basic functionalities 
// then i will do the design 


const secondEl = document.getElementById('timer');


let second = Number(secondEl.innerText);

const btn15 = document.getElementById('btn15');
const btn30 = document.getElementById('btn30');
const btn60 = document.getElementById('btn60'); 
const btnStart = document.getElementById('btnStart');


// this funciton only will give me the message after the timer is up , so based on the timer i select the function will show the message. 
// so example if i selcted 60 mins then the function needs to show the message after 60 mins. 

//IMPORTANT: 
// instead of creating 1 single starttime function, i can create 3 different funcions for seconds, minutes and hours to then call all the 3 f them inside the starttimer function


//right code for countdown

let selectedSeconds = 0;

function startCountdown(totalSeconds) {
  const secondEl = document.getElementById('timer');
  let remaining = totalSeconds;

  const intervalId = setInterval(() => {
    if (remaining < 0) {
      clearInterval(intervalId);
      return;
    }

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    secondEl.innerText = `${h}:${m}:${s}`;
    console.log(`${h}:${m}:${s}`);

    remaining--; // passa 1 secondo
  }, 1000);
}

// Esempio: countdown di 1 ora
//startCountdown(60 * 60); // 3600 secondi



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
  if (selectedSeconds > 0) {
    startCountdown(selectedSeconds);
  }
});

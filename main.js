
// as of now, i just want to create a timer of 30 seconds when i click on the button and when the 30s are done, i want a string that say time is up.
// then i will add all the basic functionalities 
// then i will do the design 


const secondEl = document.getElementById('timer');
// const minuteEl = document.getElementById("minute");
// const hourEl = document.getElementById("hour");

let second = Number(secondEl.innerText);
// let minute = Number(minuteEl.innerText);
// let hour = Number(hourEl.innerText); 



// this funciton only will give me the message after the timer is up , so based on the timer i select the function will show the message. 
// so example if i selcted 60 mins then the function needs to show the message after 60 mins. 

//IMPORTANT: 
// instead of creating 1 single starttime function, i can create 3 different funcions for seconds, minutes and hours to then call all the 3 f them inside the starttimer function


//right code for countdown

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




// function startTimer() { // i need to do a while loop for seconds, one for minutes and one for hours , all inside the same function 

//     //tried while loop for hour
//     let count_hour= 0;
//     let delay_hour= 3600000;
    
//     while (count_hour<60) {
//         setTimeout(() => {
//             hour -=1;
//             hourEl.innerText = "0" + hour;  
//         }, delay_hour);
//         delay_hour += 3600000;
//         count_hour++;
//     }

//     let count_minute= 0;
//     let delay_minute= 3540000;
    
//     while (count_minute<60) {
//         setTimeout(() => {
//             minute -=1;
//             minuteEl.innerText = "0" + minute;  
//         }, delay_minute);
//         delay_minute += 3540000;
//         count_minute++;
//     }

//     let delay_second = 1000 
//     let count_second = 0

//     while (count_second<60) {
//         setTimeout(() => {
//             second-=1;
//             secondEl.innerText = second; 
//         }, delay_second);
//         delay_second += 1000;
//         count_second++;
//     }

// }


// console.log(typeof secondEl)







// i want now the actual timer that shows the time 


//function firstSecond() {
//    let second = "1"
//        setTimeout(() => {
//    timeEl.innerText = second;
//    }, 1000); 
//}



//for the seconds
   // setTimeout(() => {
   // time -=1;
   // timeEl.innerText = "0"+ time; //i cannot use the "0" becasue when then is double number what do i do? for sure there is a way to show it properly
   // console.log(time)
   // }, 1000); 


   // setTimeout(() => {
   // time -=1;
  //  timeEl.innerText = "0" + time; 
  //  console.log(time)
  //  }, 2000); 


  //  setTimeout(() => {
  // time -=1;
  //  timeEl.innerText = "0" + time; 
  //  console.log(time)
   // }, 3000); 


   // setTimeout(() => {
  //  time -=1;
   // timeEl.innerText = "0" + time; 
  //  console.log(time)
  //  }, 4000); 

    
   // setTimeout(() => {
   // time -=1;
  //  timeEl.innerText = "0" + time; 
  //  console.log(time)
  //  }, 5000); 



      // // tried setInterval for the minutes
    // const intervalId = setInterval(() => {
    //     minute-=1;
    //     minuteEl.innerText = "0" + minute;
    //     console.log(minute);
        
    //     if (minute<=0) {
    //         clearInterval(intervalId);
    //     }
    // }, 1000);
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';


let selectTime;
const startBtn = document.querySelector("button[data-start]");
const inputDatetime = document.querySelector("#datetime-picker");
const daysTime = document.querySelector("span[data-days]");
const hourTime = document.querySelector("span[data-hours]");
const minTime = document.querySelector("span[data-minutes]");
const secTime = document.querySelector("span[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            window.alert("Please choose a date in the future");
            selectedDates[0] = new Date();
          } else {
            startBtn.disabled = false;
            selectTime = selectedDates[0];
          }
    },
   
  };
  class Timer {
    constructor() {
      this.timerID = null;
      this.isActive = false;
      startBtn.disabled = true;
    } 

  
startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    startBtn.disabled = false;
    this.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectTime - currentTime;
      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      console.log(deltaTime);
      if (deltaTime <= 1000) {
        this.stopTimer();
      }
    }, 1000);
  }
  updateComponentsTimer({ days, hours, minutes, seconds }) {
    daysTime.textContent = days;
    hourTime.textContent = hours;
    minTime.textContent = minutes;
    secTime.textContent = seconds;
  }

  stopTimer() {
    clearInterval(this.timerID);
    
  }
};
 
  
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
     
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  function pad(value) {
    return String(value).padStart(2, '0');
  }

  const timer = new Timer();
flatpickr(inputDatetime, options);
startBtn.addEventListener('click', () => timer.startTimer());
  
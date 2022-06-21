const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const bodyEl = document.querySelector("body");
let intervalId = null; 

startBtn.addEventListener('click', onStyleBody);
stopBtn.addEventListener('click', offStyleBody);

function onStyleBody(evt) {
    intervalId = setInterval(() => {
   bodyEl.style.backgroundColor = getRandomHexColor();  
}, 1000, 1000);
if (startBtn.getAttribute('disabled')){
    startBtn.removeAttribute('disabled');
}else {
startBtn.setAttribute('disabled', true);
}
}
function offStyleBody(evt){
clearInterval(intervalId);
startBtn.removeAttribute('disabled');
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
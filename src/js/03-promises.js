import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector(".form");
console.log(form);



form.addEventListener("submit", onCreatPromis);


function onCreatPromis(evt){
  evt.preventDefault();
  
  let delay = Number(evt.currentTarget.delay.value);
  const step = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);
  if (delay <= 0 || step <= 0){
    return Notify.info('Please enter correct details');
  }

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
    setTimeout(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
    }, delay);
  })
  .catch(({ position, delay }) => {
    setTimeout(() => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
    }, delay);
  });
  delay += step;
    }
  };
  

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const obj = {position, delay};

  return new Promise((resolve, reject) => {
  if (shouldResolve) {
    resolve (obj);
    
} else {
  reject(obj);
  
 };
})
}
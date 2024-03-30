



let userSelectedDate;
let timeInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - options.defaultDate;
    if (timeInterval < 1) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
    } else {
      document.getElementById('start-btn').disabled = false;
      document.getElementById('datetime-picker').disabled = true;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const calendar = flatpickr('#datetime-picker', options);
const inputTime = document.getElementById('datetime-picker');
const startBtn = document.getElementById('start-btn');
const showTime = document.querySelectorAll('.value');

startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  const repeatTime = setInterval(() => {
    timeInterval = userSelectedDate - new Date();
    if (timeInterval < 1) {
      startBtn.disabled = true;
      inputTime.disabled = false;
      clearInterval(repeatTime);
      return;
    }
    const timer = convertMs(timeInterval);
    showTime[0].innerText = timer.days.toString().padStart(2, '0');
    showTime[1].innerText = timer.hours.toString().padStart(2, '0');
    showTime[2].innerText = timer.minutes.toString().padStart(2, '0');
    showTime[3].innerText = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});




// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// приклади методів 
// const date = new Date('03.24.2024 12:25:03')
// console.log(date.getDate()) //
// console.log(date.getDay())
// console.log(date.getFullYear())
// console.log(date.getHours())
// console.log(date.getMilliseconds())
// console.log(date.getMinutes())
// console.log(date.getMonth())
// console.log(date.getSeconds())
// console.log(date.getTime())
// console.log(date.getTimezoneOffset())


// приклади методів 

// const startBtn = document.querySelector('#start-btn')
// const stopBtn = document.querySelector('#stop-btn')
// const clockFace = document.querySelector('.clockface')

// let initTime = new Date('2025');
// let userTime = 0;

// startBtn.addEventListener('click', () => {
  

//    intervalId = setInterval(() => {
//         const currentTime = Date.now();
//         const diff = currentTime - initTime + userTime;
//         const time = formatTime(diff)
//         clockFace.textContent = time;
//     }, 1000)
// })

// stopBtn.addEventListener('click', () => {
//     clearInterval(intervalId);
//     userTime += Date.now() - initTime;
//     console.log(userTime)
// })



// const formatTime = milliseconds => {
//     const seconds = Math.floor((milliseconds / 1000) % 60);
//     const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
//     const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

//     return [
//         hours.toString().padStart(2, '0'),
//         minutes.toString().padStart(2, '0'),
//         seconds.toString().padStart(2, '0'),
//     ].join(':')
// }
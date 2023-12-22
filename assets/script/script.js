/* Code Made By LaturbDevs | Vitor Almeida */

const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
let intervalId = 0;
let timer = 0;
let marks = [];
let isTimerRunning = false;

const formatTime = (time) => {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const hundredths = time % 100;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const setTimer = (time) => {
  timerEl.innerText = formatTime(time);
}

const addMarkToList = (markIndex, markTime) => {
  marksList.innerHTML += `<p> ${markIndex}°  Marcação: ${formatTime(markTime)}</p>`;
}

const toggleTimer = () => {
  const button = document.getElementById('power');
  const action = button.getAttribute('action');

  clearInterval(intervalId);

  if (action == 'start' || action == 'continue') {
    intervalId = setInterval(() => {
      timer += 1;
      setTimer(timer);
    }, 10);
    button.setAttribute('action', 'pause');
    button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isTimerRunning = true;
  } else
  if (action == 'pause') {
    button.setAttribute('action', 'continue');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
    isTimerRunning = false;
  }
}

const markTime = () => {
  if (isTimerRunning) {
    marks.push(timer);
    addMarkToList(marks.length, timer);
  }
  else if (marks.length > 0 && marks[marks.length - 1] !== timer) {
    marks.push(timer);
    addMarkToList(marks.length, timer);
  }
}

const resetTimer = () => {
  clearInterval(intervalId);
  timer = 0;
  marks = [];
  setTimer(timer);
  marksList.innerHTML = '';
  const button = document.getElementById('power');
  button.setAttribute('action', 'start');
  button.innerHTML = '<i class="fa-solid fa-play"></i>';
  isTimerRunning = false;
  if (document.getElementById('mark').classList.contains('active')) {
    document.getElementById('mark').classList.remove('active');
  }
}

document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);
document.getElementById('reset').addEventListener('click', resetTimer);

function toggleTheme() {
  const stopwatch = document.querySelector('.stopwatch');
  const body = document.querySelector('body');
  stopwatch.classList.toggle('dark-theme');
  body.classList.toggle('dark-theme');
}
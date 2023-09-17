const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");

let h = 0;
let m = 0;
let s = 0;

let hours = h * 1000 * 60 * 60;
let minutes = m * 1000 * 60;
let seconds = s * 1000;

let setTime;
let timePoint;

let timerLoop = null;

function setTimeValues() {
  setTime = hours + minutes + seconds;
  timePoint = Date.now() + setTime;
}

function countdownTimer() {
  let currentTime = Date.now();
  let remainingTime = timePoint - currentTime;
  let angle = (remainingTime / setTime) * 360;

  // progress indicator

  if (angle > 180) {
    semicircles[0].style.transform = "rotate(180deg)";
    semicircles[1].style.transform = `rotate(${angle}deg)`;
    semicircles[2].style.display = "none";
  } else {
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
    semicircles[2].style.display = "block";
  }

  // timer

  let hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  );
  let mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  );
  let secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer.innerHTML = `
    <div>${hrs}</div>
    <div class="colon">:</div>
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
  `;

  // ending + color changer

  if (remainingTime < 6000) {
    semicircles[0].style.backgroundColor = "#FF9F1C";
    semicircles[1].style.backgroundColor = "#FF9F1C";
    timer.style.color = "#FF9F1C";

    if (remainingTime <= 0) {
      clearLoop();
    }
  }
}

function clearLoop() {
  clearInterval(timerLoop);
  timerLoop = null;

  semicircles[0].style.display = "none";
  semicircles[1].style.display = "none";
  semicircles[2].style.display = "none";
  timer.style.color = "#cbf3f0";

  timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    `;
  h = 0;
  m = 0;
  s = 0;

  start.style.backgroundColor = "#cbf3f0";
  start.style.color = "#2ec4b6";

  cancel.style.backgroundColor = "#adb5bd";
  cancel.style.color = "white";
}

function setRunningStyles() {
  semicircles[0].style.display = "block";
  semicircles[1].style.display = "block";
  semicircles[2].style.display = "block";
  semicircles[0].style.backgroundColor = "#2ec4b6";
  semicircles[1].style.backgroundColor = "#2ec4b6";
  timer.style.color = "#2ec4b6";

  start.style.backgroundColor = "#adb5bd";
  start.style.color = "white";

  cancel.style.backgroundColor = "#FFBF69";
  cancel.style.color = "#ff9500";
}

// time-selector

const hScroll = document.querySelector(".hours-selector");
const mScroll = document.querySelector(".minutes-selector");
const sScroll = document.querySelector(".seconds-selector");

// координаты центрального элемента скролла

let hCoords = {};
let mCoords = {};
let sCoords = {};

function getCoords(elem, coords) {
  let box = elem.getBoundingClientRect();

  coords.top = box.top + window.pageYOffset;
  coords.bottom = box.bottom + window.pageYOffset;
  coords.left = box.left + window.pageXOffset;
  coords.right = box.right + window.pageXOffset;
  coords.centerX = box.left + box.width / 2;
  coords.centerY = box.top + box.height / 2;
}

getCoords(hScroll, hCoords);
getCoords(mScroll, mCoords);
getCoords(sScroll, sCoords);

// стилизация центрального элемента скролла

function stlMidScroll(coords) {
  let elem = document.elementFromPoint(coords.centerX, coords.centerY);

  elem.previousElementSibling.style.color = "#6C757D";
  elem.nextElementSibling.style.color = "#6C757D";
  elem.style.color = "white";
  console.log(coords.centerX, coords.centerY);

  return +elem.innerHTML;
}

stlMidScroll(hCoords);
stlMidScroll(mCoords);
stlMidScroll(sCoords);

// события на скроллах

hScroll.addEventListener("scroll", function (event) {
  h = stlMidScroll(hCoords);
  hours = h * 1000 * 60 * 60;
});

mScroll.addEventListener("scroll", function () {
  m = stlMidScroll(mCoords);
  minutes = m * 1000 * 60;
});

sScroll.addEventListener("scroll", function () {
  s = stlMidScroll(sCoords);
  seconds = s * 1000;
});

// стилизация

// кнопки Cancel Start

const cancel = document.querySelector(".cancel");
const start = document.querySelector(".start");

cancel.onclick = function () {
  clearLoop();
  hScroll.scrollTo(0, 0);
  mScroll.scrollTo(0, 0);
  sScroll.scrollTo(0, 0);
};

start.onclick = function () {
  if (timerLoop) {
    return;
  }
  setTimeValues();
  setRunningStyles();
  timerLoop = setInterval(countdownTimer);
  hScroll.scrollTo(0, 0);
  mScroll.scrollTo(0, 0);
  sScroll.scrollTo(0, 0);
};

// скрытие и отоборажение таймера

// const layout2 = document.querySelectorAll(".layout-2");
// for (let i = 0; i < layout2.length; i++) {
//   layout2[i].style.display = "none";
// }

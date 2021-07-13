const flip = document.querySelectorAll(".cards__card__flip div");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const h2 = document.querySelectorAll(".cards__card div h2");
console.log(h2);
flip.forEach((element) => {
  console.log(element);
  element.addEventListener("animationend", () => {
    element.classList.remove("rotate");
  });
});

class LocalStorage {
  static setLocalStorage(value) {
    localStorage.setItem("launchDate", value);
  }
  static getLocalStorage() {
    return localStorage.getItem("launchDate")
      ? localStorage.getItem("launchDate")
      : null;
  }
}

class Timer {
  constructor() {
    this.launchDate = LocalStorage.getLocalStorage();
    this.days = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;
  }

  getLaunchDate() {
    console.log(this.launchDate);
    if (!this.launchDate) {
      console.log("went off");
      //Convert current date into seconds and add 10 days.
      this.launchDate = new Date().getTime() / 1000 + 864000;
      LocalStorage.setLocalStorage(this.launchDate);
    }
  }

  getDays() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.days = Math.floor((this.launchDate - temp) / 86400);
  }

  getHours() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.hours = Math.floor(
      (this.launchDate - temp - this.days * 86400) / 3600
    );
  }

  getMinutes() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.minutes = Math.floor(
      (this.launchDate - temp - this.days * 86400 - this.hours * 3600) / 60
    );
  }

  getSeconds() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.seconds = Math.floor(
      this.launchDate -
        temp -
        this.days * 86400 -
        this.hours * 3600 -
        this.minutes * 60
    );
  }

  countDown() {
    this.getDays();
    this.getHours();
    this.getMinutes();
    this.getSeconds();
  }
}

class Clock {
  // constructor(dayCard, hourCard, minuteCard, secondCard, timer) {
  //   this.dayCard = dayCard;
  //   this.hourCard = hourCard;
  //   this.minuteCard = minuteCard;
  //   this.secondCard = secondCard;
  //   this.timer = timer;
  // }

  getDOMElements() {
    this.secondsFlip = document.querySelector(
      "#seconds .cards__card__flip div"
    );
    this.secondsBefore = document.querySelector("#seconds .number__before");
    this.secondsAfter = document.querySelectorAll("#seconds .number__after");
    console.log(this.secondsBefore, this.secondsAfter);
  }

  updateDOMClock() {
    this.secondsBefore.innerText = timer.seconds - 1;
    this.secondsAfter.forEach((element) => {
      element.innerText = timer.seconds;
    });
  }

  animateCard(card) {
    console.log(card);
    card.classList.add("rotate");
  }
}

const timer = new Timer();
timer.getLaunchDate();
// const clock = new Clock(
//   document.getElementById("days"),
//   document.getElementById("hours"),
//   document.getElementById("minutes"),
//   document.getElementById("seconds"),
//   timer
// );
const clock = new Clock();
clock.getDOMElements();

window.setInterval(function () {
  timer.countDown();
  clock.animateCard(clock.secondsFlip);
  clock.updateDOMClock();
}, 1000);

// this.dayCard.childNodes[1].innerText =
//   timer.days < 10 ? `0${timer.days}` : timer.days;
// this.dayCard.childNodes[3].innerText =
//   timer.days < 10 ? `0${timer.days}` : timer.days;
// console.log(this.dayCard.childNodes);

// flip.classList.add("rotate");

// this.dayCard.innerText = timer.days < 10 ? `0${timer.days}` : timer.days;
// this.hourCard.innerText =
//   timer.hours < 10 ? `0${timer.hours}` : timer.hours;
// this.minuteCard.innerText =
//   timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
// this.secondCard.innerText =
//   timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;

// h2.forEach((item) => {
//   item.innerText = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
// });

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
  constructor(dayCard, hourCard, minuteCard, secondCard, timer) {
    this.dayCard = dayCard;
    this.hourCard = hourCard;
    this.minuteCard = minuteCard;
    this.secondCard = secondCard;
    this.timer = timer;
  }

  updateDOMClock() {
    this.dayCard.innerText = timer.days < 10 ? `0${timer.days}` : timer.days;
    this.hourCard.innerText =
      timer.hours < 10 ? `0${timer.hours}` : timer.hours;
    this.minuteCard.innerText =
      timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
    this.secondCard.innerText =
      timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
  }
}

const timer = new Timer();
const clock = new Clock(
  document.getElementById("days"),
  document.getElementById("hours"),
  document.getElementById("minutes"),
  document.getElementById("seconds"),
  timer
);

window.setInterval(function () {
  timer.countDown();
  clock.updateDOMClock();
}, 1000);

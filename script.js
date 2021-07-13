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
      //Convert current date into seconds and add 10 days.
      this.launchDate = new Date().getTime() / 1000 + 864000;
      LocalStorage.setLocalStorage(this.launchDate);
    }
  }

  getDays() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.days = Math.floor((this.launchDate - temp) / 86400);
    return this.days;
  }

  getHours() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.hours = Math.floor(
      (this.launchDate - temp - this.days * 86400) / 3600
    );
    return this.hours;
  }

  getMinutes() {
    if (!this.launchDate) return;
    const temp = new Date().getTime() / 1000;
    this.minutes = Math.floor(
      (this.launchDate - temp - this.days * 86400 - this.hours * 3600) / 60
    );
    return this.minutes;
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
    return Math.floor(
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
  constructor(timer) {
    this.timer = timer;
    this.days = document.getElementById("days");
    this.hours = document.getElementById("hours");
    this.minutes = document.getElementById("minutes");
    this.seconds = document.getElementById("seconds");
  }

  flip(unit, number) {
    //store the current number data atribute value
    const current = this[unit].dataset.number;

    //set the data attribute to new number
    this[unit].dataset.number = number;

    //set the front data-content to the current number
    this[unit].querySelector(".front").dataset.content = current;

    //set back and under data-content to new number
    this[unit].querySelectorAll(".back, .under").forEach((element) => {
      element.dataset.content = number;
    });

    //set .flap to display block
    this[unit].querySelectorAll(".flap").forEach((element) => {
      element.style.display = "block";
    });

    setTimeout(function () {
      this[unit].querySelector(".base").innerText = number;
      this[unit]
        .querySelectorAll(".flap")
        .forEach((element) => (element.style.display = "none"));
    }, 350);
  }

  jumpTo(unit, number) {
    this[unit].dataset.number = number;
    this[unit].querySelector(".base").innerText = number;
  }

  updateDOM(unit, number, flip) {
    number = String(number);
    //prepend 0 if only one digit
    if (number.length === 1) number = `0${number}`;

    //if the unit number doesnt equal the input number
    if (this[unit].dataset.number !== number) {
      if (flip) this.flip(unit, number);
      else this.jumpTo(unit, number);
    }
  }

  startTime(flip) {
    this.updateDOM("days", this.timer.getDays(), flip);
    this.updateDOM("hours", this.timer.getHours(), flip);
    this.updateDOM("minutes", this.timer.getMinutes(), flip);
    this.updateDOM("seconds", this.timer.getSeconds(), flip);
  }
}

const timer = new Timer();
timer.getLaunchDate;
const clock = new Clock(timer);

clock.startTime(false);
setInterval(function () {
  clock.startTime(true);
}, 1000);

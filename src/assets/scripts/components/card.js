'use strict';
const dynamics = require('dynamics.js');
const forEach = require('lodash/forEach');

class Card {
  constructor() {
    this.fc = document.querySelectorAll(".cards");
    this.defaultLightWidth = 40;
    this.defaultLightAngle = 45;
    this.maxRotateX = 10;
    this.maxRotateY = 10;
    this.maxLightWidth = 25;
    this.maxLightAngle = 20;
    this.lightValue = {
      width: this.defaultLightWidth,
      angle: this.defaultLightAngle
    };

    forEach(this.fc, el => {
      this.init(el);
    });
  }
};

Card.prototype.init = function (el) {
  let info = {
    'el': el,
    'fcHalfHeight': el.firstElementChild.getBoundingClientRect().height/2,
    'fcHalfWidth': el.firstElementChild.getBoundingClientRect().width/2
  }
  this.wrapper = info.el.querySelectorAll(".card__wrapper");
  this.eventsManager(info);
};

Card.prototype.eventsManager = function (card) {
  forEach(this.wrapper, el => {
    let light = el.querySelector(".card__light");
    this.onMouseMoveFn = this.onMouseMove.bind(this, el, card, light);
    this.onMouseLeaveFn = this.onMouseLeave.bind(this, el, light);
    el.addEventListener("mousemove", this.onMouseMoveFn);
    el.addEventListener("mouseleave", this.onMouseLeaveFn);
  });
};

Card.prototype.onMouseMove = function (el, card, light, event) {
  // Get mouse position
  let mouseX = (event.layerX) || 0;
  let mouseY = (event.layerY) || 0;

  // Move the floating card
  let diffX = -1 * (card.fcHalfWidth - mouseX);
  let diffY = card.fcHalfHeight - mouseY;
  let rotateX = diffY / card.fcHalfHeight * this.maxRotateX;
  let rotateY = diffX / card.fcHalfWidth * this.maxRotateY;

  if(el.classList.contains('portfolio__item__card')) {
    rotateX = diffY / card.fcHalfHeight;
    rotateY = diffX / card.fcHalfWidth;
  }
  dynamics.stop(el);
  el.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

  // Move the light
  this.lightValue.width = this.defaultLightWidth - (diffY / card.fcHalfHeight * this.maxLightWidth);
  this.lightValue.angle = this.defaultLightAngle + (diffX / card.fcHalfWidth * this.maxLightAngle);

  light.style.backgroundImage = "linear-gradient(" + this.lightValue.angle + "deg, rgba(0,0,0,.2), transparent " + this.lightValue.width + "%)";
};

Card.prototype.onMouseLeave = function (el, light) {
  let lightValue = this.lightValue;
  dynamics.animate(el, {
    rotateX: 0,
    rotateY: 0
  }, {
    type: dynamics.spring,
    duration: 1500
  });

  dynamics.animate(lightValue, {
    width: this.defaultLightWidth,
    angle: this.defaultLightAngle
  }, {
    type: dynamics.spring,
    duration: 1500,
    change: obj => {
      light.style.backgroundImage = "linear-gradient(" + obj.angle + "deg, rgba(0,0,0,.2), transparent " + obj.angle + "%)";
    }
  });
};

module.exports = Card;

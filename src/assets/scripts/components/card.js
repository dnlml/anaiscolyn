'use strict';
const dynamics = require('dynamics.js');
const Lethargy = require('lethargy').Lethargy;

class Card {
  constructor() {

    this.fc = document.querySelector(".about__img");
    this.wrapper = this.fc.querySelectorAll(".about__img__wrapper")[0];
    this.light = this.fc.querySelectorAll(".about__img__light")[0];
    this.fcHalfHeight = 300/2;
    this.fcHalfWidth = 215/2;
    this.defaultLightWidth = 40;
    this.defaultLightAngle = 45;
    this.maxRotateX = 10;
    this.maxRotateY = 10;
    this.maxLightWidth = 25;
    this.maxLightAngle = 20;
    this.ticking = false;
    this.lightValue = {
      width: this.defaultLightWidth,
      angle: this.defaultLightAngle
    };

    this.init();
  }
};

Card.prototype.init = function () {
  this.eventsManager();
  this.lethargy = new Lethargy();
};

Card.prototype.eventsManager = function () {
  this.onMouseMoveFn = this.onMouseMove.bind(this);
  this.onMouseLeaveFn = this.onMouseLeave.bind(this);
  this.onScrollFn = this.onScroll.bind(this);
  this.wrapper.addEventListener("mousemove", this.onMouseMoveFn);
  this.wrapper.addEventListener("mouseleave", this.onMouseLeaveFn);
  // window.addEventListener("mousewheel", this.onScrollFn);
};

Card.prototype.onMouseMove = function (event) {
  // Get mouse position
  let fcRect = this.fc.getBoundingClientRect();
  let fcOffset = {
    top: fcRect.top + document.body.scrollTop,
    left: fcRect.left + document.body.scrollLeft
  };
  let mouseX = (event.pageX - fcOffset.left) | 0;
  let mouseY = (event.pageY - fcOffset.top) | 0;

  // Move the floating card
  let diffX = -1 * (this.fcHalfWidth - mouseX);
  let diffY = this.fcHalfHeight - mouseY;
  let rotateX = diffY / this.fcHalfHeight * this.maxRotateX;
  let rotateY = diffX / this.fcHalfWidth * this.maxRotateY;

  dynamics.stop(this.wrapper);
  this.wrapper.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

  // Move the light
  this.lightValue.width = this.defaultLightWidth - (diffY / this.fcHalfHeight * this.maxLightWidth);
  this.lightValue.angle = this.defaultLightAngle + (diffX / this.fcHalfWidth * this.maxLightAngle);

  dynamics.stop(this.lightValue);
  this.light.style.backgroundImage = "linear-gradient(" + this.lightValue.angle + "deg, rgba(0,0,0,.2), transparent " + this.lightValue.width + "%)";
};

Card.prototype.onMouseLeave = function () {
  // Move the floating card to its initial position
  dynamics.animate(this.wrapper, {
    rotateX: 0,
    rotateY: 0
  }, {
    type: dynamics.spring,
    duration: 1500
  });

  // Move the light to its initial position
  dynamics.animate(this.lightValue, {
    width: this.defaultLightWidth,
    angle: this.defaultLightAngle
  }, {
    type: dynamics.spring,
    duration: 1500,
    change: function(obj) {
      this.light.style.backgroundImage = "linear-gradient(" + obj.angle + "deg, rgba(0,0,0,.2), transparent " + obj.width + "%)";
    }.bind(this)
  });
};

Card.prototype.onScroll = function (event) {
  if (this.ticking){
    requestAnimationFrame(this.inertia.bind(this, event));
  }

  this.ticking = true;
  this.wrapper.style.transform = "rotateX(0deg)";
};

Card.prototype.inertia = function (e) {
  let dir = e.wheelDelta < 0 ? -1 : 1;

  if(dir === -1) {
    this.wrapper.style.transform = "rotateX(" + e.deltaY + "deg)";
  }else if (dir === 1) {
    this.wrapper.style.transform = "rotateX(" + -1*e.deltaY + "deg)";
  }

  this.ticking = false;
};

module.exports = Card;

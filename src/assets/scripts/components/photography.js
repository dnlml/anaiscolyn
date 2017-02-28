'use strict';
const dynamics = require('dynamics.js');

class Photography {
  constructor () {
    this.photography = document.querySelector('[data-photography-item]');

    if (!this.photography) return;

    this.init();
  }
};

Photography.prototype.init = function () {
  this.isOpen = false;
  this.duration = this.delay = 400;
  this.onResize();
  this.eventsManager();
};

Photography.prototype.eventsManager = function () {
  this.onClickFn = this.onClick.bind(this);
  this.onResizeFn = this.onResize.bind(this);
  this.photography.addEventListener('click', this.onClickFn, false);
  window.addEventListener('resize', this.onResizeFn, false);
};

Photography.prototype.onClick = function (event) {
  let el = event.target;
  this.openSlider(el.dataset.photographyItem);
};

Photography.prototype.openSlider = function (id) {
  this.id = id;
  this.curtain = document.querySelector(`[data-slider-container="${this.id}"]`);
  this.closeBtn = this.curtain.querySelector('[data-close-slider]');
  this.slider = this.curtain.querySelector('[data-slider-list]');

  this.closeSliderFn = this.closeSlider.bind(this);
  if(!this.curtain) return;

  this.dynamicsAnimate(this.curtain, 0, this.duration, 0, () => {
    this.setCurtainOpen(true);
    this.slider.classList.add('open');
    this.curtain.addEventListener('click', this.closeSliderFn, false);
    window.addEventListener('keyup', this.closeSliderFn, false);
  });
};

Photography.prototype.closeSlider = function (event) {
  if (event.target.classList.contains('slider-wrapper') ||
      event.target.classList.contains('slider__close')  ||
      event.which === 27) {
    this.slider.classList.remove('open');
    this.dynamicsAnimate(this.curtain, -this.clientHeight,this.duration, this.delay, () => {
      this.setCurtainOpen(false);
      this.curtain.removeEventListener('click', this.closeSliderFn);
      window.removeEventListener('keyup', this.closeSliderFn);
      this.closeBtn.removeEventListener('click', this.closeSliderFn);
      window.slides[this.id].select(0);
    });
  }
};

Photography.prototype.onResize = function () {
  this.clientWidth = window.innerWidth;
  this.clientHeight = window.innerHeight;
  if (this.isOpen) {
    this.dynamicsAnimate(this.curtain, this.clientHeight, 0);
  }
};

Photography.prototype.dynamicsAnimate = function (curtain, goTo, duration, delay = 0, callback = () => {}) {
  dynamics.animate(curtain, {
    translateY: goTo
  },{
    type: dynamics.easeOut,
    duration: duration,
    delay: delay,
    complete: callback
  });
};

Photography.prototype.setCurtainOpen = function (bool) {
  this.isOpen = bool;
};


module.exports = Photography;

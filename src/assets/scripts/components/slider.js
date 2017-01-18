'use strict';
const Flickity = require('flickity');
const forEach = require('lodash/forEach');

class Slider {
  constructor() {
    this.sliders = document.querySelectorAll('[data-slider-list]');
    if(!this.sliders.length) return;

    this.init();
  }
};

Slider.prototype.init = function () {
  forEach(this.sliders, elem => {
    let flkty = new Flickity( elem, {
      // options
      cellAlign: 'center',
      contain: true,
      pageDots: false
    });
  });
};

module.exports = Slider;

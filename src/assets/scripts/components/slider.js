'use strict';
const Flickity = require('flickity-imagesloaded');
const forEach = require('lodash/forEach');

class Slider {
  constructor() {
    this.sliders = document.querySelectorAll('.js-slider-list');
    if(!this.sliders.length) return;

    this.init();
  }
};

Slider.prototype.init = function () {
  this.slides = [];
  forEach(this.sliders, (elem, i) => {
    let flkty = '';
    if(i === 5 ) {
      // slider of photography
      flkty = new Flickity( elem, {
        // options
        cellAlign: 'center',
        pageDots: false,
        imagesLoaded: true
      });
    } else {
      flkty = new Flickity( elem, {
        // options
        cellAlign: 'center',
        contain: true,
        pageDots: false,
        imagesLoaded: true
      });
    }

    this.slides.push(flkty);
  });

  window.slides = this.slides;
};


module.exports = Slider;

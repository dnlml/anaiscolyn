const WebFont = require('webfontloader');
const Card = require('./components/card.js');
const FlipLetter = require('./components/flipLetter.js');
const Header = require('./components/header.js');
const Portfolio = require('./components/portfolio.js');
const Photography = require('./components/photography.js');
const Slider = require('./components/slider.js');
const ScrollTo = require('./components/scrollTo.js');

class App {
  constructor () {
    this.init();
  }
}

App.prototype.init = function () {
  new Card();
  new FlipLetter();
  new Header();
  new Slider();
  new Portfolio();
  new Photography();
  new ScrollTo();
}

document.addEventListener('DOMContentLoaded', function () {
  WebFont.load({
    custom: {
      families: ['FreightBig', 'Ano']
    },
    active: function () {
      new App();
    },
    inactive: function () {
      new App();
    }
  });
});

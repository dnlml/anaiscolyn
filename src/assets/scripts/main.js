const WebFont = require('webfontloader');
const Card = require('./components/card.js');
const FlipLetter = require('./components/flipLetter.js');
const Header = require('./components/header.js');
const Portfolio = require('./components/portfolio.js');
const Slider = require('./components/slider.js');

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

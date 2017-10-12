const WebFont = require('webfontloader');
const Header = require('./components/header.js');
const Portfolio = require('./components/portfolio.js');
const Photography = require('./components/photography.js');
const Slider = require('./components/slider.js');

class App {
  constructor () {
    this.init();
  }
}

App.prototype.init = function () {
  new Header();
  new Slider();
  new Portfolio();
  new Photography();
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

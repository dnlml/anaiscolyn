const WebFont = require('webfontloader');
const Card = require('./components/card.js');
const FlipLetter = require('./components/flipLetter.js');
const Header = require('./components/header.js');

class App {
  constructor () {
    this.init();
  }
}

App.prototype.init = function () {
  console.log('App: init');
  new Card();
  new FlipLetter();
  new Header();
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

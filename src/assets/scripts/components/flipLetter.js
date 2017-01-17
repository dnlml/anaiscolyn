'use strict';

class FlipLetter {
  constructor () {
    this.word = document.querySelector('[data-flip]');

    if(!this.word) return;

    this.init();
  }
};

FlipLetter.prototype.init = function (){
  this.prepareWord();
};

FlipLetter.prototype.prepareWord = function () {
  let letters = this.word.textContent.split('');
  letters = letters.map(letter => `<span class="header__subtitle__letter">${letter}</span>`);
  letters = letters.join('');
  this.word.innerHTML = letters;
  setTimeout(this.animate.bind(this), 200);
};

FlipLetter.prototype.animate = function() {
  this.word.classList.add('animate');
};

module.exports = FlipLetter;

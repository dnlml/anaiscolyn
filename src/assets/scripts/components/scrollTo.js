'use strict';

require('smoothscroll-polyfill').polyfill();

class ScrollTo {
  constructor () {
    this.btn = document.querySelector('[data-scroll-down]');
    this.targetId = this.btn.dataset.scrollDown;
    this.target = document.querySelector('#'+this.targetId);
    if(!this.btn) return;
    this.init();
  }
};

ScrollTo.prototype.init = function () {
  this.eventManager();
};

ScrollTo.prototype.eventManager = function () {
  this.onClickFn = this.onclick.bind(this);
  this.btn.addEventListener('click', this.onClickFn);
};

ScrollTo.prototype.onclick = function () {
  this.target.scrollIntoView({ behavior: 'smooth' });
};

module.exports = ScrollTo;

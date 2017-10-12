'use strict';
const THREE = require('three');

class Header {
  constructor () {
    this.header = document.querySelector('.js-header');
    if(!this.header) return;
    this.init();
  }
};

Header.prototype.init = function () {
  this.SEPARATION = 100;
  this.AMOUNTX = 50;
  this.AMOUNTY = 50;
  this.container;
  this.camera;
  this.scene;
  this.renderer;
  this.particle;
  this.mouseX = 0
  this.mouseY = 0;
  this.windowHalfX = window.innerWidth / 2;
  this.windowHalfY = window.innerHeight / 2;
  this.start();
  this.animate();
}

Header.prototype.start = function () {
  // Set the env and add the particles
  this.container = document.createElement('div');
  this.container.classList.add('header__bg');
  this.header.appendChild(this.container);
  this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.position.z = 1000;
  this.scene = new THREE.Scene();
  var material = new THREE.SpriteMaterial({color: 0xFC9A7C});
  for (var ix = 0; ix < this.AMOUNTX; ix++) {
    for (var iy = 0; iy < this.AMOUNTY; iy++) {
      this.particle = new THREE.Sprite(material);
      this.particle.scale.y = 10;
      this.particle.scale.x = 2;
      this.particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2);
      this.particle.position.z = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2);
      this.scene.add(this.particle);
    }
  }
  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.container.appendChild(this.renderer.domElement);

  this.eventsManager();
};

Header.prototype.eventsManager = function () {
  this.header.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
  window.addEventListener('resize', this.onWindowResize.bind(this), false);
};

Header.prototype.onWindowResize = function () {
  this.windowHalfX = window.innerWidth / 2;
  this.windowHalfY = window.innerHeight / 2;
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
};

Header.prototype.onDocumentMouseMove = function (event) {
  this.mouseX = event.clientX - this.windowHalfX;
  this.mouseY = event.clientY - this.windowHalfY;
};

Header.prototype.onDocumentTouchStart = function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
    this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
    this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
  }
};

Header.prototype.onDocumentTouchMove = function (event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
    this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
  }
};

Header.prototype.animate = function () {
  this.animateFn = this.animate.bind(this);
  requestAnimationFrame(this.animateFn);
  this.render();
};

Header.prototype.render = function () {
  this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
  this.camera.position.y += (- this.mouseY - this.camera.position.y) * .05;
  this.camera.lookAt(this.scene.position);
  this.renderer.render(this.scene, this.camera);
};

module.exports = Header;

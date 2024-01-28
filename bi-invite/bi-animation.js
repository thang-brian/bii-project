const confettiShower = [];
const numConfettis = 50;
const container = document.querySelector(".c-confetti-area");
const colors = [ "#f2abe7", "#9fa3ec", "#86d2e1 ", "#fec31e "];
const steps = document.querySelectorAll('.c-print__step');
let currentStepIndex = 0;
let arrived = false;
class Confetti {
  constructor(x, y, w, h, c) {
    this.w = Math.floor(Math.random() * 10 + 5);
    this.h = this.w * 1;
    this.x = Math.floor(Math.random() * 100);
    this.y = Math.floor(Math.random() * 100);
    this.c = colors[Math.floor(Math.random() * colors.length)];
  }
  css() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.confetti:nth-child(' + this.i + ') .askew { -webkit-animation-duration: ' + this.d + 's; animation-duration: ' + this.d + 's; -webkit-animation-delay: ' + this.dd + 's; animation-delay: ' + this.dd + 's; } .confetti:nth-child(' + this.i + ') .rotate { -webkit-animation-duration: ' + this.d + 's; animation-duration: ' + this.d + 's; -webkit-animation-delay: ' + this.dd + 's; animation-delay: ' + this.dd + 's; }';
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  create() {
    var newConfetti = '<div class="confetti" style="bottom:' + this.y + '%; left:' + this.x + '%;width:' +
    this.w + 'px; height:' + this.h + 'px;"><div class="rotate"><div class="askew" style="background-color:' + this.c + '"></div></div></div>';
    container.insertAdjacentHTML("afterbegin", newConfetti);
    this.i = container.querySelectorAll('.confetti').length;
    this.d = Math.random() * 10 + 5;
    this.dd = Math.random() * 5;
    this.css();
  }}
;
var AnimationModule = (function () {
  function initialize() {
  }
  function animateConfetti() {
    for (var i = 1; i <= numConfettis; i++) {
      var confetti = new Confetti();
      confetti.create();
    }
    var confettis = document.querySelectorAll('.confetti');
    for (var i = 0; i < confettis.length; i++) {
      var opacity = Math.random() + 0.1;
      var animated = confettis[i].animate([
      { transform: 'translate3d(0,0,0)', opacity: opacity },
      { transform: 'translate3d(20vw,100vh,0)', opacity: 1 }],
      {
        duration: Math.random() * 3000 + 3000,
        iterations: Infinity,
        delay: -(Math.random() * 5000) });
  
      confettiShower.push(animated);
    }
  }
  function changeColor() {
      steps[currentStepIndex].classList.remove('active');
      currentStepIndex = (currentStepIndex + 1) % steps.length;
      if (currentStepIndex == 0) {
          steps.forEach(step => {
              step.classList.remove('arrived');
          });
      }
  }
  window.addEventListener("scroll", initialize);
  window.addEventListener("load", initialize);
  document.addEventListener("DOMContentLoaded", function () {
    if (container) {
      animateConfetti();
    }
    setInterval(changeColor, 3000);
  });
  return { initialize: initialize };
})();
AnimationModule.initialize();

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000; 
  this.txt = '';
  this.isTyping = false;
  this.tick();
  this.cursorVisible = true;
  this.toggleCursor();
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (!this.isTyping) {
    this.txt = ''; 
    this.isTyping = true;
  }

  this.txt += fullTxt.charAt(this.txt.length); 

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  if (this.txt === fullTxt) {
    this.isTyping = false; 
    setTimeout(function() {
      that.loopNum++;
      that.tick();
    }, this.period);
  } else {
    setTimeout(function() {
      that.tick();
    }, 12); 
  }
};

TxtType.prototype.toggleCursor = function() {
  var that = this;
  setInterval(function() {
    that.cursorVisible = !that.cursorVisible;
    that.el.querySelector('.wrap').style.borderRight = that.cursorVisible ? '0.08em solid #6C757D' : 'transparent';
  }, 500);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period'); 
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #6C757D}";
  document.body.appendChild(css);
};


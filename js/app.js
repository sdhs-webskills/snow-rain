const canva = document.querySelector('#canvas');
const canvas = canva.getContext("2d");
const windowW = canva.width = window.innerWidth;
const windowH = canva.height = window.innerHeight;
const inputBox = document.querySelector('#input_box');
const size = document.querySelector('#size');
const speed = document.querySelector('#speed');
const shake = document.querySelector('#shake');
const num = document.querySelector('#num');

inputBox.addEventListener('click', function() {
  snowy(size.value, speed.value, shake.value, num.value);
})

canva.addEventListener('resize', function () {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
});


snowy(10, 10, 1, 100);

function snowy(sz, sp, sk, num) {
  let snow, arr = [];
  let ciec = {
    num: num,
    mv: 10,
    min: 1,
    ss: sk,
  }
  for (let i = 0; i < ciec.num; ++i) {
    snow = new Make();
    snow.opop = Math.random() * 1
    snow.y = Math.random() * (windowH + 50);
    snow.x = Math.random() * windowW;
    snow.t = Math.random() * (Math.PI * 2);
    snow.sz = Math.random() * sz;
    snow.sp = Math.random() * sp;
    snow.sp = snow.sp < ciec.min ? ciec.min : snow.sp;
    arr.push(snow);
  }

  Animat();

  function Animat() {
    window.requestAnimationFrame(Animat);
    canvas.clearRect(0, 0, windowW, windowH);
    canvas.fillStyle = '#000';
    canvas.fillRect(0, 0, windowW, windowH);
    canvas.fill();
    for (let i = 0; i < arr.length; ++i) {
      snowArr = arr[i];
      if (snowArr.y < windowH - snowArr.sz) {
        snowArr.t += .05;
        snowArr.t = snowArr.t >= Math.PI * 2 ? 0 : snowArr.t;
        snowArr.y += snowArr.sp;
        snowArr.x += Math.sin(snowArr.t * 1) * ciec.ss;
        if (snowArr.x > windowW + ciec.mv) {
          snowArr.x = -ciec.mv;
        }
        if (snowArr.x < -ciec.mv) {
          snowArr.x = windowW + ciec.mv;
        }
      } else {
        snowArr.sz -= 0.1;
        if (snowArr.sz <= 0) {
          snowArr.x = Math.random() * windowW;
          snowArr.y = 10;
          snowArr.sz = Math.random() * sz;
        }
      }
      snowArr.draw();
    }
  }

};

function Make() {
  this.draw = function () {
    canvas.moveTo(this.x, this.y);
    canvas.fillStyle = `rgba(255, 255, 255, ${this.opop})`;
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
    canvas.fill();
  }
}
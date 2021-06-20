let canva = document.querySelector('#canvas');
let canvas= canva.getContext("2d");
let windowW = canva.width = window.innerWidth;  
let windowH = canva.height = window.innerHeight;
const inputBox = document.querySelector('#input_box');
const size = document.querySelector('#size');
const speed = document.querySelector('#speed');
const shake = document.querySelector('#shake');

inputBox.addEventListener('click', function () {
  
  
  Snowy(size.value,speed.value, shake.value);

})

window.addEventListener('resize', function () {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
});


Snowy(10, 10, 2);
function Snowy(sz, sp, sk) {
  let snow, arr = [];
  let num = 100
  let mv = 10 
  let min = 1;
  let ss = sk;
  for (let i = 0; i < num; ++i) {
    snow = new Make();
    snow.y = Math.random() * (windowH + 50);
    snow.x = Math.random() * windowW;
    snow.t = Math.random() * (Math.PI * 2);
    snow.sz = Math.random() *  sz;
    snow.sp =  Math.random() * sp;
    snow.sp = snow.sp < min ? min : snow.sp;
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
      snowArr.y += snowArr.sp;
      snowArr.x += Math.sin(snowArr.t) * ss;
      if (snowArr.y > windowH + 50) snowArr.y = Math.random() * mv;
      snowArr.draw();
    }
  }
  
};
function Make() {
  this.draw = function () {
    this.g = canvas.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
    this.g.addColorStop(0, '#fff');
    this.g.addColorStop(1, 'rgba(253, 253, 253, 0.1)');
    canvas.moveTo(this.x, this.y);
    console.log(this.g)
    canvas.fillStyle = this.g;
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
    canvas.fill();
  }
}






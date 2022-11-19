/*
1. const var 선언
2. let var 선언
3. 기타 나머지 function 선언
4. eventListenr function 선언
5. eve function 선언
6. init 선언
7. window.onload = init();

네이밍은 constCase
함수는 arrow function ( _ => {} )
== 대신 무조건 ===
함수 파라미터는 무조건 3개 이하
삼항연산자를 많이 쓰자
함수의 로직 같이 흐름이 있는 부분은 if 문을, 값의 선언 같은 부분은 삼항연산자
이벤트리스너 함수 네이밍은 handle* or on* (handleBtnClick, onBtnClick)
증가하는 값을 조건에 넣을땐 값이 어떤 값보다 작을때 말고 클때로 조건을 걸자
전역값은 파라미터에 넘기지 말자
변경되지 않는 값은 const
변경되는 값은 let
2가지 경우의 수만 있는 값은 boolean

Array prototype 정리해서 알려주기
Slide Animation
익명 함수와 화살표 함수의 차이
classList로 클래스 제어하는것처럼 id를 제어할 수 있는거
let, const 차이
Promise
함수 vs 클래스
regex
스코프 개념
php 경로 설정
코드 정리하는 팁
변수 이름 짓기

const FPS = 60;
let isDOwn = false;
let cnt = 0;
let max = 1000;

const renderBox = () => {};
const renderCircle = () => {};
const renderClose = () => {};
const render = (_) => {
  renderBox();
  renderCircle();
  renderClose();
};

const onAddBtnClick = (e) => {
  console.log(e.currentTarget);
};

const onCanvasClick = (_) => {
  render();
};

const eve = (_) => {
  $(document)
    .on("click", ".addBtn", onAddBtnClick)
    .on("mousemove", "#canvas", onMousemove)
    .on("click", "#canvas", onCanvasClick);
};

const init = (_) => {
  eve();
  render();
};

window.onload = init;
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = document.body.clientWidth;
const height = document.body.clientHeight - 100;
let snows = [];
let start = null;
let num = 100;
canvas.width = width;
canvas.height = height;

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const renderSnow = _ => {
    let min = +document.querySelector('#size').value;
    let max = +min + 10;
    const x = getRandomNumber(0, width);
    const y = 0;
    const radius = getRandomNumber(min, max);
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    window.requestAnimationFrame(timestamp => snowRain(timestamp, x, y, radius, startAngle, endAngle));
}

const snowRain = (timestamp, x, y, r, startAngle, end) => {
  if (!start) start = timestamp;
  let progress = timestamp - start;
  y = Math.min(progress / 10, height + r);
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x, y - r, r, startAngle, end);
  ctx.stroke();
  ctx.fill();
  if (progress < height * 10 + r) window.requestAnimationFrame(timestamp => snowRain(timestamp, x, y, r, startAngle, end));
}

const render = _ => {
  renderSnow();
}

const handelRangeChange = _ => {
  render();
}

const evt = _ => {
  document.querySelector('#size').addEventListener('change', handelRangeChange)
}
const init = _ => {
  evt();
  render();
}

init();
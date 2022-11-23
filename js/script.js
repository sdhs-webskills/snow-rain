const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = document.body.clientWidth;
const height = document.body.clientHeight;
canvas.width = width;
canvas.height = height;

let start = null;
let num = 10;
let data = {
  size: 10,
  opacity: 1,
  speed: 1,
  shake: 1,
  mouseArea: 50,
  snows: []
};

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const addSnow = ( x, y, radius, startAngle, endAngle, speed) => {
  data = {
    ...data,
    snows: [...data.snows, { x, y, radius, startAngle, endAngle, speed }]
  };
};

const createSnow = () => {
  for (let i = 0; i < num; i++) {
    const min = 10;
    const max = min + 10;
    const x = getRandomNumber(0, width);
    const y = 0;
    const radius = getRandomNumber(min, max);
    const startAngle = 0;
    const endAngle = Math.PI * 2;
    const speed = getRandomNumber(1, 2);
    addSnow( x, y, radius, startAngle, endAngle, speed );
  }
}

const snowFall = () => {
  let isFall;
  data.snows.forEach(snow => {
    snow = { ...snow, y: snow.y += snow.speed }
    console.log(snow.y);
    isFall = snow.y < height;
  })
  renderSnow();
  if(isFall) window.requestAnimationFrame(snowFall);
}

const renderSnow = () => {
  ctx.clearRect(0, 0, width, height);
  data.snows.forEach(snow => {
    const { x, y, radius, startAngle, endAngle } = snow;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y - radius, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.fill();
  })
}

const render = () => {
  createSnow();
  snowFall();
}

const init = _ => {
  render();
}

init();
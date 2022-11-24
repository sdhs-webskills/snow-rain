const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width;
let height;
let data = {
  size: 10,
  opacity: 1,
  speed: 1,
  shake: 1,
  mouseArea: 50,
  snows: []
};

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const windowResizeHandler = () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
}

const removeSnow = () => {
  data.snows = data.snows.filter(snow => snow.y < height);
}

const createSnow = () => {
  const min = 1;
  const max = min + 10;
  data = {
    ...data,
    snows: [
      ...data.snows,
      {
        x: getRandomNumber(0, width),
        y: 0,
        radius: getRandomNumber(min, max),
        startAngle: 0,
        endAngle: Math.PI * 2,
        speed : getRandomNumber(1, 2),
        isDrop : false
      }
    ]
  }
};

const dropSnow = () => {
  data.snows.forEach(snow => {
    snow = { ...snow, y: snow.y += snow.speed }
  });
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
  window.requestAnimationFrame(render);
}

const render = () => {
  removeSnow();
  createSnow();
  dropSnow();
  renderSnow();
}

const init = () => {
  windowResizeHandler();
  render();
}

window.addEventListener('resize', windowResizeHandler);

init();

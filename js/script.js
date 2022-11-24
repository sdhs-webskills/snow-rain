const $size = document.getElementById('size');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let min;
let max;
let width;
let height;
let direction = true;

let data = {
  speed: 1,
  shake: 50,
  mouseArea: 50,
  snows: []
};

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const createSnow = () => {
  const x = getRandomNumber(0, width);
  data = {
    ...data,
    snows: [
      ...data.snows,
      {
        x,
        y: 0,
        radius: getRandomNumber(min, max),
        startAngle: 0,
        endAngle: Math.PI * 2,
        speed: getRandomNumber(1, 2),
        isDrop: false,
        alpha: Math.random(),
        center: x,
      }
    ]
  }
};

const dropSnow = () => {
  data.snows.forEach(snow => snow.y += snow.speed);
}

const shakeSnow = () => {
  data.snows.forEach(snow => {
    const minShake = snow.center - data.shake;
    const maxShake = snow.center + data.shake;
    direction ? snow.x += data.shake / 100 : snow.x -= data.shake / 100;
    if(snow.x < minShake || snow.x > maxShake) direction = !direction;
  });
}

const removeSnow = () => {
  data.snows.forEach(snow => {
    if(snow.y > height - snow.radius) {
      snow.isDrop = true;
    }
  })
  data.snows = data.snows.filter(snow => !snow.isDrop);
}

const renderSnow = () => {
  ctx.clearRect(0, 0, width, height);
  data.snows.forEach(snow => {
    const { x, y, radius, startAngle, endAngle, alpha } = snow;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y - radius, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.fill();
  })
  window.requestAnimationFrame(render);
}

const render = () => {
  createSnow();
  dropSnow();
  // shakeSnow();
  removeSnow();
  renderSnow();
}

const handleWindowResize = () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
}

const resizeSnow = () => {
  const beforeSize = min;
  const afterSize = parseInt($size.value);
  const changedSize = Math.max(beforeSize, afterSize) / Math.min(beforeSize, afterSize);
  data.snows.forEach(snow => {
    beforeSize > afterSize ? snow.radius /= changedSize : 
    beforeSize < afterSize ? snow.radius *= changedSize : snow.radius
  })
}

const handleSizeInput = () => {
  min = parseInt($size.value);
  max = min * 2;
}

const evt = () => {
  window.addEventListener('resize', handleWindowResize);
  $size.addEventListener('input', resizeSnow);
  $size.addEventListener('input', handleSizeInput);
}

const init = () => {
  handleWindowResize();
  handleSizeInput();
  evt();
  render();
}

init();

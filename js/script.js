const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const $size = document.getElementById('size');
const $speed = document.getElementById('speed');
// const $input = [...document.querySelectorAll('input')];

let isPause = false;
let direction = true;
let width, height, minSize, maxSize, minSpeed, maxSpeed;

let data = {
  speed: 1,
  shake: 50,
  mouseArea: 50,
  snows: []
};

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const createSnow = () => {
  const x = getRandomNumber(0, width);
  const radius = getRandomNumber(minSize, maxSize);
  data = {
    ...data,
    snows: [
      ...data.snows,
      {
        x,
        y: -radius,
        radius,
        startAngle: 0,
        endAngle: Math.PI * 2,
        speed: getRandomNumber(minSpeed, maxSpeed),
        alpha: Math.random(),
        center: x,
        meltingSpeed: radius * 0.02
      }
    ]
  }
};

const dropSnow = () => {
  data.snows.forEach(snow => {
    snow.y + snow.speed < height - snow.radius ? snow.y += snow.speed : snow.y = height - snow.radius;
  });
}

// const shakeSnow = () => {
//   data.snows.forEach(snow => {
//     const minShake = snow.center - data.shake;
//     const maxShake = snow.center + data.shake;
//     direction ? snow.x += data.shake / 100 : snow.x -= data.shake / 100;
//     if(snow.x < minShake || snow.x > maxShake) direction = !direction;
//   });
// }

const removeSnow = () => {
  data.snows.forEach(snow => {
    if(snow.y === height - snow.radius) {
      snow.radius - snow.meltingSpeed < 0 ? snow.radius = 0 : snow.radius -= snow.meltingSpeed;
      snow.alpha - 0.01 < 0 ? snow.alpha = 0 : snow.alpha -= 0.01;
    }
  })
  data.snows = data.snows.filter(snow => snow.radius || snow.alpha);
}

const renderSnow = () => {
  ctx.clearRect(0, 0, width, height);
  data.snows.forEach(snow => {
    const { x, y, radius, startAngle, endAngle, alpha } = snow;
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.fill();
  })
  !isPause && window.requestAnimationFrame(render);
}

const render = () => {
  createSnow();
  dropSnow();
  removeSnow();
  renderSnow();
}

const handleWindowKeydown = e => {
  if([32].includes(e.keyCode)) {
    isPause = !isPause;
    !isPause && renderSnow();
  }
};

const handleWindowResize = () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight - 21;
  canvas.width = width;
  canvas.height = height;
  isPause && renderSnow();
}

const resizeSnow = () => {
  const beforeSize = minSize;
  const afterSize = parseInt($size.value);
  const changedSize = Math.max(beforeSize, afterSize) / Math.min(beforeSize, afterSize);
  data.snows.forEach(snow => {
    beforeSize > afterSize ? snow.radius /= changedSize : 
    beforeSize < afterSize ? snow.radius *= changedSize : snow.radius
  })
}

const handleSizeInput = () => {
  minSize = parseInt($size.value);
  maxSize = minSize * 2;
}

const handleSpeedInput = () => {
  minSpeed = parseInt($speed.value);
  maxSpeed = minSpeed * 2;
}

// const handleInput = e => {
//   let minValue = parseInt(e.target.value);
//   let maxValue = minValue * 2;
//   if(e.target.name === 'size') {
//     minSize = minValue;
//     maxSize = maxValue;
//   }
// }

const evt = () => {
  window.addEventListener('keydown', handleWindowKeydown);
  window.addEventListener('resize', handleWindowResize);
  $size.addEventListener('input', resizeSnow);
  $size.addEventListener('input', handleSizeInput);
  $speed.addEventListener('input', handleSpeedInput);
  // $input.forEach(e => e.addEventListener('input', handleInput));
}

const initValue = () => {
  handleWindowResize();
  handleSizeInput();
  handleSpeedInput();
}

const init = () => {
  initValue();
  evt();
  render();
}

init();

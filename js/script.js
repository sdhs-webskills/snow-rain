const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const $input = [...document.querySelectorAll('input')];

let width, height, minSize, maxSize, minSpeed, maxSpeed, shakeRange, mouseX, mouseY, mouseArea;
let data = {
  isPause: false,
  isMouseMove: false,
  snows: []
};

const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

const createSnow = () => {
  const x = getRandomNumber(0, width);
  const radius = getRandomNumber(minSize, maxSize);
  const shake = getRandomNumber(-shakeRange, shakeRange);
  const speed = getRandomNumber(minSpeed, maxSpeed);
  data = {
    ...data,
    snows: [
      ...data.snows,
      {
        x: x + shake,
        y: -radius,
        radius,
        startAngle: 0,
        endAngle: Math.PI * 2,
        speed,
        alpha: Math.random(),
        center: x,
        meltingSpeed: radius * 0.02,
        shake: shakeRange * 0.02
      }
    ]
  }
};

const dropSnow = () => {
  data.snows.forEach(snow => {
    (
      snow.y + snow.speed < height - snow.radius ?
      snow.y += snow.speed :
      snow.y = height - snow.radius
    );
  });
}

const shakeSnow = () => {
  data.snows.forEach(snow => {
    if (snow.y === height - snow.radius) return;
    const minShake = snow.center - shakeRange;
    const maxShake = snow.center + shakeRange;
    (
      snow.x + snow.shake < minShake || snow.x + snow.shake > maxShake ?
      Math.sign(snow.shake) ? snow.shake *= -1 :
      snow.shake = Math.abs(snow.shake) : snow.x += snow.shake
    );
  });
}

const removeSnow = () => {
  data.snows.forEach(snow => {
    if (snow.y === height - snow.radius) {
      (
        snow.radius - snow.meltingSpeed < 0 ?
        snow.radius = 0 :
        snow.radius -= snow.meltingSpeed
      );
      (
        snow.alpha - 0.01 < 0 ?
        snow.alpha = 0 :
        snow.alpha -= 0.01
      );
    }
  })
  data.snows = data.snows.filter(snow => snow.radius || snow.alpha);
}

const renderSnow = () => {
  const { isPause, isMouseMove, snows } = data;
  ctx.clearRect(0, 0, width, height);
  snows.forEach(({ x, y, radius, startAngle, endAngle, alpha }) => {
    radius = (
      isMouseMove &&
      x > mouseX - mouseArea &&
      x < mouseX + mouseArea &&
      y > mouseY - mouseArea &&
      y < mouseY + mouseArea ?
      radius / 2 : radius
    );
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.stroke();
    ctx.fill();
  })
  isMouseMove && renderMouseArea();
  isPause ? window.requestAnimationFrame(renderSnow) : window.requestAnimationFrame(render);
}

const renderMouseArea = () => {
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(mouseX, mouseY, mouseArea, 0, Math.PI * 2);
  ctx.stroke();
}

const render = () => {
  createSnow();
  dropSnow();
  shakeSnow();
  removeSnow();
  renderSnow();
}

const handleWindowMousemove = ({offsetX, offsetY}) => {
  data.isMouseMove = true;
  mouseX = offsetX;
  mouseY = offsetY;
}

const handleWindowMouseleave = () => data.isMouseMove = false;

const handleWindowKeydown = ({keyCode}) => [32].includes(keyCode) ? data.isPause = !data.isPause : data.isPause;

const handleWindowResize = () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight - 21;
  canvas.width = width;
  canvas.height = height;
}

const changeSnowValue = (snowValue, beforeValue, afterValue) => {
  const changedValue = Math.max(beforeValue, afterValue) / Math.min(beforeValue, afterValue);
  beforeValue > afterValue ? snowValue /= changedValue :
  beforeValue < afterValue ? snowValue *= changedValue : snowValue;
  return snowValue;
}

const handleInput = ({target}) => {
  const inputName = target.name;
  const inputValue = +target.value;
  data.snows.forEach(snow => {
    inputName === 'size' ? snow.radius = changeSnowValue(snow.radius, minSize, inputValue) :
    inputName === 'speed' ? snow.speed = changeSnowValue(snow.speed, minSpeed, inputValue) :
    inputName === 'shake' ? snow.shake =  changeSnowValue(snow.shake, shakeRange, inputValue) : inputName;
  })
  initInputValue();
}

const initInputValue = () => {
  $input.forEach(({value, name}) => {
    minSize = name === 'size' ? +value : minSize;
    minSpeed = name === 'speed' ? +value : minSpeed;
    shakeRange = name === 'shake' ? +value : shakeRange;
    mouseArea = name === 'mouseArea' ? +value : mouseArea;
  })
  maxSize = minSize * 2;
  maxSpeed = minSpeed * 2;
}

const evt = () => {
  window.addEventListener('keydown', handleWindowKeydown);
  window.addEventListener('resize', handleWindowResize);
  canvas.addEventListener('mousemove', handleWindowMousemove);
  canvas.addEventListener('mouseleave', handleWindowMouseleave);
  $input.forEach(e => e.addEventListener('input', handleInput));
}

const initValue = () => {
  handleWindowResize();
  initInputValue();
}

const init = () => {
  initValue();
  evt();
  render();
}

init();

/**
 * 할 것
 * 1. 데이터 구조 바꾸기
 * 2. 중복되는 코드 없애고 리팩토링 하기
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const $size = document.getElementById('size');
const $speed = document.getElementById('speed');
const $shake = document.getElementById('shake');
const $mouseArea = document.getElementById('mouseArea');
const $input = [...document.querySelectorAll('input')];
$input.forEach(e => e.addEventListener('input', input => {
  console.log(input.target);
}))

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
        speed: getRandomNumber(minSpeed, maxSpeed),
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
  const { isPause, isMouseMove } = data;
  ctx.clearRect(0, 0, width, height);
  data.snows.forEach(snow => {
    const { x, y, radius, startAngle, endAngle, alpha } = snow;
    const r = (
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
    ctx.arc(x, y, r, startAngle, endAngle);
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

const handleWindowMousemove = e => {
  data.isMouseMove = true;
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}

const handleWindowMouseleave = () => data.isMouseMove = false;

const handleWindowKeydown = e => [32].includes(e.keyCode) ? data.isPause = !data.isPause : data.isPause;

const handleWindowResize = () => {
  width = document.body.clientWidth;
  height = document.body.clientHeight - 21;
  canvas.width = width;
  canvas.height = height;
}

const resizeSnow = () => {
  const beforeSize = minSize;
  const afterSize = +$size.value;
  const changedSize = Math.max(beforeSize, afterSize) / Math.min(beforeSize, afterSize);
  data.snows.forEach(snow => {
    beforeSize > afterSize ? snow.radius /= changedSize :
      beforeSize < afterSize ? snow.radius *= changedSize : snow.radius;
  })
}

const resetSpeed = () => {
  const beforeSpeed = minSpeed;
  const afterSpeed = +$speed.value;
  const changedSpeed = Math.max(beforeSpeed, afterSpeed) / Math.min(beforeSpeed, afterSpeed);
  data.snows.forEach(snow => {
    beforeSpeed > afterSpeed ? snow.speed /= changedSpeed :
      beforeSpeed < afterSpeed ? snow.speed *= changedSpeed : snow.speed;
  })
}

const resetShake = () => {
  const beforeShake = shakeRange;
  const afterShake = +$shake.value;
  const changedShake = Math.max(beforeShake, afterShake) / Math.min(beforeShake, afterShake);
  data.snows.forEach(snow => {
    beforeShake > afterShake ? snow.shake /= changedShake :
      beforeShake < afterShake ? snow.shake *= changedShake : snow.shake;
  })
}

const handleInput = e => {
  {
    /*
    const inputName = e.target.name;
    const inputValue = +e.target.value;
    const beforeValue = (
      inputName === 'size' ? minSize :
      inputName === 'speed' ? minSpeed :
      inputName === 'shake' ? shakeRange : inputValue
    )
    const afterValue = inputValue;
    const changedValue = Math.max(beforeValue, afterValue) / Math.min(beforeValue, afterValue);
    */
  }
  minSize = +$size.value;
  maxSize = minSize * 2;
  minSpeed = +$speed.value;
  maxSpeed = minSpeed * 2;
  shakeRange = +$shake.value;
  mouseArea = +$mouseArea.value;
}

const evt = () => {
  window.addEventListener('keydown', handleWindowKeydown);
  window.addEventListener('resize', handleWindowResize);
  canvas.addEventListener('mousemove', handleWindowMousemove);
  canvas.addEventListener('mouseleave', handleWindowMouseleave);
  $size.addEventListener('input', resizeSnow);
  $speed.addEventListener('input', resetSpeed);
  $shake.addEventListener('input', resetShake);
  $input.forEach(e => e.addEventListener('input', handleInput));
}

const initValue = () => {
  handleWindowResize();
  handleInput();
}

const init = () => {
  initValue();
  evt();
  render();
}

init();

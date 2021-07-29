const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowArray = [];

const makeSnow = _ => {
    const left = Math.round(Math.random()*100);
    const opacity = Math.random() + 0.2;
    const speed = Math.random() * 5 + 1;
    const step = Math.random() * 50 + 10;
    const radius = Math.random() * 40;

    const obj = {
        x: window.innerWidth/100*left,
        y: Math.random() * canvas.height - 70,
        radius,
        start: 0,
        end: Math.PI * 2,
        opacity,
        speed,
        step,
        direct: "right",
    };

    obj["stepX"] = obj.x - step;
    obj["stepX2"] = obj.x + step;
    obj.step = obj.step / 150;

    return obj;
};

const snow = function() {
    for(let i = 0; i < 700; i++)
        snowArray.push(makeSnow());
};
snow();

const remove = snow => {
    if(snow.radius > 0) snow.radius -= 1;
    if(snow.radius <= 0) {
        snow.radius = 0;

        const obj = makeSnow();

        setTimeout(() => {
            for(const key in obj) {
                snow[key] = obj[key];
            }
        });

        return;
    };

    snow.y += 1;
};

const draw = _ => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snowArray.length; i++) {
        const snow = snowArray[i];

        let y = snow.y;

        if(y >= canvas.height - snow.radius) {
            y = canvas.height - snow.radius;

            snow.direct = "stop";
            remove(snow);
        }else snow.y += snow.speed;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${snow.opacity})`;

        if(snow.direct === "right") {
            ctx.arc(snow.x += snow.step, y, snow.radius, snow.start, snow.end, true);

            if(snow.x + snow.radius >= snow.stepX2) snow.direct = "left";
        }else if(snow.direct === "left") {
            ctx.arc(snow.x -= snow.step, y, snow.radius, snow.start, snow.end, true);

            if(snow.x - snow.radius <= snow.stepX) snow.direct = "right";
        }else if(snow.direct === "stop") {
            ctx.arc(snow.x, y, snow.radius, snow.start, snow.end, true);
        };

        ctx.fill();
    }

    requestAnimationFrame(draw);
};

draw(); 
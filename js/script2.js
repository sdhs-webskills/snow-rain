const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const menu = document.querySelector(".menu");
const rangeBtn = document.querySelector(".menu .range-btn");
const speedBtn = document.querySelector(".menu .speed-btn");
const radiusBtn = document.querySelector(".menu .radius-btn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const len = 300;

let range = rangeBtn.value/10;
let speed = speedBtn.value/5;

let sumRadius = 0;
let radius = radiusBtn.value;


rangeBtn.addEventListener("input", function(){
    range = rangeBtn.value/10;
});
speedBtn.addEventListener("input", function(){
    speed = speedBtn.value/5;
});
radiusBtn.addEventListener("input", function(){
    radius = radiusBtn.value;
});



const createSnow = function() {
    const snows = []
    for(let i = 0; i<len; i++){
        const random = Math.round(Math.random());
        const snow = {
            x: window.innerWidth/100*Math.round(Math.random()*100),
            y: window.innerHeight/100*Math.round(Math.random()*100),
            radius: Math.random()*3,
            speed: Math.random()*10,
            opacity: Math.random(),
            direct: random > 0 ?  'right' : 'left',
            count: 0,
            range: Math.round(Math.random()*100)+20
        }
        snows.push(snow);
    }
    return snows;
};

const snows = createSnow();

const drawSnow = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < snows.length; i++){
        const snow = snows[i];

        ctx.beginPath();
        ctx.fillStyle = `rgba(225, 225, 225, ${snow.opacity})`;

        ctx.arc(snow.x, snow.y, sumRadius , 0, Math.PI*2)
        ctx.fill();

    }
    
}

const moveSnow = function() {
    // console.log(radius);

    for(let i = 0; i < snows.length; i++){
        const snow = snows[i];

        if(snow.direct === 'right') {
            snow.x += range;
            snow.count += 0.5;

            if(snow.count === snow.range) {
                snow.direct = "left";
            };
            
        }else if(snow.direct === 'left') {
            snow.x -= range;
            snow.count -= 0.5;
            
            if(snow.count === snow.range*-1) {
                snow.direct = "right";
            }

        }


        snow.y += snow.speed + speed;

        sumRadius = snow.radius + radius;
        // console.log(radius);

        if(snow.y > window.innerHeight+snow.radius*2){
            snow.y = -snow.radius*2;
        }

    }


    drawSnow();
    requestAnimationFrame(moveSnow);
};
moveSnow();



window.addEventListener("keydown", function({key}){
    if(key === "r"){
        menu.classList.toggle("margin-left-zero");
    }
})





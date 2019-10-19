/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

// load audio files
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// create the score var

let score = 0;

//control the snake

box_x = -1;
box_y = -1;

// draw everything to the canvas

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // move
    snakeY += box * box_y
    snakeX += box * box_x;

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // change direction
    let change = false;

    if (snakeX < 2 * box) {
        box_x *= -1;
        score += 5;
        change = true;
    }
    if (snakeX > 16 * box) {
        box_x *= -1;
        score += 5;
        change = true;
    }
    if (snakeY < 4 * box) {
        box_y *= -1;
        score += 5;
        change = true;
    }
    if (snakeY > 16 * box) {
        box_y *= -1;
        score += 5;
        change = true;
    }

    if (!change)
        snake.pop()

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100 ms

let game = setInterval(draw, 100);
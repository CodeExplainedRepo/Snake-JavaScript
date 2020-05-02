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

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var

let score = 0;
let secondScore = 0;
let thirdScore = 0;
let finalSccore = 0;

//control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}



// draw everything to the canvas

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        let arrColor = ["yellow", "red", "blue", "White", "Black", "Brown", "Purple", "Orange", "Gray", "Silver", "Cyan", "Khaki", "Coral", "Aquamarine", "Lime"];
        let randomColor;
        randomColor = Math.floor(Math.random() * (15 - 0 + 1) + 0);
        if ((i == 0)) {
            ctx.fillStyle = "green";
        } else {

            ctx.fillStyle = arrColor[randomColor];
        }

        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }


    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // collision with barriers part 1 
    function collision1(snakeX, snakeY) {
        if ((snakeX == 5 * box && snakeY == 6 * box) || (snakeX == 6 * box && snakeY == 6 * box) || (snakeX == 5 * box && snakeY == 7 * box) || (snakeX == 5 * box && snakeY == 8 * box) || (snakeX == 13 * box && snakeY == 12 * box) || (snakeX == 13 * box && snakeY == 13 * box) || (snakeX == 13 * box && snakeY == 14 * box) || (snakeX == 12 * box && snakeY == 14 * box)) {
            return true;
        } else { return false; }
    }
    // collision with barriers part 2 
    function collision2(snakeX, snakeY) {
        if ((snakeX == 5 * box && snakeY == 12 * box) || (snakeX == 5 * box && snakeY == 13 * box) || (snakeX == 5 * box && snakeY == 14 * box) || (snakeX == 6 * box && snakeY == 14 * box) || (snakeX == 12 * box && snakeY == 6 * box) || (snakeX == 13 * box && snakeY == 6 * box) || (snakeX == 13 * box && snakeY == 7 * box) || (snakeX == 13 * box && snakeY == 18 * box)) {
            return true;
        } else { return false; }
    }
    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        if (score > 3) {
            secondScore++;
            if (secondScore > 4) { thirdScore++; }
        }
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        while (collision1(food.x, food.y) || collision2(food.x, food.y)) {
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    function gameOver() {

        alert("Game Over ! \n\n                 Your Score is : " + score + " / 12");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Game Over !',
            footer: 'Powered By KHITER .'
        })

    }

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box) {
        clearInterval(game);
        dead.play();
        gameOver();

    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";


    if (score > 3) {
        ctx.fillStyle = "blue";
        ctx.font = "45px Changa one";
        ctx.fillText("3/3.", 2 * box, 1.6 * box);
        ctx.fillStyle = "#16510e"
        ctx.fillRect(5 * box, 6 * box, box, 3 * box);
        ctx.fillRect(5 * box, 6 * box, 2 * box, box);
        ctx.fillRect(12 * box, 14 * box, 2 * box, box);
        ctx.fillRect(13 * box, 12 * box, box, 3 * box);
        if (collision1(snakeX, snakeY)) {
            clearInterval(game);
            dead.play();
            gameOver();

        }
        if (secondScore > 4) {
            ctx.fillStyle = "red";
            ctx.font = "45px Changa one";
            ctx.fillText("3/3.", 2 * box, 1.6 * box);
            ctx.fillText("4/4.", 7 * box, 1.6 * box);
            ctx.fillText(thirdScore + "/5.", 11 * box, 1.6 * box);
            ctx.fillStyle = "#16510e"
            ctx.fillRect(12 * box, 6 * box, 2 * box, box);
            ctx.fillRect(13 * box, 6 * box, box, 3 * box);
            ctx.fillRect(5 * box, 12 * box, box, 3 * box);
            ctx.fillRect(5 * box, 14 * box, 2 * box, box);
            if (collision1(snakeX, snakeY) || collision2(snakeX, snakeY)) {
                clearInterval(game);
                gameOver();
                dead.play();
            }
        }
        if (secondScore <= 4) {
            ctx.fillStyle = "blue";
            ctx.fillText(secondScore + "/4.", 7 * box, 1.6 * box);
        }

    } else {
        ctx.font = "45px Changa one";
        ctx.fillText(score + "/3.", 2 * box, 1.6 * box);
    }



}

// call draw function every 100 ms

let game = setInterval(draw, 200);
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "image/ground.png";

const foodImg = new Image();
foodImg.src = "image/food.png";

let box = 32;

let score = 0;
// spavn food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};
// snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
// give keyboard information
document.addEventListener("keydown", direction);

let dir;
// snake control
function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    }
    else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    }
    else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    }
    else if (event.keyCode == 40 && dir != "up;") {
        dir = "down";
    }
   
}

// end of the game when the snake crosses the tail
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            deadScreen();
        }     
    }
}
//notification of the end of the game
function deadScreen() {
    clearInterval(game);
    alert("Game over, you score : " + score);
    location.reload();
}
// set gamemode
function gameMode() {
    let mode = prompt('Set mode: easy, normal, hard')
    if (mode == 'easy') {
        speed = setInterval(drawGame, 170)
    }else if (mode == 'normal') {
        speed = setInterval(drawGame, 100)
    }else if (mode == 'hard') {
        speed = setInterval(drawGame, 70)
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0 );

    ctx.drawImage(foodImg, food.x, food.y);
    //draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "red" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //draw score
    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2.5, box * 1.6);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    
    // the appearance of new food when the snake ate it
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else {
        snake.pop();
    }
    // the end of the game when the snake went overboard
    if (snakeX < box || snakeX > 17 * box 
        || snakeY < 3 * box || snakeY > box *17) {
        deadScreen();
    };
    

    
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);
}
    gameMode();
    let game = speed;
var size = 600;
var step = 20;

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 0;

class snakeGame {
    constructor() {
        this.x = 200;
        this.y = 300;
        this.cells = [];
        this.len = 10;
        this.dx = 1, //defaults to start moving right
        this.dy = 0,
        this.ax = Math.floor(Math.random()*(600/20))*20,
        this.ay = Math.floor(Math.random()*(600/20))*20,
        this.gen = () => {
            return Math.floor(Math.random()*(600/20)); 
        }
    }
}
var snake = new snakeGame();

setInterval(loop, 100);

ctx.beginPath();
ctx.rect(snake.x, snake.y, 20,20);
ctx.fillStyle = "green";
ctx.fill();

snake.cells.push([snake.x, snake.y]);
snake.cells.push([snake.x-1, snake.y]);
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx*step;
    snake.y += snake.dy*step;

    //detect collision with self 
    snake.cells.forEach((curr) => {
        if (snake.x == curr[0] && snake.y == curr[1]){
            snake.x = 200;
            snake.y = 300;
            snake.dx = 1;
            snake.dy = 0;
            snake.cells = [];
            snake.cells.push([snake.x, snake.y]);
            snake.cells.push([snake.x-1, snake.y]);
            score = 0;
        }
    });

    if (snake.x >= size){
        snake.x = 0;
    } else if (snake.x < 0){
        snake.x = size-20;
    }
    
    if (snake.y >= size){
        snake.y = 0;
    } else if (snake.y < 0){
        snake.y = size-20;
    }
    // draw apple
    ctx.beginPath();
    ctx.rect(snake.ax, snake.ay, step,step);
    ctx.fillStyle = "red";
    ctx.fill();
    if (snake.x == snake.ax && snake.y == snake.ay){
        score++;
        snake.ax = snake.gen()*20;
        snake.ay = snake.gen()*20;
        
        if (snake.cells.length < snake.len){
            snake.cells.push([snake.x, snake.y]);
        } else {
            snake.cells.push([snake.x, snake.y]);
            snake.cells.shift();
        }
    } else {
        snake.cells.push([snake.x, snake.y]);
        snake.cells.shift();
    }
    snake.cells.forEach((curr) => {
        ctx.beginPath();
        ctx.rect(curr[0], curr[1], step,step);
        ctx.fillStyle = "green";
        ctx.fill();
    });

    ctx.font = '30px Arial';
    ctx.fillStyle = "white";
    ctx.fillText(score, 30,30);
}


document.addEventListener('keydown', function(e) {
    //left
    if (e.which === 37 && snake.dx==0) { 
        snake.dy = 0;
        snake.dx = -1;
    }
    //up 
    if (e.which === 38 && snake.dy==0) {
        snake.dy = -1;
        snake.dx = 0;
    }
    //right
    if (e.which === 39 && snake.dx==0) {
        snake.dy = 0;
        snake.dx = 1;
    }
    //down
    if (e.which === 40 && snake.dy==0) {
        snake.dy = 1;
        snake.dx = 0;
    }
});



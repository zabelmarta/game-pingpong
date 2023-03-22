const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.font = '30px Arial';

//wymiary płótna
const canvas_height = canvas.height;
const canvas_width = canvas.width;
//pozycja punktacji
const board_y = 50;
const board_p1_x = 300;
const board_p2_x = 500;
//wymiary paletek
const paddle_width = 20;
const paddle_height = 100;
//pozycja paletek
const paddle_p1_x = 10;
const paddle_p2_x = 770;
const paddle_start_y = (canvas_height - paddle_height) / 2;
//wymiary piłeczki
const ball_r = 15;
//początkowa pozycja piłeczki
const ball_start_x = canvas_width / 2;
const ball_start_y = canvas_height / 2;
//początkowa prędkość piłeczki na współrzędnych x, y
const ball_start_dx = 4.5;
const ball_start_dy = 1.5;


function drawPaddle(x, y){
    ctx.fillRect(x, y, paddle_width, paddle_height);
} 

function drawPoints( text, x){
    ctx.fillText(text, x, board_y);
}

function drawCircle(x, y, r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawBall(x, y){
    drawCircle(x, y, ball_r)
}

 function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
 }


//zmienne
let ballX = ball_start_x;
let ballY = ball_start_y;
let ballDX = ball_start_dx;
let ballDY = ball_start_dy;
let p1PaddleY = paddle_start_y;
let p2PaddleY = paddle_start_y;
let p1Points = 0;
let p2Points = 0;

function drawState(){
    clearCanvas();
    drawPoints(p1Points.toString(), board_p1_x);
    drawPoints(p2Points.toString(), board_p2_x);
    drawBall(ballX, ballY);
    drawPaddle(paddle_p1_x, p1PaddleY);
    drawPaddle(paddle_p2_x, p2PaddleY);
}

//zmiana stanu

const state_change_interval = 20;

function updateState() {
if(p1Action === 'up'){
    p1PaddleY -= paddle_step;
} else if ( p1Action === 'down'){
    p1PaddleY += paddle_step;
} else if ( p2Action === 'up'){
    p2PaddleY -= paddle_step;
} else if ( p2Action === 'down'){
    p2PaddleY += paddle_step;
}

ballX += ballDX;
ballY += ballDY;

p1PaddleY++;
p2PaddleY--;
p1Points++;
p2Points+=3;
}

function updateAndDrawState(){
    updateState();
    drawState();
}

setInterval( updateAndDrawState, state_change_interval);


//ruch paletki
const paddle_step = 3;

let p1Action = 'stop';
let p2Action = 'stop';


window.addEventListener('keydown', function(event){
    const code = event.code;
    if (code === 'KeyQ'){
        p1Action = 'up';
        } else if ( code === 'KeyA'){
            p1Action = 'down';
        } else if (code === 'KeyP'){
            p2Action = 'up';
        } else if ( code === 'KeyL'){
            p2Action = 'down';
        }
});
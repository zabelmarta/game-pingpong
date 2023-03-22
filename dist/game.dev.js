"use strict";

var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');
ctx.font = '30px Arial'; //wymiary płótna

var canvas_height = canvas.height;
var canvas_width = canvas.width; //pozycja punktacji

var board_y = 50;
var board_p1_x = 300;
var board_p2_x = 500; //wymiary paletek

var paddle_width = 20;
var paddle_height = 100; //pozycja paletek

var paddle_p1_x = 10;
var paddle_p2_x = 770;
var paddle_start_y = (canvas_height - paddle_height) / 2; //wymiary piłeczki

var ball_r = 15; //początkowa pozycja piłeczki

var ball_start_x = canvas_width / 2;
var ball_start_y = canvas_height / 2; //początkowa prędkość piłeczki na współrzędnych x, y

var ball_start_dx = 4.5;
var ball_start_dy = 1.5;

function drawPaddle(x, y) {
  ctx.fillRect(x, y, paddle_width, paddle_height);
}

function drawPoints(text, x) {
  ctx.fillText(text, x, board_y);
}

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function drawBall(x, y) {
  drawCircle(x, y, ball_r);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
} //zmienne


var ballX = ball_start_x;
var ballY = ball_start_y;
var ballDX = ball_start_dx;
var ballDY = ball_start_dy;
var p1PaddleY = paddle_start_y;
var p2PaddleY = paddle_start_y;
var p1Points = 0;
var p2Points = 0;

function drawState() {
  clearCanvas();
  drawPoints(p1Points.toString(), board_p1_x);
  drawPoints(p2Points.toString(), board_p2_x);
  drawBall(ballX, ballY);
  drawPaddle(paddle_p1_x, p1PaddleY);
  drawPaddle(paddle_p2_x, p2PaddleY);
} //zmiana stanu


var state_change_interval = 20;

function updateState() {
  if (p1Action === 'up') {
    p1PaddleY -= paddle_step;
  } else if (p1Action === 'down') {
    p1PaddleY += paddle_step;
  } else if (p2Action === 'up') {
    p2PaddleY -= paddle_step;
  } else if (p2Action === 'down') {
    p2PaddleY += paddle_step;
  }

  ballX += ballDX;
  ballY += ballDY;
  p1PaddleY++;
  p2PaddleY--;
  p1Points++;
  p2Points += 3;
}

function updateAndDrawState() {
  updateState();
  drawState();
}

setInterval(updateAndDrawState, state_change_interval); //ruch paletki

var paddle_step = 3;
var p1Action = 'stop';
var p2Action = 'stop';
window.addEventListener('keydown', function (event) {
  var code = event.code;

  if (code === 'KeyQ') {
    p1Action = 'up';
  } else if (code === 'KeyA') {
    p1Action = 'down';
  } else if (code === 'KeyP') {
    p2Action = 'up';
  } else if (code === 'KeyL') {
    p2Action = 'down';
  }
});
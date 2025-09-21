const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

let COLS = 20;
let ROWS = 20;
let CELL = canvas.width / COLS;

let snake;
let dir;
let food;
let score;
let running = false;
let tickInterval = 120; // ms per step
let timer = null;
let wallMode = 'wrap';
let soundOn = true;
let highScore = 0;

const gridSizeEl = document.getElementById('gridSize');
const wallModeEl = document.getElementById('wallMode');
const speedEl = document.getElementById('speed');
const highscoreEl = document.getElementById('highscore');
const toggleSoundBtn = document.getElementById('toggleSound');
const mobileControls = document.getElementById('mobileControls');

// simple sounds
const audioCtx = typeof AudioContext !== 'undefined' ? new AudioContext() : null;

function beep(freq=440, time=0.05, vol=0.02){
  if(!audioCtx || !soundOn) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.value = vol;
  o.connect(g); g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + time);
}

function reset() {
  COLS = parseInt(gridSizeEl.value, 10) || 20;
  ROWS = COLS;
  CELL = canvas.width / COLS;
  wallMode = wallModeEl.value || 'wrap';
  tickInterval = parseInt(speedEl.value, 10) || 120;

  snake = [ {x:Math.floor(COLS/2)+1, y:Math.floor(ROWS/2)}, {x:Math.floor(COLS/2), y:Math.floor(ROWS/2)}, {x:Math.floor(COLS/2)-1, y:Math.floor(ROWS/2)} ];
  dir = {x:1, y:0};
  placeFood();
  score = 0;
  scoreEl.textContent = score;
  highScore = parseInt(localStorage.getItem('snake_high') || '0', 10);
  highscoreEl.textContent = highScore;
  running = true;
  startLoop();
}

function placeFood(){
  while(true){
    const x = Math.floor(Math.random()*COLS);
    const y = Math.floor(Math.random()*ROWS);
    if(!snake.some(s => s.x===x && s.y===y)){
      food = {x,y};
      return;
    }
  }
}

function startLoop(){
  if(timer) clearInterval(timer);
  timer = setInterval(step, tickInterval);
}

function step(){
  if(!running) return;
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

  // walls behavior
  if(wallMode === 'wrap'){
    head.x = (head.x + COLS) % COLS;
    head.y = (head.y + ROWS) % ROWS;
  } else {
    // solid walls -> game over if outside
    if(head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS){
      gameOver();
      return;
    }
  }

  // collision with self
  if(snake.some(s => s.x===head.x && s.y===head.y)){
    gameOver();
    return;
  }

  snake.unshift(head);

  // ate food
  if(head.x === food.x && head.y === food.y){
    score += 1;
    scoreEl.textContent = score;
    // sound and speed
    beep(880, 0.04, 0.03);
    tickInterval = Math.max(40, tickInterval - 3);
    startLoop();
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function gameOver(){
  running = false;
  clearInterval(timer);
  beep(120, 0.3, 0.08);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width/2, canvas.height/2 - 10);
  ctx.font = '14px system-ui, sans-serif';
  ctx.fillText(`Score: ${score}`, canvas.width/2, canvas.height/2 + 16);
  if(score > highScore){
    highScore = score;
    localStorage.setItem('snake_high', String(highScore));
    highscoreEl.textContent = highScore;
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // grid background
  ctx.fillStyle = '#071024';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // draw food
  drawCell(food.x, food.y, '#fb7185');

  // draw snake
  snake.forEach((s, i) => {
    const color = i===0 ? '#60a5fa' : '#93c5fd';
    drawCell(s.x, s.y, color);
  });
}

function drawCell(x, y, color){
  ctx.fillStyle = color;
  ctx.fillRect(x*CELL + 1, y*CELL + 1, CELL - 2, CELL - 2);
}

function setDirection(newDir){
  // prevent reversing directly
  if((newDir.x === -dir.x && newDir.y === 0) || (newDir.y === -dir.y && newDir.x === 0)) return;
  dir = newDir;
}

window.addEventListener('keydown', e => {
  if(e.key === 'ArrowUp' || e.key === 'w') setDirection({x:0,y:-1});
  if(e.key === 'ArrowDown' || e.key === 's') setDirection({x:0,y:1});
  if(e.key === 'ArrowLeft' || e.key === 'a') setDirection({x:-1,y:0});
  if(e.key === 'ArrowRight' || e.key === 'd') setDirection({x:1,y:0});
  if(e.code === 'Space'){
    running = !running;
    if(running) startLoop(); else clearInterval(timer);
  }
});

// settings listeners
gridSizeEl.addEventListener('change', () => reset());
wallModeEl.addEventListener('change', () => reset());
speedEl.addEventListener('change', () => reset());

toggleSoundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  toggleSoundBtn.textContent = soundOn ? 'Toggle Sound' : 'Sound Off';
});

// mobile control buttons
document.querySelectorAll('.mobile-controls .up').forEach(b => b.addEventListener('click', () => setDirection({x:0,y:-1})));
document.querySelectorAll('.mobile-controls .down').forEach(b => b.addEventListener('click', () => setDirection({x:0,y:1})));
document.querySelectorAll('.mobile-controls .left').forEach(b => b.addEventListener('click', () => setDirection({x:-1,y:0})));
document.querySelectorAll('.mobile-controls .right').forEach(b => b.addEventListener('click', () => setDirection({x:1,y:0})));

// basic swipe support
let touchStart = null;
canvas.addEventListener('touchstart', e => { touchStart = e.changedTouches[0]; });
canvas.addEventListener('touchend', e => {
  if(!touchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStart.clientX;
  const dy = t.clientY - touchStart.clientY;
  if(Math.abs(dx) > Math.abs(dy)){
    if(dx>10) setDirection({x:1,y:0}); else if(dx<-10) setDirection({x:-1,y:0});
  } else {
    if(dy>10) setDirection({x:0,y:1}); else if(dy<-10) setDirection({x:0,y:-1});
  }
  touchStart = null;
});

restartBtn.addEventListener('click', () => reset());

// initialize
reset();


const cvsB = document.getElementById("bk"), ctxB = cvsB.getContext("2d");
const startBtnB = document.getElementById("startBtn"), scoreElB = document.getElementById("score");
let paddle, ball, bricks, rows=3, cols=6, score=0, running=false, speed=3;

startBtnB.addEventListener("click", ()=>{
  const diff = document.getElementById("difficulty").value;
  speed = diff==="easy"?3:diff==="medium"?4:5;
  paddle = {w:75,h:10,x:(cvsB.width-75)/2, y: cvsB.height-20};
  ball = {x:cvsB.width/2,y:cvsB.height-30,dx: speed,dy:-speed,r:8};
  bricks = []; for(let c=0;c<cols;c++){ bricks[c]=[]; for(let r=0;r<rows;r++) bricks[c][r] = {x:0,y:0,status:1}; }
  score=0; running=true; loop();
});

function draw(){
  ctxB.clearRect(0,0,cvsB.width,cvsB.height);
  // bricks
  for(let c=0;c<cols;c++){
    for(let r=0;r<rows;r++) if(bricks[c][r].status){
      const bx = c*(70)+30, by = r*(24)+30;
      bricks[c][r].x=bx; bricks[c][r].y=by; ctxB.fillStyle="#bd93f9"; ctxB.fillRect(bx,by,70,20);
    }
  }
  // paddle
  ctxB.fillStyle="#8be9fd"; ctxB.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
  // ball
  ctxB.beginPath(); ctxB.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctxB.fillStyle="#ffb86c"; ctxB.fill(); ctxB.closePath();
  scoreElB.textContent = "Score: "+score;
}

function update(){
  ball.x += ball.dx; ball.y += ball.dy;
  if(ball.x+ball.r>cvsB.width || ball.x-ball.r<0) ball.dx *= -1;
  if(ball.y-ball.r<0) ball.dy *= -1;
  else if(ball.y+ball.r>cvsB.height) { running=false; saveHighScore("breakoutHighScore", score); alert("Game Over"); return; }
  // paddle collision
  if(ball.x>paddle.x && ball.x < paddle.x + paddle.w && ball.y + ball.r > paddle.y) ball.dy *= -1;
  // brick collision
  for(let c=0;c<cols;c++){ for(let r=0;r<rows;r++){ const b=bricks[c][r]; if(b.status){
    if(ball.x>b.x && ball.x < b.x+70 && ball.y>b.y && ball.y<b.y+20){ ball.dy*=-1; b.status=0; score+=10; if(score===rows*cols*10){ running=false; saveHighScore("breakoutHighScore", score); alert("You Win!"); } }
  } } }
}

function loop(){ if(!running) return; update(); draw(); requestAnimationFrame(loop); }
document.addEventListener("mousemove", e=>{ const r=cvsB.getBoundingClientRect(); paddle.x = e.clientX - r.left - paddle.w/2; });
function saveHighScore(k,s){ const prev=Number(localStorage.getItem(k)||0); if(s>prev){ localStorage.setItem(k,s); window.refreshLeaderboard && window.refreshLeaderboard(); } }

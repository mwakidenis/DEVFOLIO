const cvs = document.getElementById("canvas"), ctx = cvs.getContext("2d");
const startBtnF = document.getElementById("startBtn"), scoreElF = document.getElementById("score");
let ball, pipes=[], frame=0, score=0, running=false, gravity=0.5, lift=-8, pipeGap=120, pipeSpeed=2;

startBtnF.addEventListener("click", start);
cvs.addEventListener("mousedown", ()=> { if(running) ball.v = lift; });

function start(){
  const diff = document.getElementById("difficulty").value;
  pipeGap = diff==="easy"?150:diff==="medium"?120:100; pipeSpeed = diff==="easy"?2:diff==="medium"?3:4;
  ball = {x:60, y:cvs.height/2, r:12, v:0}; pipes=[]; frame=0; score=0; running=true; scoreElF.textContent="Score:0"; loop();
}

function loop(){
  if(!running) return;
  ctx.fillStyle="#1e1f29"; ctx.fillRect(0,0,cvs.width,cvs.height);
  // spawn pipes
  if(frame % 90 === 0){ const top = 20 + Math.random()*(cvs.height-pipeGap-60); pipes.push({x:cvs.width, top}); }
  // update pipes
  for(let i=pipes.length-1;i>=0;i--){
    const p=pipes[i]; p.x -= pipeSpeed;
    ctx.fillStyle="#50fa7b"; ctx.fillRect(p.x,0,40,p.top); ctx.fillRect(p.x,p.top+pipeGap,40,cvs.height-p.top-pipeGap);
    if(p.x + 40 < 0){ pipes.splice(i,1); score++; scoreElF.textContent="Score:"+score; }
    // collision
    if(ball.x+ball.r > p.x && ball.x-ball.r < p.x+40 && (ball.y-ball.r < p.top || ball.y+ball.r > p.top+pipeGap)){ end(); return; }
  }
  // ball physics
  ball.v += gravity; ball.y += ball.v;
  if(ball.y+ball.r>cvs.height || ball.y-ball.r<0){ end(); return; }
  // draw ball
  ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r,0,Math.PI*2); ctx.fillStyle="#ffb86c"; ctx.fill(); ctx.closePath();
  frame++; requestAnimationFrame(loop);
}

function end(){ running=false; saveHighScore("flappyHighScore", score); ctx.fillStyle="#ff5555"; ctx.font="20px Arial"; ctx.fillText("Game Over - Score:"+score, 20, cvs.height/2); }

function saveHighScore(key, s){ const prev=Number(localStorage.getItem(key)||0); if (s>prev){ localStorage.setItem(key,s); window.refreshLeaderboard && window.refreshLeaderboard(); } }

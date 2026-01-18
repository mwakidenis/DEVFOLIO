const cvsA = document.getElementById("ast"), ctxA = cvsA.getContext("2d");
const startBtnA = document.getElementById("startBtn"), scoreElA = document.getElementById("score");
let ship, bullets, asteroids, running=false, score=0, asteroidSpeed=1.8;

startBtnA.addEventListener("click", ()=>{
  const diff = document.getElementById("difficulty").value; asteroidSpeed = diff==="easy"?1.5: diff==="medium"?2.2:3;
  ship = {x:cvsA.width/2, y:cvsA.height/2, r:12}; bullets=[]; asteroids=[]; score=0; running=true;
  for(let i=0;i<5;i++) spawnAst();
  loop();
});

function spawnAst(){ asteroids.push({x:Math.random()*cvsA.width, y:Math.random()*cvsA.height, r:12+Math.random()*18, dx:(Math.random()-0.5)*asteroidSpeed*2, dy:(Math.random()-0.5)*asteroidSpeed*2}); }

document.addEventListener("keydown", (e)=>{ if(e.code==="Space"){ bullets.push({x:ship.x, y:ship.y, dx:0, dy:-6, r:3}); } });
cvsA.addEventListener("mousemove", e=>{ const r=cvsA.getBoundingClientRect(); ship.x = e.clientX - r.left; ship.y = e.clientY - r.top; });

function loop(){ if(!running) return;
  ctxA.clearRect(0,0,cvsA.width,cvsA.height);
  // draw ship
  ctxA.beginPath(); ctxA.arc(ship.x,ship.y,ship.r,0,Math.PI*2); ctxA.fillStyle="#50fa7b"; ctxA.fill(); ctxA.closePath();
  // bullets
  for(let i=bullets.length-1;i>=0;i--){ const b=bullets[i]; b.x+=b.dx; b.y+=b.dy; ctxA.beginPath(); ctxA.arc(b.x,b.y,b.r,0,Math.PI*2); ctxA.fillStyle="#ffb86c"; ctxA.fill(); if(b.y<0) bullets.splice(i,1);}
  // asteroids
  for(let i=asteroids.length-1;i>=0;i--){ const a=asteroids[i]; a.x+=a.dx; a.y+=a.dy; if(a.x<0) a.x=cvsA.width; if(a.x>cvsA.width) a.x=0; if(a.y<0) a.y=cvsA.height; if(a.y>cvsA.height) a.y=0;
    ctxA.beginPath(); ctxA.arc(a.x,a.y,a.r,0,Math.PI*2); ctxA.fillStyle="#ff5555"; ctxA.fill(); // collision ship
    if(Math.hypot(a.x-ship.x, a.y-ship.y) < a.r + ship.r){ running=false; saveHighScore("asteroidsHighScore", score); alert("Game Over: "+score); return; }
    // bullets hit
    for(let j=bullets.length-1;j>=0;j--){ const b=bullets[j]; if(Math.hypot(a.x-b.x, a.y-b.y) < a.r + b.r){ bullets.splice(j,1); asteroids.splice(i,1); score += 10; scoreElA.textContent="Score:"+score; spawnAst(); break; } }
  }
  requestAnimationFrame(loop);
}

function saveHighScore(k,s){ const prev=Number(localStorage.getItem(k)||0); if(s>prev){ localStorage.setItem(k,s); window.refreshLeaderboard && window.refreshLeaderboard(); } }

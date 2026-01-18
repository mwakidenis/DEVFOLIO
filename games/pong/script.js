const cvsP = document.getElementById("pong"), ctxP = cvsP.getContext("2d");
const startBtnP = document.getElementById("startBtn"), scoreElP = document.getElementById("score");
let player = {x:10,y:150,w:10,h:80}, ai={x:580,y:150,w:10,h:80}, ball={x:300,y:180,r:7,dx:4,dy:4};
let gameP=false, pScore=0,aScore=0, aiSpeed=4;

startBtnP.addEventListener("click", ()=> {
  const diff = document.getElementById("difficulty").value;
  aiSpeed = diff==="easy"?2:diff==="medium"?4:6; pScore=0; aScore=0; ball.x=300; ball.y=180; ball.dx=4; ball.dy=4; gameP=true; loop();
});

function draw(){
  ctxP.clearRect(0,0,cvsP.width,cvsP.height);
  ctxP.fillStyle="#8be9fd"; ctxP.fillRect(player.x,player.y,player.w,player.h);
  ctxP.fillStyle="#ff79c6"; ctxP.fillRect(ai.x,ai.y,ai.w,ai.h);
  ctxP.beginPath(); ctxP.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctxP.fillStyle="#f1fa8c"; ctxP.fill(); ctxP.closePath();
  scoreElP.textContent = `Player:${pScore} | AI:${aScore}`;
}
function update(){
  ball.x += ball.dx; ball.y += ball.dy;
  if(ball.y-ball.r<0 || ball.y+ball.r>cvsP.height) ball.dy *= -1;
  // collisions
  if(ball.x-ball.r < player.x+player.w && ball.y > player.y && ball.y < player.y+player.h){ ball.dx = Math.abs(ball.dx); }
  if(ball.x+ball.r > ai.x && ball.y > ai.y && ball.y < ai.y+ai.h){ ball.dx = -Math.abs(ball.dx); }
  if(ball.x < 0){ aScore++; resetBall(); }
  if(ball.x > cvsP.width){ pScore++; resetBall(); }
  // AI follows
  ai.y += (ball.y - (ai.y+ai.h/2)) * 0.04 * (aiSpeed/3);
}
function resetBall(){ ball.x = cvsP.width/2; ball.y=cvsP.height/2; ball.dx = -ball.dx; }
function loop(){ if(!gameP) return; update(); draw(); requestAnimationFrame(loop); }
cvsP.addEventListener("mousemove", (e)=> { const r = cvsP.getBoundingClientRect(); player.y = e.clientY - r.top - player.h/2; });


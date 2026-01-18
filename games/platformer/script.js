const cvsPF = document.getElementById("pf"), ctxPF = cvsPF.getContext("2d");
const startBtnPF = document.getElementById("startBtn"), scoreElPF = document.getElementById("score");
let player, platforms, gravity=0.7, running=false, scorePF=0, keys={};

startBtnPF.addEventListener("click", ()=>{
  const diff = document.getElementById("difficulty").value; gravity = diff==="easy"?0.5: diff==="medium"?0.7:0.95;
  player = {x:40,y:300,w:28,h:40,dx:0,dy:0};
  platforms = [{x:0,y:340,w:640,h:20},{x:130,y:260,w:100,h:12},{x:300,y:200,w:100,h:12},{x:460,y:140,w:100,h:12}];
  scorePF=0; running=true; loop();
});

document.addEventListener("keydown",(e)=> keys[e.code]=true); document.addEventListener("keyup",(e)=> keys[e.code]=false);

function loop(){
  if(!running) return;
  ctxPF.clearRect(0,0,cvsPF.width,cvsPF.height);
  // controls
  if(keys["ArrowLeft"]) player.dx = -4; else if(keys["ArrowRight"]) player.dx = 4; else player.dx = 0;
  if(keys["ArrowUp"] && onGround()) player.dy = -12;
  player.dy += gravity; player.x += player.dx; player.y += player.dy;
  // collision with platforms
  platforms.forEach(p => {
    if(player.x + player.w > p.x && player.x < p.x + p.w && player.y + player.h > p.y && player.y + player.h - player.dy <= p.y){
      player.dy = 0; player.y = p.y - player.h; scorePF++;
      scoreElPF.textContent = "Score: "+scorePF;
    }
  });
  // bounds
  if(player.y > cvsPF.height){ running=false; saveHighScore("platformerHighScore", scorePF); alert("Game Over: "+scorePF); return; }
  // draw platforms
  ctxPF.fillStyle = "#8be9fd"; platforms.forEach(p=> ctxPF.fillRect(p.x,p.y,p.w,p.h));
  // draw player
  ctxPF.fillStyle = "#ffb86c"; ctxPF.fillRect(player.x,player.y,player.w,player.h);
  requestAnimationFrame(loop);
}

function onGround(){ return platforms.some(p => player.y + player.h === p.y && player.x + player.w > p.x && player.x < p.x + p.w); }
function saveHighScore(k,s){ const p=Number(localStorage.getItem(k)||0); if(s>p){ localStorage.setItem(k,s); window.refreshLeaderboard && window.refreshLeaderboard(); } }

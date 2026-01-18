const startBtn2048 = document.getElementById("startBtn"), gameWrap = document.getElementById("gameWrap"), score2048 = document.getElementById("score");
let grid = [], scoreVal=0;

startBtn2048.addEventListener("click", init);
function init(){
  grid = Array.from({length:16}, ()=>0); scoreVal=0; spawn(); spawn(); render(); score2048.textContent="Score:0";
  window.addEventListener("keydown", moveHandler);
}
function index(r,c){ return r*4 + c; }
function spawn(){ const empt = grid.map((v,i)=> v===0? i: null).filter(v=>v!==null); if(!empt.length) return; grid[empt[Math.floor(Math.random()*empt.length)]] = Math.random()>0.85?4:2; }
function render(){ gameWrap.innerHTML=''; grid.forEach(v=>{ const d = document.createElement("div"); d.className='tile'; d.textContent = v? v:''; gameWrap.appendChild(d); }); score2048.textContent = "Score:"+scoreVal; }
function moveHandler(e){
  if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code)===-1) return;
  let moved=false;
  if(e.code==="ArrowLeft") moved = shiftLeft();
  if(e.code==="ArrowRight") moved = shiftRight();
  if(e.code==="ArrowUp") moved = shiftUp();
  if(e.code==="ArrowDown") moved = shiftDown();
  if(moved){ spawn(); render(); if(grid.every(v=> v!==0 && !canMove())) { saveHighScore("2048HighScore", scoreVal); alert("Game Over - Score:"+scoreVal);} }
}
function shiftLeft(){ let moved=false; for(let r=0;r<4;r++){ let row = [grid[index(r,0)],grid[index(r,1)],grid[index(r,2)],grid[index(r,3)]].filter(v=> v!==0); for(let i=0;i<row.length-1;i++){ if(row[i]===row[i+1]){ row[i]*=2; scoreVal+=row[i]; row.splice(i+1,1); } } while(row.length<4) row.push(0); for(let c=0;c<4;c++){ if(grid[index(r,c)]!==row[c]) moved=true; grid[index(r,c)] = row[c]; } } return moved; }
function shiftRight(){ rotateGrid(); rotateGrid(); let moved = shiftLeft(); rotateGrid(); rotateGrid(); return moved; }
function shiftUp(){ rotateGrid(); rotateGrid(); rotateGrid(); let moved = shiftLeft(); rotateGrid(); return moved; }
function shiftDown(){ rotateGrid(); let moved = shiftLeft(); rotateGrid(); rotateGrid(); rotateGrid(); return moved; }
function rotateGrid(){ const copy = grid.slice(); for(let r=0;r<4;r++) for(let c=0;c<4;c++) grid[index(r,c)] = copy[index(3-c,r)]; }
function canMove(){ for(let r=0;r<4;r++) for(let c=0;c<4;c++){ if(grid[index(r,c)]===0) return true; const v=grid[index(r,c)]; if(c<3 && v===grid[index(r,c+1)]) return true; if(r<3 && v===grid[index(r+1,c)]) return true; } return false; }
function saveHighScore(k,s){ const prev=Number(localStorage.getItem(k)||0); if(s>prev){ localStorage.setItem(k,s); window.refreshLeaderboard && window.refreshLeaderboard(); } }

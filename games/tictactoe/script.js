const boardEl = document.getElementById("board"), startBtn = document.getElementById("startBtn"), statusEl = document.getElementById("status");
let board, player='X', ai='O', playing=false;

startBtn.addEventListener("click", init);
function init(){
  board = Array(9).fill(null); playing=true; render(); statusEl.textContent = "Your turn (X)";
}

function render(){
  boardEl.innerHTML='';
  board.forEach((v,i)=>{
    const cell = document.createElement("div"); cell.className='cell'; cell.dataset.i=i; cell.textContent = v? v: '';
    cell.addEventListener("click", ()=> cellClick(i));
    boardEl.appendChild(cell);
  });
}

function cellClick(i){
  if(!playing || board[i]) return;
  board[i]=player; render();
  if(checkWin(player)){ statusEl.textContent = "You Win!"; gameOver(player); return; }
  if(board.every(Boolean)){ statusEl.textContent="Draw"; gameOver(); return; }
  statusEl.textContent = "Computer's turn...";
  setTimeout(() => { aiMove(); render(); }, 300);
}

function aiMove(){
  const diff = document.getElementById("difficulty").value;
  let move;
  if (diff === "easy") {
    const empt = board.map((v,idx)=> v?null:idx).filter(v=>v!==null); move = empt[Math.floor(Math.random()*empt.length)];
  } else {
    // win/block simple logic
    move = findWinningMove(ai) ?? findWinningMove(player) ?? randomMove();
  }
  if (move===undefined) return;
  board[move]=ai;
  if (checkWin(ai)){ statusEl.textContent="Computer wins"; gameOver(ai); return; }
  if (board.every(Boolean)){ statusEl.textContent="Draw"; gameOver(); return; }
  statusEl.textContent = "Your turn (X)";
}

function findWinningMove(p){
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (let i=0;i<9;i++) if(!board[i]){ board[i]=p; if(checkWin(p)){ board[i]=null; return i; } board[i]=null; }
  return null;
}
function randomMove(){ const empt = board.map((v,idx)=> v?null:idx).filter(i=>i!==null); return empt[Math.floor(Math.random()*empt.length)]; }
function checkWin(p){ const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; return wins.some(r=> r.every(i=> board[i]===p)); }
function gameOver(winner){
  playing=false;
  // scoring: X win=100, AI win=50, draw=25
  let score = winner===player? 100 : winner===ai? 50 : 25;
  saveHighScore("tictactoeHighScore", score);
}

function saveHighScore(key, score){
  const prev = Number(localStorage.getItem(key)||0);
  if (score>prev) { localStorage.setItem(key, score); window.refreshLeaderboard && window.refreshLeaderboard(); }
}


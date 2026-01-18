const board = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");
const EMOJIS = ["🍎","🍌","🍇","🍒","🥝","🍍","🍑","🍉","🥕","🍓"];

let cards = [], openCards = [], matched = 0, pairs = 6;

startBtn.addEventListener("click", startGame);

function startGame(){
  const diff = document.getElementById("difficulty").value;
  pairs = diff === "easy" ? 4 : diff === "medium" ? 6 : 8;
  const chosen = EMOJIS.slice(0, pairs);
  cards = shuffle([...chosen, ...chosen]);
  matched = 0; openCards = [];
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${Math.min(6,pairs)}, 1fr)`;
  cards.forEach((sym, i) => {
    const el = document.createElement("div");
    el.className = "card";
    el.dataset.sym = sym;
    el.textContent = "❔";
    el.addEventListener("click", ()=> flipCard(el));
    board.appendChild(el);
  });
  status.textContent = "Find all pairs!";
}

function flipCard(el){
  if (el.classList.contains("revealed") || openCards.includes(el) || openCards.length===2) return;
  el.textContent = el.dataset.sym;
  el.classList.add("revealed");
  openCards.push(el);
  if (openCards.length===2) setTimeout(checkMatch, 650);
}

function checkMatch(){
  const [a,b] = openCards;
  if (a.dataset.sym === b.dataset.sym){
    matched++;
    a.removeEventListener("click", ()=>flipCard(a));
    b.removeEventListener("click", ()=>flipCard(b));
    if (matched === cards.length/2){
      status.textContent = "🎉 You Win!";
      saveHighScore("memoryHighScore", matched*100); // arbitrary scoring
    }
  } else {
    a.textContent = "❔"; b.textContent = "❔";
    a.classList.remove("revealed"); b.classList.remove("revealed");
  }
  openCards = [];
}

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

function saveHighScore(key, score){
  const prev = Number(localStorage.getItem(key) || 0);
  if (score > prev) {
    localStorage.setItem(key, score);
    window.refreshLeaderboard && window.refreshLeaderboard();
  }
}

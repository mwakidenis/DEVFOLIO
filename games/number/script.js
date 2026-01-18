const startBtnG = document.getElementById("startBtn"), guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput"), instruction = document.getElementById("instruction"), result = document.getElementById("result");
let secret, max, attempts=0;

startBtnG.addEventListener("click", ()=>{
  max = Number(document.getElementById("difficulty").value);
  secret = Math.floor(Math.random()*max)+1; attempts=0;
  instruction.textContent = `Guess a number between 1 and ${max}`;
  guessInput.disabled=false; guessBtn.disabled=false; result.textContent='';
});

guessBtn.addEventListener("click", ()=>{
  const g = Number(guessInput.value); if (!g) { result.textContent='Enter valid number'; return;}
  attempts++;
  if (g === secret){ result.textContent = `🎉 Correct! ${secret} in ${attempts} tries.`; guessInput.disabled=true; guessBtn.disabled=true; saveHighScore("guessHighScore", Math.max(0, 100 - attempts)); }
  else result.textContent = g < secret ? '🔼 Too low' : '🔽 Too high';
});

function saveHighScore(key, s){ const prev=Number(localStorage.getItem(key)||0); if (s>prev){ localStorage.setItem(key,s); window.refreshLeaderboard && window.refreshLeaderboard(); } }



/* script.js - triangles + sprites + leaderboard loader */
(() => {
  const canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.zIndex = "-3";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  addEventListener("resize", resize);
  resize();

  // triangles
  const triangles = Array.from({length: 28}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    s: 18 + Math.random()*40,
    dx: (Math.random()-0.5)*0.3,
    dy: 0.08 + Math.random()*0.4,
    hue: 250 + Math.random()*60
  }));

  // sprite assets (unicorns/rainbows)
  const spritePaths = [
    "assets/unicorn1.png",
    "assets/unicorn2.png",
    "assets/rainbow1.png",
    "assets/rainbow2.png"
  ];
  const sprites = [];
  const loaded = [];
  for (let p of spritePaths){
    const img = new Image();
    img.src = p;
    loaded.push(img);
  }
  // create sprite objects after small delay for images to populate
  for (let i=0;i<8;i++){
    const type = i<4 ? "unicorn" : "rainbow";
    sprites.push({
      img: loaded[i%loaded.length],
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: 48 + Math.random()*56,
      dx: (Math.random()-0.5)*0.4,
      dy: 0.05 + Math.random()*0.25,
      hover:false,
      id:i
    });
  }

  function drawTriangle(t){
    ctx.beginPath();
    ctx.moveTo(t.x, t.y - t.s/2);
    ctx.lineTo(t.x - t.s/2, t.y + t.s/2);
    ctx.lineTo(t.x + t.s/2, t.y + t.s/2);
    ctx.closePath();
    ctx.strokeStyle = `hsla(${t.hue},70%,70%,0.08)`;
    ctx.stroke();
  }

  function drawSprite(s){
    const size = s.hover ? s.size * 1.22 : s.size;
    ctx.save();
    if (s.hover){
      ctx.shadowColor = "rgba(255,255,255,0.65)";
      ctx.shadowBlur = 18;
    }
    if (s.img && s.img.complete) ctx.drawImage(s.img, s.x - size/2, s.y - size/2, size, size);
    ctx.restore();
  }

  function step(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let t of triangles){
      t.x += t.dx; t.y += t.dy;
      if (t.y > canvas.height + t.s) { t.y = -t.s; t.x = Math.random()*canvas.width; }
      if (t.x < -t.s) t.x = canvas.width + t.s;
      if (t.x > canvas.width + t.s) t.x = -t.s;
      drawTriangle(t);
    }
    for (let s of sprites){
      s.x += s.dx; s.y += s.dy;
      if (s.y > canvas.height + s.size) { s.y = -s.size; s.x = Math.random()*canvas.width; }
      drawSprite(s);
    }
    requestAnimationFrame(step);
  }
  step();

  // mouse hover: mark sprite hover if mouse near center
  window.addEventListener("mousemove", (e)=>{
    for (let s of sprites){
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      s.hover = dist < s.size*0.55;
    }
  });

  // Leaderboard loader - reads fixed localStorage keys
  function loadLeaderboardData(){
    const mapping = {
      snake: "snakeHighScore",
      flappy: "flappyHighScore",
      puzzle: "2048HighScore",
      memory: "memoryHighScore",
      tictactoe: "tictactoeHighScore",
      pong: "pongHighScore",
      breakout: "breakoutHighScore",
      asteroids: "asteroidsHighScore",
      platformer: "platformerHighScore",
      mario: "marioHighScore"
    };
    // create entries
    const tbody = document.querySelector(".leaderboard tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    for (let [name,key] of Object.entries(mapping)){
      const score = localStorage.getItem(key);
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>—</td><td style="text-transform:capitalize">${name}</td><td>${score ? score : '---'}</td>`;
      tbody.appendChild(tr);
    }
  }

  window.addEventListener("load", loadLeaderboardData);
  window.refreshLeaderboard = loadLeaderboardData; // games call window.refreshLeaderboard() after updating highscore
})();

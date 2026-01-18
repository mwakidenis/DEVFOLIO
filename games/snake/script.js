(() => {
    // Elements
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('snake-score');
    const nextBtn = document.getElementById('snake-next');
    const restartBtn = document.getElementById('snake-restart');
    const startDiv = document.getElementById('snake-start');
    const gameDiv = document.getElementById('snake-game');
    const difficultySelect = document.getElementById('snake-difficulty');

    // Colors
    const COLORS = {bg:'#44475a', snake:'#50fa7b', mouth:'#ff5555', food:'#f1fa8c'};

    // Game state
    let snakeArr=[], snakeDir={x:0,y:0}, newDir={x:0,y:0}, food={x:0,y:0};
    let score=0, grid=30, tile=canvas.width/grid, speed=100, gameInterval;

    // Start button
    nextBtn.addEventListener('click', () => {
        startDiv.style.display='none';
        gameDiv.style.display='block';
        startGame();
    });

    // Restart button
    restartBtn.addEventListener('click', startGame);

    // Initialize game
    function startGame(){
        snakeArr=[{x:Math.floor(grid/2),y:Math.floor(grid/2)}];
        snakeDir={x:0,y:0};
        newDir={x:0,y:0};
        score=0;
        scoreEl.textContent=score;
        speed=200 - parseInt(difficultySelect.value)*10;
        placeFood();
        clearInterval(gameInterval);
        gameInterval=setInterval(gameLoop,speed);
    }

    // Place food
    function placeFood(){
        food={x:Math.floor(Math.random()*grid), y:Math.floor(Math.random()*grid)};
    }

    // Draw everything
    function draw(){
        ctx.fillStyle = COLORS.bg;
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle=COLORS.food;
        ctx.fillRect(food.x*tile,food.y*tile,tile,tile);

        snakeArr.forEach((seg,idx)=>{
            ctx.fillStyle=COLORS.snake;
            ctx.fillRect(seg.x*tile,seg.y*tile,tile,tile);
            if(idx===0){
                const mouthSize=tile*0.4;
                ctx.fillStyle=COLORS.mouth;
                ctx.fillRect(seg.x*tile+(tile-mouthSize)/2,seg.y*tile+(tile-mouthSize)/2,mouthSize,mouthSize);
            }
        });
    }

    // Game loop
    function gameLoop(){
        if(Math.abs(newDir.x)!==Math.abs(snakeDir.x)||Math.abs(newDir.y)!==Math.abs(snakeDir.y)) snakeDir=newDir;
        const head={x:snakeArr[0].x+snakeDir.x,y:snakeArr[0].y+snakeDir.y};

        if(head.x<0||head.x>=grid||head.y<0||head.y>=grid||snakeArr.some(s=>s.x===head.x&&s.y===head.y)){
            clearInterval(gameInterval);
            alert('Game Over! Score: '+score);
            return;
        }

        snakeArr.unshift(head);

        if(head.x===food.x&&head.y===food.y){
            score++;
            scoreEl.textContent=score;
            placeFood();
        } else snakeArr.pop();

        draw();
    }

    // Keyboard
    document.addEventListener('keydown', e=>{
        switch(e.key){
            case 'ArrowUp': if(snakeDir.y!==1) newDir={x:0,y:-1}; break;
            case 'ArrowDown': if(snakeDir.y!==-1) newDir={x:0,y:1}; break;
            case 'ArrowLeft': if(snakeDir.x!==1) newDir={x:-1,y:0}; break;
            case 'ArrowRight': if(snakeDir.x!==-1) newDir={x:1,y:0}; break;
        }
    });

})();

const confettiCanvas = document.getElementById('confettiCanvas');
let confettiInstance = new ConfettiGenerator({ target: confettiCanvas, max: 200, animate: false });
confettiInstance.render();

function playConfetti(){
    confettiInstance.clear();
    confettiInstance = new ConfettiGenerator({ target: confettiCanvas, max: 200, animate: true });
    confettiInstance.render();
}

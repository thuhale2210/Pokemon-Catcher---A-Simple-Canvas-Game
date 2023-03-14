// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.getElementById('tv-screen').appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";
bgImage.id = "bgImage";

// pikachu image
var pikachuReady = false;
var pikachuImage = new Image();
pikachuImage.onload = function () {
    pikachuReady = true;
};
pikachuImage.src = "images/pikachu.png";

// Game objects
var pikachu = {
    x: 0,
    y: 0,
    width: 32,
    height: 32
};
var pikachusCaught = 0;

// Add a click event listener to the canvas
canvas.addEventListener('click', function (event) {
    // Get the click coordinates
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    // Check if the click is within the bounds of the Pikachu image
    if (
        mouseX >= pikachu.x
        && mouseX <= pikachu.x + 32
        && mouseY >= pikachu.y
        && mouseY <= pikachu.y + 32
    ) {
        if (time > 0) {
            ++pikachusCaught;
            reset();
            time -= 3000;
        } else if (time <= 0) {
            alert("Game Over!");
        }
    }
}, false);

// Reset the game when the player catches a pikachu
var reset = function () {
    // Throw the pikachu somewhere on the screen randomly
    pikachu.x = 32 + (Math.random() * (canvas.width - 64));
    pikachu.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update score
var updateScore = function () {
    document.getElementById("score").innerHTML = "Score: " + pikachusCaught;
};

// Setup timer
let time = 20000;
document.getElementById("timer").innerHTML = "Timer: " + (time / 1000);
function timer() {
    var timer = setInterval(function () {
        if (time <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "Timer: 0";
            alert("Game Over!");
        } else {
            document.getElementById("timer").innerHTML = "Timer: " + (time / 1000);
        }
        time -= 1000;
    }, 1000);
};

// Setup Reset Score Button
var resetScore = function () {
    pikachusCaught = 0;
};
document.getElementById("resetButton").addEventListener("click", resetScore);

// Setup Reset Speed Button
var resetSpeed = function () {
    time = 20000;
    document.getElementById("timer").innerHTML = "Timer: " + (time / 1000);
    timer();
};
document.getElementById("speedButton").addEventListener("click", resetSpeed);


// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (pikachuReady) {
        ctx.drawImage(pikachuImage, pikachu.x, pikachu.y);
    }
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    updateScore(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
timer();
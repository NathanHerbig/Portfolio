const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
let wind = 0;
let targetWind= 0;

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;  // Random start position (X)
        this.y = Math.random() * canvas.height; // Random start position (Y)
        this.radius = Math.random() * 2 + 1;    // Snowflake size
        this.speed = Math.random() * 1.5 + 0.5; // Falling speed
        this.windEffect = Math.random() * 0.5;  // Small natural drift
    }

    fall() {
        this.y += this.speed;  // Snow falls downward
        this.x += wind * this.radius * 0.1 + this.windEffect; // Apply smooth wind effect
    
        // If snowflake reaches bottom, reset to top
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    
        // Wrap snowflakes around if they go off screen horizontally
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
    }    

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";  // White snow with slight transparency
        ctx.fill();
    }
}

//Wind Update
function updateWind() {
    // Randomly choose a new wind target between -1 and 1 (soft gusts)
    targetWind = (Math.random() - 0.5) * 2; 

    // Change target every 5-10 seconds for more natural gusts
    setTimeout(updateWind, Math.random() * 5000 + 5000);
}
updateWind(); // Start wind updates



// Create raindrops
for (let i = 200; i < 300; i++) {  // Adjust quantity as needed
    snowflakes.push(new Snowflake());
}


// Animation loop
function animate() {
    // Smoothly interpolate (lerp) wind toward the target wind value
    wind += (targetWind - wind) * 0.01;  // Lower = slower wind change, higher = faster

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach((flake) => {
        flake.fall();
        flake.draw();
    });

    requestAnimationFrame(animate);
}


// Start animation
animate();

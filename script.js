const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let wind = 0;
let targetWind = 0;
let weatherType = "snow"; // Default weather

class Particle {
    constructor(type) {
        this.type = type; // "snow" or "rain"
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        if (this.type === "snow") {
            this.radius = Math.random() * 2 + 1; // Snow size
            this.speed = Math.random() * 1.5 + 0.5; // Snow falls slower
            this.windEffect = Math.random() * 0.5;
        } else if (this.type === "rain") {
            this.radius = Math.random() * 1 + 0.5; // Raindrop thickness
            this.speed = Math.random() * 4 + 3; // Faster falling speed
            this.windEffect = Math.random() * 0.2; // Less wind effect
        }
    }

    fall() {
        this.y += this.speed; // Movement downwards
        
        if (this.type === "snow") {
            this.x += wind * this.radius * 0.1 + this.windEffect; // Slight drift
        } else if (this.type === "rain") {
            this.x += wind * 0.1; // Very minimal sideways movement
        }
    
        // Reset position when reaching bottom
        if (this.y > canvas.height) {
            this.reset();
            this.y = 0;
        }

        // Wrap around horizontally
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
    }

    draw() {
        ctx.beginPath();
        if (this.type === "snow") {
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fill();
        } else if (this.type === "rain") {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + wind * 3, this.y + this.speed * 2);
            ctx.strokeStyle = "rgba(173, 216, 230, 0.8)"; // Light blue
            ctx.lineWidth = this.radius;
            ctx.stroke();
        }
    }
}

// Wind Update (Smooth Gusts)
function updateWind() {
    targetWind = (Math.random() - 0.5) * 2; // Random wind between -1 and 1
    setTimeout(updateWind, Math.random() * 5000 + 5000);
}
updateWind();

// Create particles
function createParticles(type) {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(type));
    }
}

// Animation Loop
function animate() {
    wind += (targetWind - wind) * 0.01; // Smooth wind transition

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p) => {
        p.fall();
        p.draw();
    });

    requestAnimationFrame(animate);
}

// Weather Toggle Functions
function enableSnow() {
    weatherType = "snow";
    createParticles("snow");
    canvas.style.display = "block";
}

function enableRain() {
    weatherType = "rain";
    createParticles("rain");
    canvas.style.display = "block";
}

function clearEffects() {
    canvas.style.display = "none";
}

// Event Listeners for Weather Buttons
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("snow-toggle").addEventListener("click", enableSnow);
    document.getElementById("rain-toggle").addEventListener("click", enableRain);
    document.getElementById("clear-toggle").addEventListener("click", clearEffects);
});

// Initialize with Snow Effect
enableSnow();
animate();

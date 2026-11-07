const starCanvas = document.getElementById('star-canvas');
if (starCanvas) {
    const ctx = starCanvas.getContext('2d');
    let starParticles = [];

    function resizeCanvas() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        createStars();
    }

    function createStars() {
        starParticles = [];
        const numStars = Math.floor((starCanvas.width * starCanvas.height) / 2000);
        for (let i = 0; i < numStars; i++) {
            starParticles.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                radius: Math.random() * 1.2 + 0.3,
                opacity: Math.random(),
                speed: Math.random() * 0.02 + 0.005
            });
        }
    }

    let time = 0;
    function animateStars() {
        ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        time += 0.05;
        starParticles.forEach(star => {
            let currentOpacity = Math.abs(Math.sin(time * star.speed + star.x)) * 0.7 + 0.3;
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateStars();
}
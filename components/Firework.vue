<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="canvas-container h-5/6 w-5/6 overflow-hidden">
            <canvas id="trails-canvas"></canvas>
            <canvas id="main-canvas"></canvas>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';

export default {
    setup() {
        const loading = ref(true);
        const menuOpen = ref(false);
        const config = ref({
            quality: 2,
            autoLaunch: true,
            finale: false,
        });

        let animationFrame;
        let animationTimeout;

        onMounted(async () => {
            await nextTick();
            initStages();
            loading.value = false;

            // Stop the animation after 5 minutes
            animationTimeout = setTimeout(() => {
                cancelAnimationFrame(animationFrame);
            }, 300000); // 300,000 milliseconds = 5 minutes
        });

        const initStages = () => {
            const trailsCanvas = document.getElementById('trails-canvas');
            const mainCanvas = document.getElementById('main-canvas');

            if (!trailsCanvas || !mainCanvas) {
                console.error('Canvas elements not found');
                return;
            }

            const trailsCtx = trailsCanvas.getContext('2d');
            const mainCtx = mainCanvas.getContext('2d');

            const stageWidth = trailsCanvas.parentElement.clientWidth;
            const stageHeight = trailsCanvas.parentElement.clientHeight;

            trailsCanvas.width = mainCanvas.width = stageWidth;
            trailsCanvas.height = mainCanvas.height = stageHeight;

            // Firework Animation Code
            let fireworks = [];
            let particles = [];
            let hue = 120;
            const limiterTotal = 2; // Reduced interval for user-initiated fireworks
            let limiterTick = 0;
            const timerTotal = 40; // Reduced interval for auto-launching fireworks
            let timerTick = 0;
            let mousedown = false;
            let mx = 0;
            let my = 0;

            // Utility functions
            const random = (min, max) => Math.random() * (max - min) + min;

            const calculateDistance = (p1x, p1y, p2x, p2y) => {
                const xDistance = p1x - p2x;
                const yDistance = p1y - p2y;
                return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            };

            // Firework constructor
            function Firework(sx, sy, tx, ty) {
                this.x = sx;
                this.y = sy;
                this.sx = sx;
                this.sy = sy;
                this.tx = tx;
                this.ty = ty;
                this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
                this.distanceTraveled = 0;
                this.coordinates = [];
                this.coordinateCount = 3;
                while (this.coordinateCount--) {
                    this.coordinates.push([this.x, this.y]);
                }
                this.angle = Math.atan2(ty - sy, tx - sx);
                this.speed = 2;
                this.acceleration = 1.05;
                this.brightness = random(50, 70);
                this.targetRadius = 1;
            }

            Firework.prototype.update = function (index) {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);

                if (this.targetRadius < 8) {
                    this.targetRadius += 0.3;
                } else {
                    this.targetRadius = 1;
                }

                this.speed *= this.acceleration;

                const vx = Math.cos(this.angle) * this.speed;
                const vy = Math.sin(this.angle) * this.speed;
                this.distanceTraveled = calculateDistance(
                    this.sx,
                    this.sy,
                    this.x + vx,
                    this.y + vy,
                );

                if (this.distanceTraveled >= this.distanceToTarget) {
                    createParticles(this.tx, this.ty);
                    fireworks.splice(index, 1);
                } else {
                    this.x += vx;
                    this.y += vy;
                }
            };

            Firework.prototype.draw = function () {
                trailsCtx.beginPath();
                trailsCtx.moveTo(
                    this.coordinates[this.coordinates.length - 1][0],
                    this.coordinates[this.coordinates.length - 1][1],
                );
                trailsCtx.lineTo(this.x, this.y);
                trailsCtx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
                trailsCtx.stroke();

                trailsCtx.beginPath();
                trailsCtx.arc(
                    this.tx,
                    this.ty,
                    this.targetRadius,
                    0,
                    Math.PI * 2,
                );
                trailsCtx.stroke();
            };

            // Particle constructor
            function Particle(x, y) {
                this.x = x;
                this.y = y;
                this.coordinates = [];
                this.coordinateCount = 5;
                while (this.coordinateCount--) {
                    this.coordinates.push([this.x, this.y]);
                }
                this.angle = random(0, Math.PI * 2);
                this.speed = random(1, 10);
                this.friction = 0.95;
                this.gravity = 1;
                this.hue = random(hue - 20, hue + 20);
                this.brightness = random(50, 80);
                this.alpha = 1;
                this.decay = random(0.015, 0.03);
            }

            Particle.prototype.update = function (index) {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);

                this.speed *= this.friction;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed + this.gravity;
                this.alpha -= this.decay;

                if (this.alpha <= this.decay) {
                    particles.splice(index, 1);
                }
            };

            Particle.prototype.draw = function () {
                trailsCtx.beginPath();
                trailsCtx.moveTo(
                    this.coordinates[this.coordinates.length - 1][0],
                    this.coordinates[this.coordinates.length - 1][1],
                );
                trailsCtx.lineTo(this.x, this.y);
                trailsCtx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
                trailsCtx.stroke();
            };

            // Create particle explosion at fireworks end point
            function createParticles(x, y) {
                let particleCount = 30;
                while (particleCount--) {
                    particles.push(new Particle(x, y));
                }
            }

            // Main loop
            function loop() {
                animationFrame = requestAnimationFrame(loop);

                hue += 0.5;

                trailsCtx.globalCompositeOperation = 'destination-out';
                trailsCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                trailsCtx.fillRect(0, 0, stageWidth, stageHeight);
                trailsCtx.globalCompositeOperation = 'lighter';

                let i = fireworks.length;
                while (i--) {
                    fireworks[i].draw();
                    fireworks[i].update(i);
                }

                let j = particles.length;
                while (j--) {
                    particles[j].draw();
                    particles[j].update(j);
                }

                if (timerTick >= timerTotal) {
                    if (!mousedown) {
                        fireworks.push(
                            new Firework(
                                stageWidth / 2,
                                stageHeight,
                                random(0, stageWidth),
                                random(0, stageHeight / 2),
                            ),
                        );
                        timerTick = 0;
                    }
                } else {
                    timerTick++;
                }

                if (limiterTick >= limiterTotal) {
                    if (mousedown) {
                        fireworks.push(
                            new Firework(stageWidth / 2, stageHeight, mx, my),
                        );
                        limiterTick = 0;
                    }
                } else {
                    limiterTick++;
                }
            }

            loop();
        };

        return {
            loading,
            menuOpen,
            config,
        };
    },
};
</script>

<style scoped>
* {
    position: relative;
    box-sizing: border-box;
}

html,
body {
    height: 100%;
}

html {
    background-color: #000;
}

body {
    overflow: hidden;
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Russo One', arial, sans-serif;
    line-height: 1.25;
    letter-spacing: 0.06em;
}

.canvas-container {
    width: 100%;
    height: 100%;
    transition: filter 0.3s;
}

#trails-canvas,
#main-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
}
</style>

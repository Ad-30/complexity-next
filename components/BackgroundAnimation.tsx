"use client"

import React, { useEffect, useRef } from 'react'
import { useAnimationStore } from '@/store/animationStore'

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isAnalyzing, analysisCompleted, buttonClicked } = useAnimationStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const particles: {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      lerpSpeed: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      angle: number;
      radius: number;
      speed: number;
      orbiting: boolean;
    }[] = [];

    const numParticles = 100;
    const maxVelocity = 0.5;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const circleRadius = 50;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      const randomAngle = Math.random() * 2 * Math.PI;
      const randomRadius = circleRadius + Math.random() * 50;

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: centerX + Math.cos(randomAngle) * randomRadius,
        targetY: centerY + Math.sin(randomAngle) * randomRadius,
        lerpSpeed: 0.05 + Math.random() * 0.03,
        vx: (Math.random() - 0.5) * maxVelocity,
        vy: (Math.random() - 0.5) * maxVelocity,
        size: Math.random() * 2 + 1,
        color: `rgba(0, 255, 255, ${Math.random() * 0.7 + 0.3})`,
        angle: randomAngle,
        radius: randomRadius,
        speed: 0.01 + Math.random() * 0.01,
        orbiting: false,
      });
    }

    const lerp = (start: number, end: number, t: number) => {
      return start + (end - start) * t;
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    let animationPhase = 0;
    let phaseStartTime = Date.now();

    const updateParticles = () => {
      const currentTime = Date.now();
      const cognitiveComplexityButton = document.querySelector('a[href="/cognitive-complexity"]');
      const buttonRect = cognitiveComplexityButton?.getBoundingClientRect();

      if (isAnalyzing) {
        if (animationPhase === 0 && currentTime - phaseStartTime > 2000) {
          animationPhase = 1;
          phaseStartTime = currentTime;
        }

        particles.forEach((particle) => {
          if (!particle.orbiting) {
            // Move particle towards the target circle position
            particle.x = lerp(particle.x, particle.targetX, particle.lerpSpeed);
            particle.y = lerp(particle.y, particle.targetY, particle.lerpSpeed);

            // Check if particle has reached the orbit position
            const distanceToTarget = Math.hypot(particle.x - particle.targetX, particle.y - particle.targetY);
            if (distanceToTarget < 5) {
              particle.orbiting = true; // Start orbiting when close to the target
            }
          } else {
            // Move particles in a circular orbit when they have reached the target
            particle.angle += particle.speed;
            particle.x = centerX + Math.cos(particle.angle) * particle.radius;
            particle.y = centerY + Math.sin(particle.angle) * particle.radius;
          }
        });
        // 
      }
      else if (analysisCompleted && buttonRect && !buttonClicked) {
        const targetX = buttonRect.left + buttonRect.width / 2;
        const targetY = buttonRect.top + buttonRect.height / 2;
        // console.log(buttonRect)
        particles.forEach((particle) => {
          particle.x = lerp(particle.x, targetX, 0.05);
          particle.y = lerp(particle.y, targetY, 0.05);

          if (Math.abs(particle.x - targetX) < 1 && Math.abs(particle.y - targetY) < 1) {
            particle.angle += particle.speed;
            const orbitRadius = Math.min(buttonRect.width, buttonRect.height) / 2;
            particle.x = targetX + Math.cos(particle.angle) * orbitRadius;
            particle.y = targetY + Math.sin(particle.angle) * orbitRadius;
          }
        });
      }
      else {
        particles.forEach((particle) => {
          particle.orbiting = false;
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
        });
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();

      requestAnimationFrame(animate);
    };

    const animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnalyzing, analysisCompleted, buttonClicked])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

export default BackgroundAnimation


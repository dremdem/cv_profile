'use client';

import { useEffect, useRef, useState } from 'react';

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with extra height for parallax
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 500;

    // Matrix characters
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/';
    const matrixChars = matrix.split('');

    // Adjust fontSize based on screen size
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? 12 : 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Draw function
    function draw() {
      if (!ctx || !canvas) return;

      // Black background with fade effect
      ctx.fillStyle = 'rgba(13, 2, 8, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Matrix green text with varying opacity for depth
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Vary opacity for depth effect
        const opacity = 0.5 + Math.random() * 0.5;
        ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;

        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    // Animation loop - adjust speed for mobile
    const animationSpeed = isMobile ? 50 : 33;
    const interval = setInterval(draw, animationSpeed);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight + 500;
    };

    // Handle scroll for parallax effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (prefersReducedMotion) {
    return null;
  }

  // Parallax transform - move slower than scroll
  const parallaxOffset = scrollY * 0.3;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        transform: `translateY(${parallaxOffset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
}

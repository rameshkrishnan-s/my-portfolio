import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const numberOfShapes = 50;
    
    // Create shapes
    for (let i = 0; i < numberOfShapes; i++) {
      const shape = document.createElement('div');
      shape.classList.add('shape');
      shape.style.setProperty('--rotation', `${Math.random() * 360}deg`);
      container.appendChild(shape);
    }

    // Animate shapes
    anime({
      targets: '.shape',
      translateX: () => anime.random(-500, 500),
      translateY: () => anime.random(-500, 500),
      scale: () => anime.random(0.2, 1.5),
      borderRadius: () => `${anime.random(20, 50)}%`,
      rotate: () => anime.random(-360, 360),
      opacity: () => anime.random(0.3, 0.6),
      duration: () => anime.random(3000, 5000),
      delay: () => anime.random(0, 1000),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad',
    });

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ filter: 'blur(3px)' }}
    >
      <style jsx>{`
        .shape {
          position: absolute;
          width: 50px;
          height: 50px;
          background: linear-gradient(
            var(--rotation),
            rgba(0, 188, 212, 0.2),
            rgba(29, 233, 182, 0.2)
          );
          border-radius: 30%;
        }

        :global(.dark) .shape {
          background: linear-gradient(
            var(--rotation),
            rgba(0, 96, 100, 0.2),
            rgba(0, 191, 165, 0.2)
          );
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;

import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isTouch = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animationFrame;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      animationFrame = requestAnimationFrame(animateRing);
    };

    const handleClick = () => {
      dot.classList.add('scale-125');
      ring.classList.add('scale-110');
      setTimeout(() => {
        dot.classList.remove('scale-125');
        ring.classList.remove('scale-110');
      }, 150);
    };

    const handleTouch = () => {
      isTouch.current = true;
      dot.style.display = 'none';
      ring.style.display = 'none';
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleTouch, { once: true });
    animationFrame = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Hide on mobile/touch
  useEffect(() => {
    if ('ontouchstart' in window || window.innerWidth < 768) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
    }
  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-300 transition-transform duration-150 ease-out"
        style={{ left: 0, top: 0 }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] w-9 h-9 rounded-full border-2 border-indigo-400 dark:border-indigo-200 bg-indigo-400/10 dark:bg-indigo-200/10 shadow-lg shadow-indigo-400/20 dark:shadow-indigo-900/30 transition-transform duration-200 ease-out"
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;
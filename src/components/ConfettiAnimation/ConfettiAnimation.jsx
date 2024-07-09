import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./ConfettiAnimation.css";

const ConfettiAnimation = forwardRef((props, ref) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useImperativeHandle(ref, () => ({
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  }));

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsMouseDown(false);
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    spawnConfetti(event.clientX, event.clientY);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      spawnConfetti(event.clientX, event.clientY);
    }
  };

  const handleTouchStart = (event) => {
    setIsMouseDown(true);
    const touch = event.touches[0];
    spawnConfetti(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  const handleTouchMove = (event) => {
    if (isMouseDown) {
      const touch = event.touches[0];
      spawnConfetti(touch.clientX, touch.clientY);
    }
  };

  const spawnConfetti = (x, y) => {
    for (let i = 0; i < 6; i++) {
      createConfetti(x, y);
    }
  };

  const createConfetti = (x, y) => {
    const colors = [
      "#bc1bc8",
      "#548ef3",
      "#2ecc71",
      "#f312ce",
      "#9b59b6",
      "#f1f869",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = randomColor;
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;

    document.body.appendChild(confetti);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 2;
    const rotationSpeed = (Math.random() - 0.5) * 10;

    let xVelocity = velocity * Math.cos(angle);
    let yVelocity = velocity * Math.sin(angle);
    const gravity = 0.1;

    const animateConfetti = () => {
      xVelocity *= 0.99;
      yVelocity += gravity;
      x += xVelocity;
      y += yVelocity;

      const currentRotation =
        parseFloat(
          confetti.style.transform.replace("rotate(", "").replace("deg)", "")
        ) || 0;
      confetti.style.transform = `rotate(${
        currentRotation + rotationSpeed
      }deg)`;

      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;

      if (y < window.innerHeight) {
        requestAnimationFrame(animateConfetti);
      } else {
        confetti.remove();
      }
    };

    requestAnimationFrame(animateConfetti);
  };

  return <div className="confetti-container"></div>;
});

export default ConfettiAnimation;

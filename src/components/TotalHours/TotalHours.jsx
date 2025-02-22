import React, { useEffect, useRef, useState } from "react";
import ConfettiAnimation from "../ConfettiAnimation/ConfettiAnimation";
import "./TotalHours.css";

const TotalHours = ({ totalHours }) => {
  const confettiRef = useRef();
  const [isMouseDown, setIsMouseDown] = useState(false);

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
    confettiRef.current.handleMouseDown(event);
  };

  const handleMouseUp = (event) => {
    confettiRef.current.handleMouseUp(event);
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      confettiRef.current.handleMouseMove(event);
    }
  };

  const handleTouchStart = (event) => {
    confettiRef.current.handleTouchStart(event);
  };

  const handleTouchEnd = (event) => {
    confettiRef.current.handleTouchEnd(event);
  };

  const handleTouchMove = (event) => {
    confettiRef.current.handleTouchMove(event);
  };

  return (
    <div className="total-hours">
      <ConfettiAnimation ref={confettiRef} />
      <span
        className="total-hours-span"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {totalHours} h
      </span>
    </div>
  );
};

export default TotalHours;

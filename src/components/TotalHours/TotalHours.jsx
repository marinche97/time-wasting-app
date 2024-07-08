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

  return (
    <div className="total-hours">
      <ConfettiAnimation ref={confettiRef} />
      <span
        className="total-hours-span"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {totalHours} h
      </span>
    </div>
  );
};

export default TotalHours;

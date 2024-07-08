import React, { useState, useRef, useEffect } from "react";

const SourceInput = ({ source, setSource }) => {
  const [suggestedSources] = useState(["mobitel", "Discord", "auto"]);
  const inputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isHovered && !isFocused) return;

      e.preventDefault();
      const currentIndex = suggestedSources.indexOf(source);
      if (e.deltaY < 0) {
        // Scroll up
        if (currentIndex > 0) {
          setSource(suggestedSources[currentIndex - 1]);
        } else {
          setSource(suggestedSources[suggestedSources.length - 1]);
        }
      } else {
        // Scroll down
        if (currentIndex < suggestedSources.length - 1) {
          setSource(suggestedSources[currentIndex + 1]);
        } else {
          setSource(suggestedSources[0]);
        }
      }
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("wheel", handleWheel);
    return () => inputElement.removeEventListener("wheel", handleWheel);
  }, [source, suggestedSources, setSource, isHovered, isFocused]);

  return (
    <label className="source-label">
      <input
        type="text"
        list="sources"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="source-input"
        ref={inputRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <datalist id="sources">
        {suggestedSources.map((source, index) => (
          <option key={index} value={source} />
        ))}
      </datalist>
    </label>
  );
};

export default SourceInput;

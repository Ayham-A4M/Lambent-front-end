import { useState, useEffect, useRef } from "react";

const useCalculateLearningTime = () => {
  const startingLearningTime = useRef(Date.now());
  const startingUnfocusTiming = useRef<null | number>(null);
  const unFocusTime = useRef<number>(0);
  const handleFocus = () => {
    console.log("focus");
    if (startingUnfocusTiming.current) {
      unFocusTime.current += Date.now() - startingUnfocusTiming.current;
      console.log("un focus Time : ", unFocusTime.current / 1000, " s");
      startingUnfocusTiming.current = 0;
    }
  };
  const handleNotFocus = () => {
    console.log("not focus");
    startingUnfocusTiming.current = Date.now();
  };
  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleNotFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleNotFocus);
    };
  }, []);
  return {startingLearningTime,unFocusTime}
};

export default useCalculateLearningTime;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AutoLogout = ({ children }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("SageData")
  );

 
const INACTIVITY_TIME = 72 * 60 * 60 * 1000; // 72 hours


  const logout = () => {
    console.log("User logged out due to inactivity");
    localStorage.removeItem("SageData");
    setIsLoggedIn(false);
    navigate("/");
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, INACTIVITY_TIME);
  };

  const activityHandler = () => {
    resetTimer();
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    // Add more event types if needed
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, activityHandler));

    resetTimer(); // Start the initial timer

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, activityHandler)
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoggedIn]);

  return <>{isLoggedIn ? children : null}</>;
};

export default AutoLogout;

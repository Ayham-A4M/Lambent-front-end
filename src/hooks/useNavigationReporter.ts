import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const useNavigationReporter = (stTime: number, unFTime: number) => {
  const location = useLocation();
  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }

    return () => {
      if (isMount.current) {
        const data = new FormData();
        data.append("learningTime", ((Date.now() - (stTime + unFTime)) / 60000).toString());
        navigator.sendBeacon(`${import.meta.env.VITE_BACKEND_URL}/api/user/learningTime`, data);
      }
    };
  }, [location]);
};

export default useNavigationReporter;

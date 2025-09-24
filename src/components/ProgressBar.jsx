import { useEffect, useState } from "react";

export default function ProgressBar({timer}) {
  const [remainigTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval');
      setRemainingTime(prev => prev - 10);
    }, 10);

    return () => {
      clearInterval(interval); 
    };
  }, []); 

  return  <progress value={remainigTime} max={timer} />; 
};
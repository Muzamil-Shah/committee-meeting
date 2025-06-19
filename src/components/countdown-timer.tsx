import React, { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string; // Format: "YYYY-MM-DDTHH:mm:ss" (ISO 8601)
};

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return null; // Countdown complete
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    } as {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };
  };

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [targetDate]);

  if (!timeLeft) {
    return <div>🎉 Link Expired!</div>;
  }

  return (
    <div className="flex justify-center items-center gap-1">
      <p className="text-base font-semibold text-background">
        Link will expire in:
      </p>
      <div className="flex justify-center items-center gap-2">
        {Object.keys(timeLeft)?.map((item: any, i: number) => (
          timeLeft[item as keyof typeof timeLeft] !== 0 &&
          <span key={i} className="relative text-sm font-bold w-7 h-7 rounded p-2 shadow-md bg-white text-slate-700 flex justify-center items-start">
            {timeLeft[item as keyof typeof timeLeft]}
              
            <span className="absolute -top-1 text-xs bg-background  flex justify-center items-center w-5 h-3 rounded-t-xl">
            {i===0 ? "D": i===1 ? "H": i===2? "M" :"S"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;

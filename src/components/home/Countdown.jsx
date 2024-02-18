import { useState, useEffect } from "react";

const Countdown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const eventDate = new Date("2024-03-16T10:00:00+05:30");

  useEffect(() => {
    const timer = setInterval(() => {
      const totalSeconds = (eventDate - Date.now()) / 1000;

      setDays(formatTime(Math.floor(totalSeconds / 3600 / 24)));
      setHours(Math.floor(totalSeconds / 3600) % 24);
      setMinutes(Math.floor(totalSeconds / 60) % 60);
      setSeconds(Math.floor(totalSeconds % 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div className="text-white">
      <div className="text-center mt-3">16 - 17 March 2024</div>
      <div className="flex mt-10 justify-evenly md:text-4xl bg-gray-900/70 rounded-full py-3">
        <div className="flex flex-col items-center">
          <p className="font-extrabold">{days}</p>
          <span>days</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-extrabold">{hours}</p>
          <span>hours</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-extrabold">{minutes}</p>
          <span>mins</span>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-extrabold">{seconds}</p>
          <span>secs</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

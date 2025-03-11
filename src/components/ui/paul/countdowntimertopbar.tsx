import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string; // Fecha objetivo en formato "MM/DD/YYYY HH:mm:ss"
}

const CountdownTimerTopBar: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [partyTime, setPartyTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]); // Escucha cambios en la prop `targetDate`

  return (
    <div className="flex justify-center">
      {partyTime ? (
        <div className="text-center">
          <h1 className="text-sm md:text-lg font-bold text-white">¡Estamos en vivo!</h1>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white text-2xl">
          {/* Días */}
          <div className="flex items-center px-[6px]">
          <span className="text-sm md:text-lg font-normal mr-1">{days < 10 ? `0${days}` : days}</span>
            <span className="text-sm md:text-lg font-bold">D</span>
          </div>
          {/* Separador */}
          {/* <div className="text-cyan-400 text-7xl">|</div> */}
          <span className="w-[2px] h-[20px] bg-white"></span>
          
          {/* Horas */}
          <div className="flex items-center px-[6px]">
            <span className="text-sm md:text-lg font-normal mr-1">{hours < 10 ? `0${hours}` : hours}</span>
            <span className="text-sm md:text-lg font-bold">H</span>
          </div>
          {/* Separador */}
          <span className="w-[2px] h-[20px] bg-white"></span>
          {/* Minutos */}
          <div className="flex items-center px-[6px]">
            <span className="text-sm md:text-lg font-normal mr-1">{minutes < 10 ? `0${minutes}` : minutes}</span>
            <span className="text-sm md:text-lg font-bold">M</span>
          </div>
          {/* Separador */}
          <span className="w-[2px] h-[20px] bg-white"></span>
          {/* Segundos */}
          <div className="flex items-center px-[6px]">
            <span className="text-sm md:text-lg font-normal mr-1">{seconds < 10 ? `0${seconds}` : seconds}</span>
            <span className="text-sm md:text-lg font-bold">S</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimerTopBar;

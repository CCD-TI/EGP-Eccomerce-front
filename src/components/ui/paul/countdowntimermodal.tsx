import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string; // Fecha objetivo en formato "MM/DD/YYYY HH:mm:ss"
}

const CountdownTimerModal: React.FC<CountdownTimerProps> = ({ targetDate }) => {
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
    <div className="flex justify-center items-center">
      {partyTime ? (
        <div className="text-center">
          <h1 className="text-base font-bold text-white">¡Estamos en vivo!</h1>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white text-3xl font-bold">
          {/* Días */}
          <div className="flex items-center px-[6px] lg:px-2">
            <span className="text-3xl lg:text-4xl mr-2 neon-white">{days < 10 ? `0${days}` : days}</span>
            <span className="text-3xl lg:text-4xl font-extrabold neon-white">D</span>
          </div>
          {/* Separador */}
          {/* <div className="text-cyan-400 text-7xl">|</div> */}
          <span className=" w-[2px] mx-2 h-5 lg:h-7 bg-colors-cyan-ccd"></span>
          
          {/* Horas */}
          <div className="flex items-center px-[6px] lg:px-2">
            <span className="text-3xl lg:text-4xl mr-2 neon-white">{hours < 10 ? `0${hours}` : hours}</span>
            <span className="text-3xl lg:text-4xl font-extrabold neon-white">H</span>
          </div>
          {/* Separador */}
          <span className=" w-[2px] mx-2 h-5 lg:h-7 bg-colors-cyan-ccd"></span>
          {/* Minutos */}
          <div className="flex items-center px-[6px] lg:px-2">
            <span className="text-3xl lg:text-4xl mr-2 neon-white">{minutes < 10 ? `0${minutes}` : minutes}</span>
            <span className="text-3xl lg:text-4xl font-extrabold neon-white">M</span>
          </div>
          {/* Separador */}
          <span className=" w-[2px] mx-2 h-5 lg:h-7 bg-colors-cyan-ccd"></span>
          {/* Segundos */}
          <div className="flex items-center px-[6px] lg:px-2">
            <span className="text-3xl lg:text-4xl mr-2 neon-white">{seconds < 10 ? `0${seconds}` : seconds}</span>
            <span className="text-3xl lg:text-4xl font-extrabold neon-white">S</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimerModal;

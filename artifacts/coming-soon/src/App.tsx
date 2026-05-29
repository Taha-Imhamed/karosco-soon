import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-07-15T00:00:00");

function useCountdown(target: Date) {
  const getTimeLeft = () => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function App() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

  return (
    <div className="coming-soon-root">
      <div className="corner top-left">
        <span className="dot">·</span>
      </div>
      <div className="corner top-right">
        <span className="corner-text">EST · MMXXVI</span>
      </div>

      <main className="center-content">
        <p className="tagline">A NEW VENTURE</p>
        <h1 className="brand-name">KAYROSCO</h1>

        <div className="divider-row">
          <span className="divider-line" />
          <span className="coming-soon-label">COMING SOON</span>
          <span className="divider-line" />
        </div>

        <div className="countdown">
          <div className="time-unit">
            <span className="time-number">{pad(days)}</span>
            <span className="time-label">DAYS</span>
          </div>
          <span className="colon">:</span>
          <div className="time-unit">
            <span className="time-number">{pad(hours)}</span>
            <span className="time-label">HOURS</span>
          </div>
          <span className="colon">:</span>
          <div className="time-unit">
            <span className="time-number">{pad(minutes)}</span>
            <span className="time-label">MINUTES</span>
          </div>
          <span className="colon">:</span>
          <div className="time-unit">
            <span className="time-number">{pad(seconds)}</span>
            <span className="time-label">SECONDS</span>
          </div>
        </div>
      </main>

      <div className="corner bottom-left">
        <span className="corner-text">KAYROSCO.AL</span>
      </div>
      <div className="corner bottom-right">
        <span className="corner-text">© KAYROSCO</span>
      </div>
    </div>
  );
}

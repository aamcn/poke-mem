import { useState, useEffect } from "react";
import styles from "./timer.module.css";
import { useGameContext } from "../game/Game";

function Timer() {

  const {state, dispatch} = useGameContext();

  const [startTime, setStartTime] = useState<number>(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const currentDate: Date = new Date();
    let intervalId: number;
    if (state.gameStarted && !state.gameWon && !state.gameLost) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(currentDate.getTime() - startTime), 10);
    }
    if (state.gameStarted && (state.gameLost || state.gameWon)) {
      dispatch({
        type: "setFinalTime",
        payload: `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`,
      });
    }
    return () => clearInterval(intervalId);
  }, [state.gameStarted, time])

  useEffect(() => {
    const d: Date = new Date();
    setStartTime(d.getTime());
  }, [state.gameStarted]);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 60000);

  // Seconds calculation
  const seconds = Math.floor((time % 60000) / 1000);

  // Milliseconds calculation
  const milliseconds = time % 100;

  return (
    <div className={styles.timerContainer}>
      <p className={styles.timerDisplay}>Time:</p>
      <p className={styles.timerDigits}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
}


export default Timer;

import './App.css';
import { useEffect, useRef, useState } from 'react'


function App() {
  const [dark, setDark] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const intervalId = useRef(null);
  const pause = useRef(true)

  function startCronometro() {
    if (pause.current === true) {
      intervalId.current = setInterval(() => setSeconds(prevCronometro => prevCronometro + 1), 1000)
      pause.current = false;
    }
  };

  function pauseCronometro() {
    clearInterval(intervalId.current);
    pause.current = true
  };

  function finishCronometro() {
    setMinutes(0)
    setSeconds(0)
    pauseCronometro()
  };

  function rerunCronometro() {
    finishCronometro()
    startCronometro()
  };


  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setMinutes(minutes + 1)
      setSeconds(0)
    }
  }, [seconds, minutes]);

  function toggleTheme() {
      setDark(dark ? false : true)
  };

  return (
    <div className={dark ? 'background-dark' : 'background-light'}>
      <div className={dark ? 'app-dark' : 'app-light'}>
        <div className={"grid-container"}>
          <div className="watch"><p className={dark ? 'p-dark' : 'p-light'}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p></div>
          <button onClick={startCronometro} className={"start", dark ? 'button-dark' : 'button-light'}><div>Começar</div></button>
          <button onClick={pauseCronometro} className={"pause", dark ? 'button-dark' : 'button-light'}> <div>Pausar </div></button>
          <button onClick={finishCronometro} className={"finish", dark ? 'button-dark' : 'button-light'}> <div>Finalizar </div></button>
          <button onClick={rerunCronometro} className={"restart", dark ? 'button-dark' : 'button-light'}><div>Reiniciar </div></button>
          </div>

      </div>
      <button onClick={toggleTheme} className={'buttonToggle'}>{`${dark ? 'dark' : 'light'}`}</button>

    </div>
  );
}

export default App
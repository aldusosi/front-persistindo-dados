import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const intervalSegundosId = useRef(null);
  let pausado = false;

  useEffect(() => {
    return () => {
      clearInterval(intervalSegundosId.current);
    }
  }, []);


  function iniciar() {
    if (intervalSegundosId.current) return;
    intervalSegundosId.current = setInterval(() => setSegundos(prevsegundos => prevsegundos + 1), 1000);
  }

  function pausar() {
    clearInterval(intervalSegundosId.current);
    pausado = true;
  }

  function continuar() {
    if (!pausado) return;
    intervalSegundosId.current = setInterval(() => setSegundos(prevsegundos => prevsegundos + 1), 1000);
  }

  function zerar() {
    setSegundos(0);
    setMinutos(0);
  }

  function tempo() {
    if (segundos === 59) {
      setMinutos(prevMinutos => prevMinutos + 1);
      setSegundos(0);
      return <p><span>{minutos < 10 ? `0${minutos}` : minutos}</span> : {segundos < 10 ? `0${segundos}` : segundos}</p>;
    }
    return <p><span>{minutos < 10 ? `0${minutos}` : minutos}</span> : {segundos < 10 ? `0${segundos}` : segundos}</p>;
  }

  return (
    <div className="App">

      <div className="timer">
        {tempo()}
      </div>

      <div className="buttons">
        <button onClick={iniciar}>Iniciar</button>
        <button onClick={pausar}>Pausar</button>
        <button onClick={continuar}>Continuar</button>
        <button onClick={zerar}>Zerar</button>
      </div>

    </div>
  );
}

export default App;
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [cronometro, setCronometro] = useState(0);
  const [tema, setTema] = useState('claro');

  const intervalID = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalID.current);
    }

  },[])

  function handleComecar(){
    intervalID.current = setInterval(() => setCronometro(tempoAnterior => tempoAnterior + 1), 1000);
  }

  function handlePausar(){
    clearInterval(intervalID.current);
  }

  function handleFinalizar(){
    setCronometro(0);
    clearInterval(intervalID.current);

  }

  function handleReiniciar(){
    setCronometro(0);
  }

  return (
    <div className={tema} id="App">
      <button onClick={() => setTema( tema === 'claro' ? 'escuro' : 'claro')}>Trocar tema</button>
      <h1>Crônometro</h1>
      <span>{cronometro} segundos</span>
      <div>
        <button onClick={handleComecar}>Começar cronômetro</button>
        <button onClick={handlePausar}>Pausar cronômetro</button>
        <button onClick={handleFinalizar}>Finalizar cronômetro</button>
        <button onClick={handleReiniciar}>Reiniciar cronômetro</button>
        
      </div>
    </div>
  );
}

export default App;

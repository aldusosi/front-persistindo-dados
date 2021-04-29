import { useState, useEffect, useRef } from 'react' 
import './App.css';

function App() {
  const [timer, setTimer] = useState(0);
  const [tema, setTema] = useState(localStorage.getItem('tema') ?? 'claro')
  const intervalId = useRef(null);

  useEffect(() => {
  
    return () => {
      clearInterval(intervalId.current);
    }
  }, []);

  function comecarCronometro() {
    if (intervalId.current) return;
    intervalId.current = setInterval(() => setTimer(prevTimer => prevTimer +1), 1000);
  }

  function pausarCronometro() {
    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  function reiniciarCronometro() {
    setTimer(0)
  }

  function finalizarCronometro() {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setTimer(0)
  }

  function handleTheme() {
    const novoTema = tema === 'claro' ? 'escuro' : 'claro';
    setTema(novoTema);

    localStorage.setItem('tema', novoTema);
  }

  return (
    <div className={tema}>
      <h1>Cronômetro: {timer}</h1>

      <div className="cronometroButtons">
        <button onClick={comecarCronometro}>Começar</button>
        <button onClick={pausarCronometro}>Pausar</button>
        <button onClick={finalizarCronometro}>Finalizar</button>
        <button onClick={reiniciarCronometro}>Reiniciar</button>
      </div>
      
      <br/><br/>
      <button onClick={handleTheme} >Tema</button>


    </div>
  );
}

export default App;

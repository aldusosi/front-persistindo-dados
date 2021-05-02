import './App.css';
import {useState, useRef} from "react";

function App() {

  const [tema, setTema] = useState(localStorage.getItem('tema') ?? 'claro')
  const [timer, setTimer] = useState(0);
  const [cronometroRodando, setCronometroRodando] = useState(true);
  const intervalId = useRef(null);

  function handleTema(){
    const novoTema = tema === 'claro' ? 'escuro' : 'claro';
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  }

  function handleClickStartTime(){
    if(!intervalId.current){
      intervalId.current = setInterval(()=>{
        setTimer(prevTimer => prevTimer + 1);
      },1000);
    }
      
  }

  function handleClickStop(){
    clearInterval(intervalId.current)
    console.log(cronometroRodando);
    setCronometroRodando(false);
  }

  function handleStopAndClear(){
    clearInterval(intervalId.current)
    setTimer(0);
  }

  function handleReiniciarContagem(){
    setTimer(0);
    if(cronometroRodando)return;

    clearInterval(intervalId.current);
    intervalId.current = setInterval(()=>{
      setTimer(prevTimer => prevTimer + 1);
    },1000);
    

  }

  return (
    <div className="container" style={{background:tema ==='claro' ? "white" : "black",color: tema === 'claro' ? "black" : "white"}}>
      
      <h1>Crônometro</h1>
      
      <div className="container-buttons">
        <button onClick={ handleClickStartTime }>Iniciar</button>
        <button onClick={ handleClickStop }>Stop</button>
        <button onClick={ handleStopAndClear }>Finalizar</button>
        <button onClick={ handleReiniciarContagem }>Recomeçar</button>
        <button onClick={ handleTema }>Tema</button>
      </div>
      
      <h2>{timer} {timer == 1 ? "segundo" : "segundos"}</h2>
    </div>
  );
}

export default App;

import './App.css';
import {useState, useRef, useEffect} from 'react';


function cronometro (props) {
  if(Number(props.segundos) === 60) {
    props.setSegundos(`${0}`.padStart(2, "0"));
    props.setMinutos(minutoAnterior => `${Number(minutoAnterior) + 1}`.padStart(2, "0"));
  }
  if(Number(props.minutos) === 60) {
    props.setMinutos(`${0}`.padStart(2, "0"));
    props.setHoras(horaAnterior => horaAnterior +1);
  }
}

function Iniciar (props) {
  if(props.intervalId.current) return;

    props.intervalId.current = setInterval(() => props.setSegundos(
      segundoAnterior => `${Number(segundoAnterior) + 1}`.padStart(2, "0")
      ), 1000);   
}



function App() {
  const [segundos, setSegundos] = useState(`${0}`.padStart(2, "0"));
  const [minutos, setMinutos] = useState(`${0}`.padStart(2, "0"));
  const [horas, setHoras] = useState(0);
  const [tema, setTema] = useState(localStorage.getItem('tema') ?? 'claro');
  const intervalId = useRef(null);

  cronometro({segundos, minutos, horas, setSegundos, setMinutos, setHoras});

  useEffect(() => {

    return () => {
      clearInterval(intervalId.current);
    }
  }, [])

  

  function pausar () {
    clearInterval(intervalId.current);
    intervalId.current = null;
  }

  function finalizar () {
    clearInterval(intervalId.current);
    intervalId.current = null;
    setSegundos(`${0}`.padStart(2, "0"));
    setMinutos(`${0}`.padStart(2, "0"));
    setHoras(0);
  }

  function reiniciar () {
    setSegundos(`${0}`.padStart(2, "0"));
    setMinutos(`${0}`.padStart(2, "0"));
    setHoras(0);
  }

  function trocaDeTema() {
    const novoTema = tema === 'claro' ? 'escuro' : 'claro';
    setTema(novoTema);

    localStorage.setItem('tema', novoTema);
  }

  return (
    <div style={ {background: tema === 'claro' ? 'white' : 'black', color: tema === 'claro' ? 'black' : 'white'} }>
      <h1>Crônometro</h1>
      <div>
        {horas}:{minutos}:{segundos}
        <button onClick={() => Iniciar({setSegundos, intervalId})}>Iniciar</button>
        <button onClick={pausar}>Pausar</button>
        <button onClick={finalizar}>Finalizar</button>
        <button onClick={reiniciar}>Reiniciar</button>
      </div>
      <button onClick={trocaDeTema}>Trocar de tema</button>
    </div>
  );
}

export default App;

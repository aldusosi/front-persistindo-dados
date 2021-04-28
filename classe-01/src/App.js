import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [cronometro, setCronometro] = useState(0);
  const [tema, setTema] = useState(localStorage.getItem("tema") ?? "claro");
  const intervalID = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  function iniciarCronometro() {
    if (intervalID.current) return;
    intervalID.current = setInterval(
      () => setCronometro(prevValue => prevValue + 1),
      1000
    );
  }
  function pausarCronometro() {
    clearInterval(intervalID.current);
    intervalID.current = null;
  }
  function finalizarCronometro() {
    clearInterval(intervalID.current);
    intervalID.current = null;
    setCronometro(0);
  }
  function reiniciarCronometro() {
    setCronometro(0);
  }
  function trocarTema() {
    const novoTema = tema === "claro" ? "escuro" : "claro";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  }
  return (
    <div className={tema === "claro" ? "claro" : "escuro"}>
      <h1>Crônometro</h1>
      <p>{cronometro}</p>
      <div className='controls'>
        <button
          className={tema === "claro" ? "button-claro" : "button-escuro"}
          onClick={iniciarCronometro}
        >
          Iniciar
        </button>
        <button
          className={tema === "claro" ? "button-claro" : "button-escuro"}
          onClick={pausarCronometro}
        >
          Pausar
        </button>
        <button
          className={tema === "claro" ? "button-claro" : "button-escuro"}
          onClick={finalizarCronometro}
        >
          Finalizar
        </button>
        <button
          className={tema === "claro" ? "button-claro" : "button-escuro"}
          onClick={reiniciarCronometro}
        >
          Reiniciar
        </button>
      </div>
      <button
        className={tema === "claro" ? "button-claro" : "button-escuro"}
        onClick={trocarTema}
      >
        Trocar Tema
      </button>
    </div>
  );
}

export default App;
